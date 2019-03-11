# Restoring your cluster after a disaster

The playbooks address a disaster recovery scenario where you have lost your entire cluster and all the VMs. Other scenarios and how to handle them are described in the Docker documentation including the following scenarios:

-   You have lost one UCP instance but your cluster still has the quorum. The easiest way is to recreate the missing UCP instance from scratch.
-   You have lost the quorum in your UCP cluster but there is still one UCP instance running.
-   You have lost one instance of DTR but still have a quorum of replicas. The easiest way is to recreate the missing DTR instance from scratch.
-   You have lost the quorum of your DTR cluster but still have one DTR instance running.

## Before you restore

**Step 1.** Retrieve the backup files using your chosen backup solution and save them to a folder on your Ansible server. If you have used timestamps in the naming of your backup files, you can use them to determine the chronological order. If you used the `backup.sh` script specifying a date prefix, you can use that to identify the matching set of backup files. You should choose the files in the following reverse chronological order, from the most recent to the oldest file. Make sure you restore both the `*.tgz` and the `*.vars.tgz` files.

1.  DTR images backup
2.  DTR metadata backup
3.  UCP backup
4.  Swarm backup

In this example, we will assume a set of backup files stored in `/root/restore` that were created specifying a date prefix. These will have names like `2018_04_17_151734_swarm.tgz`, `2018_04_17_151734_ucp.tgz`, etc and the corresponding `.vars.tgz` files.

**Step 2:** Retrieve the DTR replica ID, the DTR version and the UCP version

To retrieve the ID of the replica that was backed up, as well as the version of DTR, you need to extract the data from the `.vars.tgz` file associated with the archive of the DTR metadata. You can retrieve this as follows:

```
# tar -Oxf /root/restore/2018_04_17_151734_dtr_meta.vars.tgz meta.yml
backup_node="hpe-dtr01"
replica_id="ad5204e8a4d0"
backup_source=""
ucp_version=""
dtr_version="2.4.3"

```

```
# tar -Oxf /root/restore/2018_04_17_151734_ucp.vars.tgz meta.yml
backup_node="hpe-ucp01"
replica_id=""
backup_source=""
ucp_version="2.2.7"
dtr_version=""
```

Take note of the replica ID (`ad5204e8a4d0`), the version of DTR (`2.4.3`) and the version of UCP (`2.2.7`).

**Step 3:** Populate the `group_vars/backups` file

```
backup_swarm: "/root/restore/2018_04_17_151734_swarm.tgz"
backup_ucp: "/root/restore/2018_04_17_151734_ucp.tgz"
backup_dtr_meta: "/root/restore/2018_04_17_151734_dtr_meta.tgz"
backup_dtr_data: "/root/restore/2018_04_17_151734_dtr_data.tgz"
backup_dtr_id: "ad5204e8a4d0"
backup_dest: "/root/backups"
backup_server: <IP of your ansible box>
```

You should populate your `group_vars/backups` file as above, with the `backup_dtr_id` variable containing the value you retrieved in the preceding step as `replica_id="ad5204e8a4d0"`.

**Step 4:** Verify that your `group_vars/vars` file specifies the correct versions of DTR and UCP.

The playbooks use the versions of UCP and DTR as specified in your `group_vars/vars` file to restore your backups. You must ensure that the versions specified in your current `group_vars/vars` file correspond to the versions in the backups as determined above.

```
# cat group_vars/vars | grep dtr_version
dtr_version: '2.4.3'
```

```

# cat group_vars/vars | grep ucp_version
ucp_version: '2.2.7'
```

**Step 5:** Restore UCP admin credentials if required

You must ensure that the UCP admin credentials in your current `group_vars/vars` file are those that were in effect when you generated the backup files. If they have changed since then, you must restore the original credentials for the duration of the restore procedure.

**Step 6:** Restore your inventory (`vm_hosts`)

Your inventory must reflect the environment that was present when the backup files were created. You can find a copy of the inventory as it was when the backup was taken in the `*.vars.tgz` files.

## Restore UCP and DTR

**Warning:** This procedure is aimed at restoring a cluster after a disaster. It assumes you have lost all the VMs in your cluster and want to redeploy using data that you backed up earlier. The solution follows Docker best practice, which means the swarm artifacts are not restored. You will need to restore your Docker volumes and your applications (stacks and services) when this procedure is complete.

1.  Ensure that you have completed all the preliminary steps as outlined in the section [Before you restore](#) 
2.  Run the restore playbook

    ```
    ansible-playbook -i vm_hosts restore.yml
    ```

    You may need to modify `restore.yml` before you run it, depending on what optional components you have deployed. For example, if you have not deployed Splunk, you will need to comment out the line:

    ```
    - import_playbook: playbooks/splunk_uf.yml
    ```

    If not, you will get an error saying that Splunk components could not be restored when you run the playbook.

3.  If you are using the image scanning functionality in DTR, you will need to re-download the vulnerability database. For more information, see the Docker documentation [here](https://docs.docker.com/datacenter/dtr/2.5/guides/admin/configure/set-up-vulnerability-scans/#get-the-security-scanning-license).

You are now ready to restore your Docker volumes and your applications.

## Restore DTR metadata and DTR images

**Note:** This procedure restores DTR metadata and images and assumes you have lost all the DTR VMs in your cluster. It will redeploy using the DTR data that you backed up earlier and will also restore the images if the folder exported by the NFS VM is empty.

1.  Ensure that you have completed all the preliminary steps as outlined in the section [Before you restore](#). In this scenario, you need the archives for the DTR metadata and the DTR images.
2.  Ensure that all the DTR VMs listed in your inventory are destroyed, using the vSphere Web Client to delete them if required. If you want to restore the DTR images you should also delete the NFS VM.
3.  Remove the DTR nodes from the swarm by running the `docker node rm <DTR node>` command on a UCP node for each DTR node in your cluster. The following example shows the sequence of commands to use to remove the DTR nodes:

    ```
    # docker node ls
    ID         HOSTNAME                     STATUS              AVAILABILITY
    aiz... *   hpe-ucp02.cloudra.local      Ready               Active
    gvf...     hpe-dtr01.cloudra.local      Down                Active
    ir4...     hpe-ucp03.cloudra.local      Ready               Active
    mwf...     hpe-dtr02.cloudra.local      Down                Active
    oqy...     hpe-ucp01.cloudra.local      Ready               Active
    xqe...     hpe-worker01.cloudra.local   Ready               Active
    zdu...     hpe-dtr03.cloudra.local      Down                Active
    
    ```

    ```
    # docker node rm hpe-dtr01.cloudra.local
    hpe-dtr01.cloudra.local
    # docker node rm hpe-dtr02.cloudra.local
    hpe-dtr02.cloudra.local
    # docker node rm hpe-dtr03.cloudra.local
    hpe-dtr03.cloudra.local
    
    ```

    ```
    # docker node ls
    ID         HOSTNAME                     STATUS              AVAILABILITY        
    aiz...     hpe-ucp02.cloudra.local      Ready               Active     
    ir4...     hpe-ucp03.cloudra.local      Ready               Active    
    oqy... *   hpe-ucp01.cloudra.local      Ready               Active    
    xqe...     hpe-worker01.cloudra.local   Ready               Active
    ```

4.  Run the restore script:

    ```
    ./restore_dtr.sh
    ```

5.  If you are using the image scanning functionality in DTR, you will need to re-download the vulnerability database. For more information, see the Docker documentation [here](https://docs.docker.com/datacenter/dtr/2.5/guides/admin/configure/set-up-vulnerability-scans/#get-the-security-scanning-license).

## Related playbooks

-   `playbooks/restore_swarm.yml` is used to restore the swarm data
-   `playbooks/restore_dtr_meta.yml` is used to restore DTR metadata
-   `playbooks/restore_dtr_images.yml` is used to restore DTR images
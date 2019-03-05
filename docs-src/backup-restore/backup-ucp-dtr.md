# Backup UCP and DTR

The playbooks support backing up the swarm, UCP, DTR metadata and DTR images.

## Backup configuration variables

The following table shows the variables related to backing up UCP and DTR. All these variables are defined in the file **group_vars/backups**. All the data that is backed up is streamed over an SSH connection to the backup server. Currently, the playbooks only support the use of the Ansible box as the backup server.


**Table 21.** Backup variables

|Variable|File|Description|
|:-------|:---|:----------|
|backup_server|**group_vars/backups**|Currently, the playbooks only support the use of the Ansible box as the backup server.|
|backup_dest|**group_vars/backups**|This variable should point to an existing folder on your Ansible box where the `root` user has write access. All the backups will be stored in this folder. For example, `/root/backup`|
|backup_passphrase|**group_vars/vault**|This variable is used to encrypt the tar file with a passphrase that must be at least 12 characters long.|
|\#swarm_offline_backups|**group_vars/backups**|This variable is commented out by default. More information on this variable is provided below.|

## Backing up the Swarm

When you backup the swarm, your services and stack definitions are backed up together with the networks definitions. However, Docker volumes or their contents will not be backed up. (If Docker volumes are defined in stacks, they will be re-created when you restore the stacks, but their content will be lost). You can backup the swarm using the playbook named `backup_swarm.yml` which is located in the `playbooks` folder on your Ansible server. The playbook is invoked as follows:

```
# ansible-playbook -i vm_hosts playbooks/backup_swarm.yml
```

This playbook creates two archives in the folder specified by the variable `backup_dest` in `group_vars/backups`. By default, the file is named using the following pattern:

```
<backup_dest>/backup_swarm_<vmname>_<timestamp>.tgz
<backup_dest>/backup_swarm_<vmname>_<timestamp>.vars.tgz
```

`<vmname>` is the name of the host (in the inventory) that was used to take the backup, and `<timestamp>` is the time at which the backup was taken. The file with the extension `.vars.tgz` contains information regarding the system that was backed up.

You can override the generated file name by defining the variable **backup_name** on the command line when running the playbook. In the example below:

```
# ansible-playbook -i vm_hosts playbooks/backup_swarm.yml -e backup_name=my_swarm_backup
```

The generated files won't have `<vmname>` or `<timestamp>` appended:

```
<backup_dest>/my_swarm_backup.tgz
<backup_dest>/my_swarm_backup.vars.tgz
```

**Warning: Online versus offline backups:** By default, the playbook performs online backups. You can take offline backups by setting the variable `swarm_backup_offline` to `"true"`. The playbook will then stop the Docker daemon on the machine used to take the backup (a manager or UCP node). Before it does so, the playbook will verify that enough managers are running in the cluster to maintain the quorum. If this is not the case, the playbook will exit with an error. For more information, see the Docker documentation at [https://docs.docker.com/engine/swarm/admin_guide/\#recover-from-disasterv](https://docs.docker.com/engine/swarm/admin_guide/#recover-from-disasterv)

## Backing up the Universal Control Plane (UCP)

When you backup UCP, you save the data/metadata outlined in Table 22:


**Table 22.** UCP data backed up

|Data|Description|
|:---|:----------|
|Configurations|The UCP cluster configurations, as shown by `docker config ls`, including Docker EE license and swarm and client CAs|
|Access control|Permissions for team access to swarm resources, including collections, grants, and roles|
|Certificates and keys|The certificates, public keys, and private keys that are used for authentication and mutual TLS communication|
|Metrics data|Monitoring data gathered by UCP|
|Organizations|Your users, teams, and orgs|
|Volumes|All [UCP named volumes](https://docs.docker.com/datacenter/ucp/2.2/guides/architecture/#volumes-used-by-ucp), which include all UCP component certs and data|

To make a backup of UCP, use `playbook/backup_ucp.yml` as follows:

```
# ansible-playbook -i vm_host playbooks/backup_ucp.yml
```

This playbook creates two archives in the folder specified by the variable `backup_dest` in `group_vars/backups`. By default, the files are named using the following pattern:

```
<backup_dest>/backup_ucp_<ucpid>_<vmname>_<timestamp>.tgz
<backup_dest>/backup_ucp_<ucpid>_<vmname>_<timestamp>.vars.tgz
```

`<ucpid>` is the ID of the UCP instance, `<vmname>` is the name of the host (in the inventory) that was used to take the backup, and `<timestamp>` is the time at which the backup was taken. The file with the extension `.vars.tgz` contains information regarding the system which was backed up.

You can override the generated file name by defining the variable **backup_name** on the command line when running the playbook. In the example below:

```
# ansible-playbook -i vm_hosts playbooks/backup_ucp.yml -e backup_name=my_ucp_backup
```

The generated files won't have `<vmname>` or `<timestamp>` appended:

```
<backup_dest>/my_ucp_backup.tgz
<backup_dest>/my_ucp_backup.vars.tgz
```

**Warning:** To create a consistent backup, the backup command **temporarily stops the UCP containers running on the node where the backup is being performed**. User resources, such as services, containers, and stacks are not affected by this operation and will continue to operate as expected. Any long-lasting `docker exec`, `docker logs`, `docker events`, or `docker attach` operations on the affected manager node will be disconnected.

For more information on UCP backup, see the Docker documentation at [https://docs.docker.com/ee/ucp/admin/backups-and-disaster-recovery/](https://docs.docker.com/ee/ucp/admin/backups-and-disaster-recovery/)

## Backing up the Docker Trusted Registry (DTR)

When you backup DTR, you save the data/metadata outlined in Table 23:


**Table 23.** DTR data backed up

|Data|Backed up?|Description|
|:---|:---------|:----------|
|Configurations|yes|DTR settings|
|Repository metadata|yes|Metadata like image architecture and size|
|Access control to repos and images|yes|Data about who has access to which images|
|Notary data|yes|Signatures and digests for images that are signed|
|Scan results|yes|Information about vulnerabilities in your images|
|Certificates and keys|yes|TLS certificates and keys used by DTR|
|Image content|no|Needs to be backed up separately, depends on DTR configuration|
|Users, orgs, teams|no|Create a UCP backup to backup this data|
|Vulnerability database|no|Can be re-downloaded after a restore|

To make a backup of DTR metadata, use `playbook/backup_dtr_metadata.yml`

```
# ansible-playbook -i vm_host playbooks/backup_dtr_metadata.yml
```

This playbook creates two archives in the folder specified by the variable `backup_dest` in `group_vars/backups`. By default, the file is named using the following pattern:

```
<backup_dest>/backup_dtr_meta_<replica_id>_<vmname>_<timestamp>.tgz
<backup_dest>/backup_dtr_meta_<replica_id>_<vmname>_<timestamp>.vars.tgz
```

`<replica_id>` is the ID of the DTR replica that was backed up, `<vmname>` is the name of the host (in the inventory) that was used to take the backup, and `<timestamp>` is the time at which the backup was taken. The file with the extension `.vars.tgz` contains information regarding the system that was backed up.

You can override the generated file name by defining the variable **backup_name** on the command line when running the playbook. In the example below:

```
# ansible-playbook -i vm_hosts playbooks/backup_dtr_metadata.yml -e backup_name=my_dtr_metadata_backup
```

The generated files won't have `<vmname>` or `<timestamp>` appended:

```
<backup_dest>/my_dtr_metadata_backup.tgz
<backup_dest>/my_dtr_metadata_backup.vars.tgz
```

For more information on DTR backups, see the Docker documentation at [https://docs.docker.com/ee/dtr/admin/disaster-recovery/](https://docs.docker.com/ee/dtr/admin/disaster-recovery/)

## Backing up DTR data (images)

To make a backup of the images that are inventoried in DTR and stored on the NFS server, use `playbooks/backup_dtr_images.yml` 

```
# ansible-playbook -i vm_host playbooks/backup_dtr_images.yml
```

This playbook creates two archives in the folder specified by the variable `backup_dest` in `group_vars/backups`. By default, the files are named using the following pattern:

```
<backup_dest>/backup_dtr_data_<replica_id>_<vmname>_<timestamp>.tgz
<backup_dest>/backup_dtr_data_<replica_id>_<vmname>_<timestamp>.vars.tgz
```

`<replica_id>` is the ID of the DTR replica that was backed up, `<vmname>` is the name of the host (in the inventory) that was used to take the backup, and `<timestamp>` is the time at which the backup was taken.

You can override the generated file names by defining the variable **backup_name** on the command line when running the playbook, as shown in the example below:

```
# ansible-playbook -i vm_hosts playbooks/backup_dtr_images.yml -e backup_name=my_dtr_data_backup
```

The generated files won't have `<vmname>` or `<timestamp>` appended:

```
<backup_dest>/my_dtr_data_backup.tgz
<backup_dest>/my_dtr_data_backup.vars.tgz
```

For more information on DTR backups, see the Docker documentation at [https://docs.docker.com/ee/dtr/admin/disaster-recovery/](https://docs.docker.com/ee/dtr/admin/disaster-recovery/)

## Backing up other metadata, including passwords

The backup playbooks do not backup the sensitive data in your `group_vars/vault` file. The information stored in the `.vars.tgz` files includes backups of the following files:

-   **vm_hosts**, a copy of the `vm_hosts` file at the time the backup was taken
-   **vars**, a copy of your `group_vars/vars` file at the time the backup was taken
-   **meta.yml**, a generated file containing information pertaining to the backup

The **meta.yml** file contains the following information:

```
backup_node="<node that took the backup>"
replica_id="<ID of DTR replica if DTR backup>"
backup_source=""
ucp_version="<UCP version if UCP backup>"
dtr_version="<DTR version of DTR backup>"
```

## Backup Utility

The script `backup.sh` can be used to take a backup of the swarm, UCP, DTR metadata and the DTR images in one go. You can pass this script an argument (tag) that will be used to prefix the backup filenames, thereby overriding the default naming. Table 24 shows the file names produced by `backup.sh` based on the argument passed in the command line.

**Table 24.** Backup utility

|Example|Command line|Generated filenames|
|:------|:-----------|:------------------|
|Default|`./backup.sh`|backup_swarm_<vmname\>_<timestamp\>.tgz, backup_ucp_<ucpid\>_<vmname\>_<timestamp\>.tgz, backup_dtr_meta_<replica_id\>_<vmname\>_<timestamp\>.tgz, backup_dtr_data_<replica_id\>_<vmname\>_<timestamp\>.tgz and the corresponding `.vars.tgz` files|
|Custom|`./backup.sh my_backup`|my_backup_swarm.tgz, my_backup_ucp.tgz, my_backup_dtr_meta.tgz, my_backup_dtr_data.tgz, and the corresponding `.vars.tgz` files|
|Date|`./backup.sh $(date '+%Y_%m_%d_%H%M%S')`|<date\>_swarm.tgz, <date\>_ucp.tgz, <date\>_dtr_meta.tgz, <date\>_dtr_data.tgz, and the corresponding `.vars.tgz` files|

In addition, the `backup.sh` script accepts an optional switch that will let you specify the location of the password file that will be passed to the `ansible-playbook` commands in the script. This is required if you have encrypted the `group_vars/vault` file. The general syntax for this script is as follows:

```
./backup.sh [ -v <Vault Password File> ] [ tag ]
```

## Related playbooks

-   `playbooks/backup_swarm.yml` is used to back up the swarm data
-   `playbooks/backup_ucp.yml` is used to back up UCP
-   `playbooks/backup_dtr_meta.yml` is used to back up DTR metadata
-   `playbooks/backup_dtr_images.yml` is used to back up DTR images
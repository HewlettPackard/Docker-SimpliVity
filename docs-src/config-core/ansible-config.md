# Ansible configuration

1.  On the Ansible node, retrieve the latest version of the playbooks using Git.

    ```
    # git clone https://github.com/HewlettPackard/Docker-SimpliVity.git
    ```

2.  Change to the directory that you just cloned:

    ```
    # cd ~/Docker-SimpliVity
    ```


**Note:** All subsequent file names are relative to the `Docker-SimpliVity` directory. For example `vm_hosts` is located in the top-level `~/Docker-SimpliVity` while `group_vars/vars` corresponds to `~/Docker-SimpliVity/groups_vars/vars`.

You now need to prepare the configuration to match your own environment, prior to deploying Docker EE and the rest of the nodes. To do so, you will need to modify a number of files including:

-   `site.yml`, the main entry point for the playbooks.
-   `vm_hosts`, the inventory file.

You also need to create and populate a number of files:

-   `group_vars/vars`, the group variables file.
-   `group_vars/vault`, containing sensitive information that needs to be protected.
-   `group_vars/backups`, containing backup-related variables.

For the latter group, a set of sample files has been provided to help you get started:

-   `group_vars/vars.sample`, a sample group variables file.
-   `group_vars/vault.sample`, a sample vault file.
-   `group_vars/backups.sample`, a sample backup configuration file.

The file `group_vars/win_worker.yml` supports advanced configuration of Windows remote management and in general should not require modification.

You should work from the `root` account for the configuration steps and also later on when you run the playbooks.

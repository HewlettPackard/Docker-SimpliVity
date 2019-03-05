# Provisioning RHEL VMs

The following playbooks are used to provision RHEL VMs:

-   `playbooks/create_vms.yml` will create all the necessary virtual machines for the environment from the VM Template defined in the `vm_template` variable. All Linux VMs are now created in one go, regardless of the number of drives they have. This playbook also has the potential to configure additional network adapters.
-   `playbooks/config_networking.yml` will configure the network settings in all the virtual machines.
-   `playbooks/resize_syspart.yml` resizes the logical volume that holds the `/` partition of the Linux VMs to use all the space available on the drive.
-   `playbooks/config_subscription.yml` registers and subscribes all virtual machines to the Red Hat Customer Portal. This is only needed if you pull packages from Red Hat. This playbook is commented out by default but you should uncomment it to make sure each VM registers with the Red Hat portal. It is commented out so that you can test the deployment first without having to unregister all the VMs from the Red Hat Customer Portal between each test. If you are using an internal repository, as described in the section "Create a VM template", you can keep this playbook commented out.
-   `playbooks/config_ntp.yml` configures the **chrony** client package in all virtual machines in order to have a synchronized clock across the environment. It will use the list of servers specified in the `ntp_servers` variable in the file `group_vars/vars`.
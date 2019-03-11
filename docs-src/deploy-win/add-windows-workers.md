# Playbooks for adding Windows workers

-   `playbooks/create_vms.yml` will create all the necessary Windows 2016 VMs for the environment based on the Windows VM Template defined in the `win_vm_template` variable. Windows workers nodes are defined in the group `win_worker` in the `vm_hosts` inventory.
-   `playbooks/install_docker.yml` installs Docker along with all its dependencies on your Windows VMs
-   `playbooks/scale_workers.yml` installs and configures additional Windows workers on the target nodes defined by the group `win_worker` in the `vm_hosts` inventory.
-   `playbooks/splunk_uf_win.yml` installs and configures the Splunk Universal Forwarder on each Windows machine in the inventory.
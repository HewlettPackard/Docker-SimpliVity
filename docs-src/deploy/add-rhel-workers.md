# Deploying RHEL workers

By default, `site.yml` will automatically deploy any RHEL (and / or Windows) worker nodes that are declared in the inventory.

If you subsequently want additional RHEL worker nodes, add them to the inventory as appropriate and then run the playbooks for Provisioning RHEL VMs, followed by the specific playbooks for RHEL worker nodes outlined below:

-   `playbooks/scale_workers.yml` installs and configures additional Linux workers on the target nodes defined by the group `worker` in the `vm_hosts` inventory.

A utility script `scale_worker.sh` is provided to assist you in adding worker nodes after the initial deployment.
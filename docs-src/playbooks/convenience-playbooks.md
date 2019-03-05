# Convenience playbooks

-   `playbooks/clean_all.yml` powers off and deletes all VMs in your inventory.
-   `playbooks/distribute_keys.yml` distributes public keys between all nodes, to allow each node to password-less log in to every other node. As this is not essential and can be regarded as a security risk (a worker node probably should not be able to log in to a UCP node, for instance), this playbook is commented out in `site.yml` by default.
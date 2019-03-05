# Installing Docker UCP and DTR on RHEL VMs

The following playbooks are used to install Docker UCP and DTR on RHEL VMs.

-   `playbooks/config_storage_driver.yml` prepares drives for local Docker volumes and container images. It also configures Docker with either the `overlay2` storage driver (the default) or the `devicemapper` storage driver, depending on the value of the `docker_storage_driver` variable in `group_vars/vars`. This playbook was previously called `playbooks/config_docker_lvs.yml` in earlier releases of the solution.
-   `playbooks/install_docker.yml` installs Docker along with all of its dependencies.
-   `playbooks/install_rsyslog.yml` installs and configures **rsyslog** in the logger node and in all Docker nodes. The logger node will be configured to receive all `syslogs` on port 514 and the Docker nodes will be configured to send all logs (including container logs) to the logger node.
-   `playbooks/docker_post_config.yml` performs a variety of tasks to complete the installation of the Docker environment, including configuration of the HTTP/HTTPS proxies, if any, and installation of the VMware vSphere Storage for Docker volume plugin.
-   `playbooks/install_nfs_server.yml` installs and configures an NFS server on the NFS node.

    This playbook has been updated to configure a third drive which is used to hold the data of the persistent volumes created with the NFS provisioner. This default size for this drive is purposefully kept small because using the NFS VM to store persistent volumes is not recommended for production use. However, this can be useful for demo purposes.

-   `playbooks/install_nfs_clients.yml` installs the required packages on the Docker nodes to be able to mount an NFS share.
-   `playbooks/create_main_ucp.yml` installs and configures the first Docker UCP instance on the target node defined by the group `ucp_main` in the `vm_hosts` inventory.
-   `playbooks/scale_ucp.yml` installs and configures additional instances of UCP on the target nodes defined by the group `ucp` in the `vm_hosts` inventory, except for the node defined in the group `ucp_main`.
-   `playbooks/create_main_dtr.yml` installs and configures the first Docker DTR instance on the target node defined by the group `dtr_main` in the `vm_hosts` inventory.
-   `playbooks/config_scheduler.yml` configures the scheduler to prevent regular users (i.e. non-admin users) scheduling containers on the Docker nodes running instances of UCP and DTR.
-   `playbooks/scale_dtr.yml` installs and configures additional instances (or replicas) of DTR on the target nodes defined by the group `dtr` in the `vm_hosts` inventory, with the exception of the node defined in the group `dtr_main`.
-   `playbooks/reconfigure_dtr.yml` is used to reconfigure DTR with the FQDN of the UCP Load Balancer and also enables image scanning.
# Overview of the playbooks

## Create virtual machines

The playbook [playbooks/create\_vms.yml][create_vms] will create all the necessary Virtual Machines for the environment from the VM Template defined in the vm_template variable.

## Configure network settings
The playbook [config\_networking.yml][config_networking] will configure the network settings in all the Virtual Machines. 

## Distribute public keys
The playbook [distribute\_keys.yml][distribute_keys] distributes public keys between all nodes, to allow each node to password-less login to every other node. As this is not essential and can be regarded as a security risk (a worker node probably should not be able to log in to a UCP node, for instance), this playbook is commented out in site.yml by default and must be explicitly uncommented to enable this functionality.

## Register the VMs with Red Hat
The playbook [config\_subscription.yml][config_subscription] registers and subscribes all virtual machines to the Red Hat Customer Portal. This is only needed if you pull packages from Red Hat.

## Install HAProxy
The playbook [install\_haproxy.yml][install_haproxy] installs and configures the HAProxy package in the load balancer nodes. HAProxy is the chosen tool to implement load balancing between UCP nodes, DTR nodes and worker nodes.

## Install NTP
The playbook [install\_ntp.yml][install_ntp] installs and configures the NTP package in all Virtual Machines in order to have a synchronized clock across the environment. It will use the server or servers specified in the ntp_servers variable in the group variables file.

## Install Docker Enterprise Edition
The playbook [install\_docker.yml][install_docker] installs Docker along with all its dependencies.


## Install rsyslog
The playbook [install_rsyslog.yml][install_rsyslog] installs and configures rsyslog in the logger node and in all Docker nodes. The logger node will be configured to receive all syslogs on port 514 and the Docker nodes will be configured to send all logs (including container logs) to the logger node.


## Configure Docker LVs
The playbook [config_docker_lvs.yml][config_docker_lvs] performs a set of operations on the Docker nodes in order to create a partition on the second disk and carry out the LVM configuration, required for a sound Docker installation.


## Docker post-install configuration
The playbook [docker_post_config.yml][docker_post_config] performs a variety of tasks to complete the installation of the Docker environment.



## Install NFS server 
The playbook [install_nfs_server.yml][install_nfs_server] installs and configures an NFS server on the NFS node.



## Install NFS clients
The playbook [install_nfs_clients.yml][install_nfs_clients] installs the required packages on the DTR nodes to be able to mount an NFS share.


## Install and configure Docker UCP nodes
The playbook [install_ucp_nodes.yml][install_ucp_nodes] installs and configures the Docker UCP nodes defined in the inventory.



## Install and configure DTR nodes
The playbook [install_dtr_nodes.yml][install_dtr_nodes] installs and configures the Docker DTR nodes defined in the inventory. Note that serialization is set to 1 in this playbook as two concurrent installations of DTR may in some cases be assigned the same replica ID.

## Install worker nodes
The playbook [install_worker_nodes.yml][install_worker_nodes] installs and configures the Docker Worker nodes defined in the inventory.


## Configuring monitoring
The playbook [config_monitoring.yml][config_monitoring] configures a monitoring system for the Docker environment by making use of Grafana, Prometheus, cAdvisor and node-exporter Docker containers.

**Note:** If you have your own monitoring solution, you can comment out the corresponding line in the main playbook ```site.yml```
```
#- include: playbooks/config_monitoring.yml
```





[create_vms]: </playbooks/create_vms.yml>
[config_networking]: </playbooks/config_networking.yml>
[distribute_keys]: </playbooks/distribute_keys.yml>
[config_subscription]: </playbooks/config_subscription.yml>
[install_haproxy]: </playbooks/install_haproxy.yml>
[install_ntp]: </playbooks/install_ntp.yml>
[install_docker]: </playbooks/install_docker.yml>
[install_rsyslog]: </playbooks/install_rsyslog.yml>
[config_docker_lvs]: </playbooks/config_docker_lvs.yml>
[docker_post_config]: </playbooks/docker_post_config.yml>
[install_nfs_server]: </playbooks/install_nfs_server.yml>
[install_nfs_clients]: </playbooks/install_nfs_clients.yml>
[install_ucp_nodes]: </playbooks/install_ucp_nodes.yml>
[install_dtr_nodes]: </playbooks/install_dtr_nodes.yml>
[install_worker_nodes]: </playbooks/install_worker_nodes.yml>
[config_monitoring]: </playbooks/config_monitoring.yml>

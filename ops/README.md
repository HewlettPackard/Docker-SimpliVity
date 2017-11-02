# Introduction

Express Containers with Docker is a complete solution from Hewlett Packard Enterprise that includes all the hardware, software, professional services, and support you need to deploy an operational containers-as-a-service (CaaS) platform, allowing you to get up and running quickly and efficiently. The solution takes the HPE hyperconverged infrastructure and combines it with Docker’s enterprise-grade container platform, popular open source tools, along with deployment and advisory services from HPE Pointnext.

Express Containers with Docker is ideal for customers either migrating legacy applications to containers, transitioning to a container DevOps development model or needing a hybrid environment to support container and non-containerized applications on a common VM platform.  Express Containers with Docker provides a solution for both IT development and IT operations, and comes in two versions.  The version for IT developers (Express Containers with Docker: Dev Edition) addresses the need to provide a cloud-like container development environment with built-in container tooling.  The version for IT operations (Express Containers with Docker: Ops Edition) addresses the need to have a production ready environment that is very easy to deploy and manage.  

This document describes the best practices for deploying and operating the Express Containers with Docker: Ops Edition.   It describes how to automate the provisioning of the environment using a set of Ansible playbooks. It also outlines a set of manual steps to harden, secure and audit the overall status of the system. A corresponding document focused on setting up Express Containers with Docker: Dev Edition is also available. TODO.


**Note**
- The Ansible playbooks described in this document are only intended for Day 0 deployment automation of Docker EE on SimpliVity
- The Ansible playbooks described in this document are not directly supported by HPE and are intended as an example of deploying Docker EE on HPE SimpliVity.  We welcome input from the user community via Github to help us prioritize all future bug fixes and feature enhancements

## About Ansible

Ansible is an open-source automation engine that automates software provisioning, configuration management and application deployment.

As with most configuration management software, Ansible has two types of server: the controlling machine and the nodes. A single controlling machine orchestrates the nodes by deploying modules to the nodes over SSH. The modules are temporarily stored on the nodes and communicate with the controlling machine through a JSON protocol over the standard output. When Ansible is not managing nodes, it does not consume resources because no daemons or programs are executing for Ansible in the background. Ansible uses one or more inventory files to manage the configuration of the multiple nodes in the system.

In contrast with other popular configuration management software such as Chef, Puppet, and CFEngine, Ansible uses an agentless architecture. With an agent-based architecture, nodes must have a locally installed daemon that communicates with a controlling machine. With an agentless architecture, nodes are not required to install and run background daemons to connect with a controlling machine. This type of architecture reduces the overhead on the network by preventing the nodes from polling the controlling machine.
More information about Ansible can be found here: [http://docs.ansible.com](http://docs.ansible.com)


## About Docker Enterprise Edition

Docker Enterprise Edition (EE) is a containers-as-a-service (CaaS) platform for IT that manages and secures diverse applications across disparate infrastructure, both on-premises and in the cloud. Docker EE provides integrated container management and security from development to production. Enterprise-ready capabilities like multi-architecture orchestration and secure software supply chain give IT teams the ability to manage and secure containers without breaking the developer experience.

Docker EE provides

- Integrated management of all application resources from a single web admin UI.
- Frictionless deployment of applications and Compose files to production in a few clicks.
- Multi-tenant system with granular role-based access control (RBAC) and LDAP/AD integration.
- Self-healing application deployment with the ability to apply rolling application updates.
- End-to-end security model with secrets management, image signing and image security scanning.


More information about Docker Enterprise Edition can be found here: [https://www.docker.com/enterprise-edition](https://www.docker.com/enterprise-edition)

## About Simplivity

Simplivity is an enterprise-grade hyper-converged platform uniting best-in-class data services with the world's bestselling server.

Rapid proliferation of applications and the increasing cost of maintaining legacy infrastructure causes significant IT challenges for many organizations. With HPE SimpliVity, you can streamline and enable IT operations at a fraction of the cost of traditional and public cloud solutions by combining your IT infrastructure and advanced data services into a single, integrated solution. HPE SimpliVity is a powerful, simple, and efficient hyperconverged platform that joins best-in-class data services with the world’s best-selling server and offers the industry’s most complete guarantee.

More information about Simplivity can be found here: [https://www.hpe.com/us/en/integrated-systems/simplivity.html](https://www.hpe.com/us/en/integrated-systems/simplivity.html)

**Target Audience:** This document is primarily aimed at technical individuals working in the Operations side of the pipeline, such as system administrators and infrastructure engineers, but anybody with an interest in automating the provisioning of virtual servers and containers may find this document useful.
	
**Assumptions:** The present document assumes a minimum understanding in concepts such as virtualization and containerization and also some knowledge around Linux and VMWare technologies.


## Required Versions

The following software versions were used to test the playbooks that are described in later sections. Other version may work but have not been tested.

- Ansible 2.2
- Docker EE 17.06
- Red Hat Enterprise Linux 7.3 and 7.4
- VMWare ESXi 6.5.0 and vCenter 6.5.0
- HPE SimpliVity OmniStack 3.7.1.60


# Architecture

The Operations environment is comprised of three HPE SimpliVity 380 Gen10 servers. Since the SimpliVity technology relies on VMware virtualization, the servers are managed using vCenter. The load among the three hosts will be shared as per Figure 1.

Uptime is paramount for any users implementing Docker containers in business critical environments. Express Containers offers various levels of high availability (HA) to support continuous availability. All containers and Docker services implemented in containers are protected by Docker’s swarm mode. Swarm mode can protect against individual hardware, network, and container failures based on the user’s declarative model. 

Express Containers with Docker also deploys load balancers in the system to help with container traffic management. There are three load balancer VMs – UPC load balancer, DTR load balancer, and Docker worker node load balancer. Since these load balancers exist in VMs, they have some degree of HA but will likely incur some downtime during the restoration of these VMs due to a planned or unplanned outage. For optimal HA configuration, the user should consider implementing a HA load balancer architecture using the Virtual Router Redundancy Protocol (VRRP). For more information see http://www.haproxy.com/solutions/high-availability/. 




![Solution Architecture][simplivity-ops-simple-architecture]
**Figure 1.** Solution Architecture

The Ansible playbooks can be modified to fit your environment and your high availability (HA) needs. By default, the Ansible Playbooks will set up a 3 node environment.  HPE and Docker recommend a minimal starter configuration of 3 physical nodes for running Docker in production.  The distribution of the Docker and non-Docker modules over the 3 physical nodes via virtual machines (VMs) is as follows:

- 3 Docker Universal Control Plane (UCP) VM nodes for HA and cluster management
- 3 Docker Trusted Registry (DTR) VM nodes for HA of the container registry
- 3 worker VM nodes for container workloads
- Docker UCP load balancer VM to ensure access to UCP in the event of a node failure
- Docker DTR load balancer VM to ensure access to DTR in the event of a node failure
- Docker Swarm Worker node VM load balancer
- Logging server VM for central logging 
- NFS server VM for storage Docker DTR images

These nodes are installed on VMs, spread across three SimpliVity servers. Each server will consist of:

- At least one UCP node, but ideally 3 or 5, spread across the 3 SimpliVity servers
- At least one DTR node, but ideally 3 or 5, spread across the 3 SimpliVity servers
- At least one worker node, but ideally 3 or 5, spread across the 3 SimpliVity servers

In addition to the above, the playbooks set up:

- 3 load balancers, one for each set of nodes (one Worker load balancer, one DTR load balancer and one UCP load balancer)
- 1 central logging server 
- 1 NFS server
- Docker persistent storage driver from VMware
- Prometheus and Grafana monitoring tools
- SimpliVity backup policy for data volumes and Docker images inside DTR

These nodes can live in any of the hosts and they are not redundant.


# Sizing considerations

A node is a machine in the cluster (virtual or physical) with Docker Engine running on it. When provisioning each node, assign it a role: UCP Controller, DTR, or worker node so that they are protected from running application workloads.

To decide what size the node should be in terms of CPU, RAM, and storage resources, consider the following:

1. All nodes should at least fulfil the minimal requirements, for UCP 2.0 2GB of RAM and 3GB of storage. More detailed requirements are in the UCP documentation.
2. UCP Controller nodes should be provided with more than the minimal requirements, but won’t need much more if nothing else runs on them.
3. Ideally, Worker nodes size will vary based on your workloads so it is impossible to define a universal standard size.
4. Other considerations like target density (average number of containers per node), whether one standard node type or several are preferred, and other operational considerations might also influence sizing.

If possible, node size should be determined by experimentation and testing actual workloads, and they should be refined iteratively. A good starting point is to select a standard or default machine type in your environment and use this size only. If your standard machine type provides more resources than the UCP Controllers need, it makes sense to have a smaller node size for these. Whatever the starting choice, it is important to monitor resource usage and cost to improve the model.

For Express Containers with Docker: Ops Edition, the following section describes sizing configurations.  The vCPU allocations are described in Table 1 while the memory allocation is described in Table 2.

**Table 1.** vCPU

| vCPUs | simply01 | simply02 | simply03 |
|:------|:--------:|:--------:|:--------:|
| ucp1  |	4      |          |	         |
| ucp2  |          |4         |          |
| ucp3	|          |          | 4        |
| dtr1  | 2		   |          |          |
| dtr2  |          | 2	      |          |
| dtr3  |          |          |  2       |
| worker1 |4	   |          |          |	
| worker2| 	       | 	4	  | 
| worker3| 		   |          | 	4
| ucb_lb| 	2      | 		  | 
| dtr_lb| 	       | 	2	  | 
| worker_lb	| 	   |          |  2
| nfs	| 	       |          |  2      | 
| logger	| 	   |  2	      | 
| **Total vCPU per node**|	**12** |**14**|	       **14**|
| **Total vCPU**| 	   | **40**	
| Available CPUs| 24 | 24	  | 24
| Log Proc	| 48   | 	48	  | 48
| **Total Log Proc** (on two nodes) | | **96**	






**Table 2.** Memory allocation

| RAM | simply01 | simply02 | simply03 |
|:------|:--------:|:--------:|:--------:|
| ucp1  |	8      |          |	         |
| ucp2  |          |8         |          |
| ucp3	|          |          | 8        |
| dtr1  | 16	   |          |          |
| dtr2  |          | 16       |          |
| dtr3  |          |          |  16      |
| worker1 |64	   |          |          |	
| worker2| 	       | 	64	  | 
| worker3| 		   |          | 	64
| ucb_lb| 	4      | 		  | 
| dtr_lb| 	       | 	4	  | 
| worker_lb	| 	   |          |  4
| nfs	| 	       |          |  4      | 
| logger	| 	   |  4	      | 
| **Total RAM required** (per node)| 	**92**	| **96**| 	**96**
| **Total RAM required**| 	| 	**284**	
| Available RAM	| 384	| 384| 	384
| **Total Available RAM** (on two nodes)| | 		**768**	








# Provisioning the operations environment

This section describes in detail how to provision the environment described previously in the architecture section. The figure below shows the high level steps this guide will take.

![Provisioning steps][provisioning]


## Verify Prerequisites

You will need assemble the information required to assign values to each and every variable used by the playbooks before you start deployment. The variables are fully documented in the following sections “Editing the group variables” and “Editing the vault”. A summary of the information required is presented in Table 3.

**Table 3.** Summary of information required

|Component|	Details|
|---------|-----------|
|Virtual Infrastructure|	The FQDN of your vCenter server and the name of the Datacenter which contains the SimpliVity cluster. You will also need administrator credentials in order to create templates, and spin up virtual machines.
|SimpliVity Cluster	|The name of the SimpliVity cluster and the names of the member of this cluster as they appear in vCenter. You will also need to know the name of the SimpliVity datastore where you want to land the various virtual machines. You may have to create this datastore if you just installed your SimpliVity cluster. In addition, you will need the IP addresses of the OmniStack virtual machines. Finally you will need credentials with admin capabilities for using the OmniStack API. These credentials are typically the same as you vCenter admin credentials
|L3 Network requirements|	You will need one IP address for each and every VM configured in the Ansible inventory (see the section “Editing the inventory”). At the time of writing, the example inventory configures 14 virtual machines so you would need to allocate 14 IP addresses to use this example inventory. Note that the Ansible playbooks do not support DHCP so you need static IP addresses.   All the IPs should be in the same subnet. You will also have to specify the size of the subnet (for example /22 or /24) and the L3 gateway for this subnet.
|DNS|	You will need to know the IP addresses of your DNS server. In addition, all the VMs you configure in the inventory should have their names registered in DNS. In addition, you will need the domain name to use for configuring the virtual machines (such as example.com)
|NTP Services|	You need time services configured in your environment. The solution being deployed (including Docker) uses certificates and certificates are time sensitive. You will need the IP addresses of your time servers (NTP).
|Docker Prerequisites|	You will need a URL for the official Docker EE software download and a license file.  Refer to the Docker documentation to learn more about this URL and the licensing requirements here: https://docs.docker.com/engine/installation/linux/docker-ee/rhel/ Learn how to download the Docker EE license key here: https://success.docker.com/KBase/How_do_I_download_my_Docker_license_key 
|Proxy	|The playbooks pull the Docker packages from the Internet. If you environment accesses the Internet through a proxy, you will need the details of the proxy including the fully qualified domain name and the port number.



## Install vSphere Docker Volume Service driver on all ESXi hosts

This is a one-off manual step. In order to be able to use Docker volumes using the vSphere driver, you must first install the latest release of the vSphere Docker Volume Service (vDVS) driver, which is available as a vSphere Installation Bundle (VIB). To perform this operation, login to each of the ESXi hosts in turn and then download and install the latest release of vDVS driver.

```
# esxcli software vib install -v /tmp/vmware-esx-vmdkops-<version>.vib --no-sig-check
```

More information on how to download and install the driver can be found here: https://vmware.github.io/docker-volume-vsphere/documentation/install.html#vib-installation-through-esxclilocalcli 








## Create a VM template

The very first step to our automated solution will be the creation of a VM Template that will be the base of all your nodes. In order to create a VM Template we will first create a Virtual Machine where the OS will be installed and then the Virtual Machine will be converted to a VM Template. Since the goal of the automation is get rid of as many repetitive tasks as possible, the VM Template will be created as lean as possible, so any additional software installs and/or system configuration will be done later by Ansible.

It would be possible to automate the creation the template. However, as this is a one-off task, it is appropriate to do it manually. The steps to create a VM template manually are described below.

1. Log in to vCenter and create a new Virtual Machine. In the dialog box, shown in Figure 2, select ```Typical``` and press ```Next```.  
![Create New Virtual Machine][createnewvm]  
**Figure 2.** Create New Virtual Machine  
  
2. Specify the name and location for your template, as shown in Figure 3.  
![Specify name and location for the virtual machine][vmnamelocation]  
**Figure 3.** Specify name and location for the virtual machine  
  
3. Choose the host/cluster on which you want to run this virtual machine, as shown in Figure 4.
![Choose host / cluster][choosehost]  
**Figure 4.** Choose host / cluster 


4. Choose a datastore where the template files will be stored, as shown in Figure 5.
![Select storage for template files][selectstorage]  
**Figure 5.** Select storage for template files


5. Choose the OS as shown in Figure 6, in this case Linux, RHEL7 64bit.
![Choose operating system][chooseos]  
**Figure 6.** Choose operating system

6. Pick the network to attach to your template as shown in Figure 7. In this example we're only using one NIC but depending on how you plan to architect your environment you might want to add more than one.
![Create network connections][createnetwork]  
**Figure 7.** Create network connections


7. Create a primary disk as shown in Figure 8. The chosen size in this case is 50GB but 20GB should be typically enough.
![Create primary disk][createprimarydisk]  
**Figure 8.** Create primary disk


8. Confirm that the settings are right and press Finish as shown in Figure 9.
![Confirm settings][confirmsettings]  
**Figure 9.** Confirm settings



9. The next step is to virtually insert the RHEL7 DVD, using the Settings of the newly created VM as shown in Figure 10. Select your ISO file in the Datastore ISO File Device Type and make sure that the “Connect at power on” checkbox is checked.  
![Virtual machine properties][vmprops]  
**Figure 10.** Virtual machine properties



10. Finally, you can optionally remove the Floppy Disk, as shown in Figure 11, as this is not required for the VM.
![Remove Floppy drive][removefloppy]  
**Figure 11.** Remove Floppy drive

11. Power on the server and open the console to install the OS. On the welcome screen, as shown in Figure 12, pick your language and press `Continue`.
![Welcome screen][welcomescreen]  
**Figure 12.** Welcome screen

12. The installation summary screen will appear, as shown in Figure 13.
![Installation summary][installsummary]  
**Figure 13.** Installation summary

13. Scroll down and click on Installation Destination, as shown in Figure 14.
![Installation destination][installdestination]  
**Figure 14.** Installation destination

14. Select your installation drive, as shown in Figure 15, and click Done.
![Select installation drive][installdrive]  
**Figure 15.** Select installation drive


15. Click Begin Installation, using all the other default settings, and wait for the configuration of user settings dialog, shown in Figure 16.
![Configure user settings][configuser]  
**Figure 16.** Configure user settings


16. Select a root password, as shown in Figure 17.
![Set root password][setrootpwd]  
**Figure 17.** Set root password



17. Click Done and wait for the install to finish. Reboot and log in into the system using the VM console.
18.	The Red Hat packages required during the deployment of the solution come from two repositories: `rhel-7-server-rpms` and `rhel 7-server-extras-rpms`. The first repository can be found on the Red Hat DVD but the second cannot. There are two options, with both requiring a Red Hat Network account.
  - Use Red Hat subscription manager to register your system. This is the easiest way and will automatically give you access to the official Red Hat repositories. It does require having a Red Hat Network account though, so if you don’t have one, you can use a different option. Use the `subscription-manager register` command as follows.
```
# subscription-manager register --auto-attach
```
If you are behind a proxy, you must configure this before running the above command to register.
```
# subscription-manager config --server.proxy_hostname=<proxy IP> --server.proxy_port=<proxy port>
```
If you follow this “route”, the playbooks will automatically enable the “extras” repository on the VMs that need it.
  - Use an internal repository. Instead of pulling the packages from Red Hat, you can create copies of the required repositories on a dedicated node. You can then configure the package manager to pull the packages from the dedicated node. Your `/etc/yum.repos.d/redhat.repo` could look as follows.
```
[RHEL7-Server]
name=Red Hat Enterprise Linux $releasever - $basearch
baseurl=http://yourserver.example.com/rhel-7-server-rpms/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release

[RHEL7-Server-extras]
name=Red Hat Enterprise Linux Extra pkg $releasever - $basearch
baseurl=http://yourserver.example.com/rhel-7-server-extras-rpms/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release
```
The following articles explain how you can create a local mirror of the Red Hat repositories and how to share them.
https://access.redhat.com/solutions/23016  
https://access.redhat.com/solutions/7227

Before converting the VM to a template, you will need to setup up access for the Ansible host to configure the individual VMs. This is explained in the next section. 










## Create the Ansible node

In addition to the VM Template, we need another Virtual Machine where Ansible will be installed. This node will act as the driver to automate the provisioning of the environment and it is essential that it is properly installed. The steps are as follows.

1. Create a Virtual Machine and install your preferred OS (in this example, and for the sake of simplicity, RHEL7 will be used). The rest of the instructions assume that, if you use a different OS, you understand the possible differences in syntax for the provided commands. If you use RHEL 7, select **Infrastructure Server** as the base environment and the **Guests Agents** add-on during the installation.
2. Log in the root account and create an SSH key pair. Do not protect the key with a passphrase (unless you want to use ssh-agent).  
```
# ssh-keygen
```
3. Configure the following yum repositories, rhel-7-server-rpms and rhel-7-server-extras-rpms as explained in the previous section.
4. Configure the EPEL repository. See here for more information: http://fedoraproject.org/wiki/EPEL. Note that ```yum-config-manager``` comes with the Infrastructure Server base environment, if you did not select this environment you will have to install the ```yum-utils``` package.
```
# rpm -ivh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
# yum-config-manager --enable rhel-7-server-extras-rpms	
```
5. Install Ansible. Please note that version 2.2 is the minimum required. The instructions on how to install Ansible are described in its official website: http://docs.ansible.com/ansible/intro_installation.html
```
# yum install ansible
```
6. Make a list of all the hostnames and IPs that will be in your system and update your ```/etc/hosts``` file accordingly. This includes your UCP nodes, DTR nodes, worker nodes, NFS server, logger server and load balancers.
7. Install the following packages which are a mandatory requirement for the playbooks to function as expected. (Update pip if requested).
```
# yum install python-pyvmomi python-netaddr python2-jmespath python-pip gcc python-devel openssl-devel git
# pip install --upgrade pip
# pip install cryptography
# pip install pysphere
```
8. Copy your SSH public key to the VM Template so that, in the future, your Ansible node can SSH without the need of a password to all the Virtual Machines created from the VM Template.
```
# ssh-copy-id root@<VM_Template>
```

Please note that in both the Ansible node and the VM Template you might need to configure the network so one node can reach the other. Instructions for this step have been omitted since it is a basic step and could vary depending on the user’s environment.







## Finalize the template

Now that the VM Template has the public key of the Ansible node, we’re ready to convert this VM to a VM Template. Perform the following steps in the VM Template to finalize its creation:

1. Clean up the template by running the following commands:

```
# rm /etc/ssh/ssh_host_*
# history -c
```

2. Shut down the VM

```# shutdown –h now```

3. Once the Virtual Machine is ready and turned off, convert it to a template as shown in Figure 18.
![Convert to template][converttotemplate]  
**Figure 18** Convert to template  

This completes the creation of the VM Template.







## Prepare your Ansible configuration

On the Ansible node, retrieve the latest version of the playbooks using git.
```
# git clone https://github.com/HewlettPackard/Docker-SimpliVity

```

You now need to prepare the configuration to match your own environment, prior to deploying Docker EE and the rest of the nodes. To do so, you will need to edit and modify three different files:



- ```vm_hosts``` (the inventory file)
- ```group_vars/vars``` (the group variables file)
- ```group_vars/vault``` (the encrypted group variable file)





## Editing the inventory

Change to the directory that you previously cloned using git and edit the ```vm\_hosts``` file.

The nodes inside the inventory are organized in groups. The groups are defined by brackets and the group names are static so they must not be changed. Anything else (hostnames, specifications, IP addresses…) are meant to be amended to match the user needs. The groups are as follows:

- [ucp\_main]: A group containing one single node which will be the main UCP node and swarm leader. Do not add more than one node under this group.
- [ucp]: A group containing all the UCP nodes, including the main UCP node. Typically you should have either 3 or 5 nodes under this group.
- [dtr\_main]: A group containing one single node which will be the first DTR node to be installed. Do not add more than one node under this group.
- [dtr]: A group containing all the DTR nodes, including the main DTR node. Typically you should have either 3 or 5 nodes under this group.
- [worker]: A group containing all the worker nodes. Typically you should have either 3 or 5 nodes under this group.
- [ucp\_lb]: A group containing one single node which will be the load balancer for the UCP nodes. Do not add more than one node under this group.
- [dtr\_lb]: A group containing one single node which will be the load balancer for the DTR nodes. Do not add more than one node under this group.
- [worker\_lb]: A group containing one single node which will be the load balancer for the worker nodes. Do not add more than one node under this group.
- [lbs]: A group containing all the load balances. This group will have 3 nodes, also defined in the three groups above.
- [nfs]: A group containing one single node which will be the NFS node. Do not add more than one node under this group.
- [logger]: A group containing one single node which will be the logger node. Do not add more than one node under this group.
- [local]: A group containing the local Ansible host. It contains an entry that should not be modified.

There are also a few special groups:

- [docker:children]: A group of groups including all the nodes where Docker will be installed.
- [vms:children]: A group of groups including all the Virtual Machines involved apart from the local host.

Finally, you will find some variables defined for each group:

- [ucp:vars]: A set of variables defined for all nodes in the [```ucp```] group.
- [dtr:vars]: A set of variables defined for all nodes in the [```dtr```] group.
- [worker:vars]: A set of variables defined for all nodes in the [```worker```] group.
- [lbs:vars]: A set of variables defined for all nodes in the [```lbs```] group.
- [nfs:vars]: A set of variables defined for all nodes in the [```nfs```] group.
- [logger:vars]: A set of variables defined for all nodes in the [```logger```] group.

If you wish to configure your nodes with different specifications rather than the ones defined by the group, it is possible to declare the same variables at the node level, overriding the group value. For instance, you could have one of your workers with higher specifications by doing:

```
[worker]
worker01 ip_addr='10.0.0.10/16' esxi_host='esxi1.domain.local'
worker02 ip_addr='10.0.0.11/16' esxi_host='esxi1.domain.local'
worker03 ip_addr='10.0.0.12/16' esxi_host='esxi1.domain.local' cpus='16' ram'32768'
[worker:vars]
cpus='4'
ram='16384'
disk2_size='200'
node_policy='bronze'
```

In  the example above, the ```worker03``` node would have 4 times more CPU and double the RAM compared to the rest of worker nodes.

The different variables you can use are as described in Table 4 below. They are all mandatory unless if specified otherwise.

**Table 4.** Variables

| Variable     | Scope      | Description                              |
| ------------ | ---------- | ---------------------------------------- |
| ip\_addr     | Node       | IP address in CIDR format to be given to a node |
| esxi\_host   | Node       | ESXi host where the node will be deployed. If the cluster is configured with DRS, this option will be overriden |
| cpus         | Node/Group | Number of CPUs to assign to a VM or a group of VMs |
| ram          | Node/Group | Amount of RAM in MB to assign to a VM or a group of VMs |
| disk2\_usage | Node/Group | Size of the second disk in GB to attach to a VM or a group of VMs. This variable is only mandatory on Docker nodes (UCP, DTR, worker) and NFS node. It is not required for the logger node or the load balancers. |
| node\_policy | Node/Group | Simplivity backup policy to assign to a VM or a group of VMs. The name has to match one of the backup policies defined in the ```group_vars/vars``` file described in the next section. |





## Editing the group variables

Once the inventory is ready, the next step is to modify the group variables to match your environment. To do so, you need to edit the file ```group_vars/vars``` under the cloned directory containing the playbooks. The variables here can be defined in any order but for the sake of clarity they have been divided into sections.

### VMware configuration

All VMware-related variables are mandatory and are described in Table 5.

**Table 5. VMware variables**

| Variable                 | Description                              |
| ------------------------ | ---------------------------------------- |
| vcenter\_hostname        | IP or hostname of the vCenter appliance  |
| vcenter\_username        | Username to log in to the vCenter appliance. It might include a domain, for example, '[administrator@vsphere.local](mailto:administrator@vsphere.local)'. Note: The corresponding password is stored in a separate file (```group_vars/vault```) with the variable named ```vcenter_password```. |
|vcenter_validate_certs    | ‘no’ |
| datacenter               | Name of the datacenter where the environment will be provisioned |
| vm\_username             | Username to log into the VMs. It needs to match the one from the VM Template, so unless you have created an user, you must use 'root'. Note: The corresponding password is stored in a separate file (```group_vars/vault```) with the variable named ```vm_password```.  |
| vm\_template             | Name of the VM Template to be used. Note that this is the name from a vCenter perspective, not the hostname |
| folder\_name             | vCenter folder to deploy the VMs. If you do not wish to deploy in a particular folder, the value should be ```/```. **Note**: If you want to deploy in a specific folder, you need to create this folder in the inventory of the selected datacenter before starting the deployment. |
| datastores               | List of datastores to be used, in list format, i.e. ['```Datastore1```','```Datastore2```'...]. Please note that from a Simplivity perspective, it is best practice to use just one Datastore. Using more than one will not provide any advantages in terms of reliability and will add additional complexity. This datastore must exist before you run the playbooks. |
| disk2                    | UNIX name of the second disk for the Docker VMs. Typically ```/dev/sdb``` |
| disk2\_part              | UNIX name of the partition of the second disk for the Docker VMs. Typically ```/dev/sdb1``` |
| vsphere\_plugin\_version | Version of the vSphere plugin for Docker. The default is ```0.13``` which is the latest version at the time of writing this document. |



### Simplivity configuration

All SimpliVity variables are mandatory and are described in Table 6.

**Table 6.** SimpliVity variables

<table>
  <tr>
    <th>Variable</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>simplivity_username</td>
	<td>Username to log in to the Simplivity Omnistack appliances. It might include a domain, for example, <a href="mailto:administrator@vsphere.local">administrator@vsphere.local</a>. Note: The corresponding password is stored in a separate file (<code>group_vars/vault</code>) with the variable named <code>simplivity_password</code>.</td>
  </tr>
  <tr>
    <td>omnistack_ovc</td>
	<td>List of Omnistack hosts to be used, in list format, i.e. <code>[‘omni1.local’,’onmi2.local’...]</code>. If your OmniStack virtual machines do not have their names registered in DNS, you can use their IP addresses.  
	</td>
  </tr>
  <!--<tr>
    <td>rest_api_pause</td>
	<td>TODO: Default value is 10.
	</td>
  </tr>	-->
   <tr>
	<td>backup_policies </td>
	<td>
	List of dictionaries containing the different backup policies to be used along with the scheduling information. Any number of backup policies can be created and they need to match the <code>node_policy</code> variables defined in the inventory. Times are indicated in minutes.  All month calculations use a 30-day month. All year calculations use a 365-day year. The format is as follows:
<pre>
backup_policies:
 - name: daily'   
   days: 'All'   
   start_time: '11:30'   
   frequency: '1440'   
   retention: '10080' 
 - name: 'hourly'   
   days: 'All'   
   start_time: '00:00'   
   frequency: '60'   
   retention: '2880'
</pre>	
	
  </tr>
  <tr>
  <td>dummy_vm_prefix</td>
  <td>In order to be able to backup the Docker volumes, a number of "dummy" VMs need to spin up. This variable will set a recognizable prefix for them. </td>
  </tr>
  <tr>
	<td>docker_volumes_policy</td>
	<td>Backup policy to use for the Docker Volumes.</td>
  </tr>
</table>





### Networking configuration

All network-related variables are mandatory and are described in Table 7.

**Table 7.** Network variables

| Variable     | Description                              |
| ------------ | ---------------------------------------- |
| nic\_name    | Name of the device, for RHEL this is typically ```ens192``` and it is recommended to leave it as is. |
| gateway      | IP address of the gateway to be used     |
| dns          | List of DNS servers to be used, in list format, i.e. ['```10.10.173.1```','```10.10.173.2```'...] |
| domain\_name | Domain name for your Virtual Machines    |
| ntp\_server  | List of NTP servers to be used, in list format, i.e. ['```1.2.3.4```','```0.us.pool.net.org```'...] |




### Docker configuration

All Docker-related variables are mandatory and are described in Table 8.

| Variable      | Description                              |
| ------------- | ---------------------------------------- |
| docker_ee_url | Your ```docker_ee_url``` should be kept secret and you should define it in ```group_vars/vault```. The value for ```docker_ee_url``` is the URL documented at the following address: https://docs.docker.com/engine/installation/linux/docker-ee/rhel/. |
| rhel_version  | Version of your RHEL OS, such as  ```7.3```. The playbooks were tested with RHEL 7.3. and RHEL 7.4.        |
| dtr_version   | Version of the Docker DTR you wish to install. You can use a numeric version or ```latest``` for the most recent one. The playbooks where tested with 2.3.3. |
| ucp_version   | Version of the Docker UCP you wish to install. You can use a numeric version or ```latest``` for the most recent one. The playbooks were tested with UCP 2.2.3. |
| images_folder | Directory in the NFS server that will be mounted in the DTR nodes and that will host your Docker images. |
| license_file  | Full path to your Docker license file (it should be stored in your Ansible host). |
| ucp_username  | Username of the administrator user for UCP and DTR, typically ```admin```. Note: The corresponding password is stored in a separate file (```group_vars/vault```) with the variable named ```ucp_password```.|




### Monitoring configuration

All Monitoring-related variables are described in Table 9. The variables determine the versions of various monitoring software tools that are used and it is recommended that the values given below are used. 

**Table 9.** Monitoring variables

| Variable                | Description                              |
| ----------------------- | ---------------------------------------- |
| cadvisor\_version       | ```v0.25.0``` |
| node\_exporter\_version | ```v1.14.0``` |
| prometheus\_version     | ```v1.7.1``` |
| grafana\_version        | ```4.4.3``` |
| prom_persistent_vol_name | The name of the volume which will be used to store the monitoring data. The volume is created using the vsphere docker volume plugin. |
| prom_persistent_vol_size | The size of the volume which will hold the monitoring data. The exact syntax is dictated by the vSphere Docker Volume plugin. The default value is 10GB. |

### Logspout configuration

All Logspout-related variables are described in Table 10.

**Table 10.** Logspout variables

| Variable                | Description                              |
| ----------------------- | ---------------------------------------- |
| logspout_version       | ```‘master’``` |


### Environment configuration

All Environment-related variables should be here. All of them are described in the Table 7 below.

| Variable | Description                              |
| -------- | ---------------------------------------- |
| env      | Dictionary containing all environment variables. It contains three entries described below. Please leave empty the proxy related settings if not required: <ul><li>http\_proxy: HTTP proxy URL, i.e. 'http://15.184.4.2:8080'. This variable defines the HTTP proxy url if your environment is behind a proxy.</li><li>https\_proxy: HTTP proxy URL, i.e. 'http://15.184.4.2:8080'. This variable defines the HTTPS proxy url if your environment is behind a proxy.</li><li>no\_proxy: List of hostnames or IPs that don't require proxy, i.e. 'localhost,127.0.0.1,.cloudra.local,10.10.174.'</li></ul> |

## Editing the vault

Once your group variables file is ready, the next step is to create a vault file to match your environment. The vault file is essentially the same thing than the group variables but it will contain all sensitive variables and will be encrypted.

To create a vault we'll create a new file group\_vars/vault and we'll add the following entries:

```
---
vcenter_password: 'xxx'
docker_ee_url: 'yoururl'
vm_password: 'xxx'
simplivity_password: 'xxx'
ucp_password: 'xxx'
rhn_orgid: 'Red Hat Organization ID'
rhn_key: 'Red Hat Activation Key'
```


```rhn_orgid``` and ```rhn_key``` are the credentials needed to subscribe the virtual machines with Red Hat Customer Portal. For more info regarding activation keys see the following URL: https://access.redhat.com/articles/1378093

To encrypt the vault you need to run the following command:

```# ansible-vault encrypt group_vars/vault```

You will be prompted for a password that will decrypt the vault when required. You can update the values in your vault by running:
```
# ansible-vault edit group_vars/vault
```

For Ansible to be able to read the vault, you need to specify a file where the password is stored, for instance in a file called ```.vault_pass```. Once the file is created, take the following precautions to avoid illegitimate access to this file:

1. Change the permissions so only ```root``` can read it using  ```# chmod 600 .vault_pass```
	
2. Add the file to your ```.gitignore``` file if you're pushing the set of playbooks to a git repository.




# Running the playbooks

At this point, the system is ready to be deployed. Go to the root folder and run the following command:

```# ansible-playbook -i vm_hosts site.yml --vault-password-file .vault_pass```

The playbooks should run for 25-35 minutes depending on your server specifications and the size of your environment.


## Post Deployment

The playbooks are meant to deploy a new environment. You should only use them for deployment purposes. 
















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

After running the playbook, you can browse (HTTP) to the UCP load balancer IP address or FQDN on port 3000 (using a URL like ```http://<ucp_lb>:3000```) and you will see the Grafana UI. The username and password are defaulted to ```admin```/```admin```. When you log in, you can pick up the Dashboard that was imported by the playbooks (Click the Dashboard icon and select Docker Swarm Monitor) and observe the ongoing monitoring, as shown in Figure 19.

![Grafana UI][grafana]
**Figure 19.** Grafana UI


The deployed Grafana dashboard includes cluster-wide metrics, node-specific metrics, and container-specific metrics.  Monitored resources include disk I/O, memory, CPU utilization, network traffic, etc.  The dashboard also highlights any containers configured with memory limits and the current memory utilization rate based on those limits.  All of these metrics are provided via the node-exporter (responsible for OS and host metrics) and cAdvisor (responsible for container-specific metrics) instances running in the swarm.  For more information about these tools and the metrics they expose, see the documentation links in their respective GitHub repositories: https://github.com/prometheus/node_exporter and https://github.com/google/cadvisor. 

The provided dashboard is editable and extensible for those users who wish to add/remove panels or modify the underlying JSON code to change the look and behavior.  Grafana offers many other sample dashboards on their website (https://grafana.com/dashboards) that may be used in place of the provided dashboard.


## Configure dummy VMs to backup Docker volumes
The playbook [config_dummy_vms_for_docker_volumes_backup.yml][config_dummy_vms_for_docker_volumes_backup] ensures that you can backup Docker volumes that have been created using the vSphere plugin in SimpliVity. There is not a straight forward way to do this, so we need to use a workaround. Since all Docker volumes are going to be stored in the dockvols folder in the datastore(s), we need to create a ‘dummy’ VM per datastore. The ```vmx```, ```vmsd``` and ```vmkd``` files from this VMs will have to be inside the ```dockvols``` folder, so when these VMs are backed up, the volumes are backed up as well. Obviously these VMs don’t need to take any resources and we can keep them powered off.


## Configure SimpliVity backups
The playbook [config_simplivity_backups.yml][config_simplivity_backups] configures the defined backup policies in the group variables file in SimpliVity and will include all Docker nodes plus the ‘dummy’ VMs created before, so the existing Docker volumes are also taken in account. The playbook will mainly use the SimpliVity REST API to perform these tasks. A reference to the REST API can be found here: https://api.simplivity.com/rest-api_getting-started_overview/rest-api_getting-started_overview_rest-api-overview.html


## VM placement and number of HPE SimpliVity servers in the cluster

The placement of the various VMs deployed by the playbooks depends on whether DRS is enabled or not:

1. If DRS is not enabled, the placement of the VMs is specified in the the ansible inventory file vm_hosts
2. If DRS is enabled, the placement of the VMs is outside the control of the playbooks

The playbooks have only been tested with three nodes in the ESX cluster, but the following sections provide guidance on how to use more than three nodes.



### Using more than three nodes when DRS is not enabled
The default vm_hosts file in the solution github repository corresponds to a deployment on a 3-node HPE SimpliVity cluster.  For each Ansible host in the inventory, you use the `esxi_hosts` variable to specify on which ESX hosts the VM should be placed. The following code extract shows 3 UCP VMs distributed across the three members of the cluster. This is the recommended placement as you don’t want to one node to host two UCP VMs as a failure of that node would result in the cluster losing quorum. 
```
[ucp]
clh-ucp01 ip_addr='10.10.174.112/22' esxi_host='simply01.am2.cloudra.local'
clh-ucp02 ip_addr='10.10.174.113/22' esxi_host='simply02.am2.cloudra.local'
clh-ucp03 ip_addr='10.10.174.114/22' esxi_host='simply03.am2.cloudra.local'
```

In the above example, the first UCP VM will be placed on the ESX host named `simply01.am2.cloudra.local`.  Note that the value for `esxi_host` is the name of the ESX host in the vCenter inventory.

The default `vm_hosts` inventory configures three docker worker nodes and distributes them across the three ESX hosts:
```
[worker]
clh-worker01 ip_addr='10.10.174.122/22' esxi_host='simply01.am2.cloudra.local'
clh-worker02 ip_addr='10.10.174.123/22' esxi_host='simply02.am2.cloudra.local'
clh-worker03 ip_addr='10.10.174.124/22' esxi_host='simply03.am2.cloudra.local'
```

If you have more than three ESX hosts in your cluster,  you can add an additional worker node as follows:
```
[worker]
clh-worker01 ip_addr='10.10.174.122/22' esxi_host='simply01.am2.cloudra.local'
clh-worker02 ip_addr='10.10.174.123/22' esxi_host='simply02.am2.cloudra.local'
clh-worker03 ip_addr='10.10.174.124/22' esxi_host='simply03.am2.cloudra.local'
clh-worker04 ip_addr='10.10.174.1xx/22' esxi_host='simply04.am2.cloudra.local'
```

You can also distribute the infrastructure VMs across fours nodes rather than across the default the nodes. For example, the default placement for the NFS server VM is as follows:
```
[nfs]
clh-nfs ip_addr='10.10.174.121/22'    esxi_host='simply03.am2.cloudra.local'
```

Instead, you can change the placement NFS server VM, leveraging a fourth ESX node:
```
[nfs]
clh-nfs ip_addr='10.10.174.1xx/22'    esxi_host='simply04.am2.cloudra.local'
```



When you specify the placement of the VM, you should ensure that you follow these placement guidelines:

- Do not place two UCP VMs on the same node. If the node fails, the UCP cluster will lose quorum and the service will go down.
- Do not place two DTR replicas (VMs) on the same node. Once again, the cluster will lose quorum if that node fails.

**Note:** The OmniStack software maintains two replicas on two different hosts for each VM. As a result, when a VM is scheduled on an ESX server that does not have local access to one of the replicas, the VM will report the warning “SimpliVity VM Data Access Not Optimized”. You can safely ignore this warning.

### Using more than three nodes when DRS is enabled

When DRS is enabled, it controls the placement of the VMs and as a result, the placement you have specified in the vm_hosts inventory is ignored. Instead, you use DRS rules to make sure that the UCP and DTR VMs are distributed across three nodes for the reasons explained earlier. 


**Note:** If you do not specify DRS rules to determine the placement, DRS will automatically move the VMs that report the “SimpliVity VM Data Access Not Optimized” warning to a node with a replica of the VM which may break the earlier placement guideline.




# Accessing the UCP UI
Once the playbooks have run and completed successfully, the Docker UCP UI should be available by browsing to the UCP load balancer or any of the nodes via HTTPS. The authentication screen will appear as shown in Figure 20:

![UCP authentication screen][ucpauth]
**Figure 20.** UCP authentication screen

Enter your credentials and the dashboard will be displayed as shown in Figure 21:

![UCP dashboard][ucpdash]
**Figure 21.** UCP dashboard

You should see all the nodes information in your Docker environment by clicking on `Nodes`, as shown in Figure 22:

![Nodes information][nodesinfo]
**Figure 22.** Nodes information


Click on `Services` to see the monitoring services that were installed during the playbooks execution, as shown in Figure 23:

![Services information][servicesinfo]
**Figure 23.** Services information

# Accessing the DTR UI
The Docker DTR UI should be available by browsing to the DTR load balancer or any of the nodes via HTTPS. The authentication screen will appear as shown in Figure 24:

![DTR authentication screen][dtrauth]
**Figure 24.** DTR authentication screen


Enter your UCP credentials and you should see the empty list of repositories as shown in Figure 25:

![DTR repositories][dtrrepos]
**Figure 25.** DTR repositories

If you navigate to `Settings > Security`, you should see the Image Scanning feature already enabled as shown in Figure 26. (Note that you need an Advanced license to have access to this feature).

![Image scanning in DTR][imagescanning]
**Figure 26.** Image scanning in DTR


# Security considerations
In addition to having all logs centralized in a single place and the image scanning feature enabled for the DTR nodes, there are other guidelines that should be followed in order to keep your Docker environment as secure as possible. The HPE Reference Configuration paper for securing Docker on HPE Hardware places a special emphasis on securing Docker in DevOps environments and covers best practices in terms of Docker security. The document can be found here: http://h20195.www2.hpe.com/V2/GetDocument.aspx?docname=a00020437enw. Some newer Docker security features that were not covered in the reference configuration are outlined below.



## Prevent tags from being overwritten
By default, users with access to push to a repository, can push the images to a repository with the same tag multiple times. As an example, a user pushes an image to `library/wordpress:latest`, and later another user can push a different image with the same name and tag but different functionality. This might make it difficult to trace back the image to the build that generated it.

To prevent this from happening you can configure a repository to be immutable. Once you push a tag, DTR won’t allow anyone else to push another tag with the same name.

More information about immutable tags can be found here: 
https://docs.docker.com/datacenter/dtr/2.3/guides/user/manage-images/prevent-tags-from-being-overwritten/ 



## Isolate swarm nodes to a specific team
With Docker EE Advanced, you can enable physical isolation of resources by organizing nodes into collections and granting Scheduler access for different users. To control access to nodes, move them to dedicated collections where you can grant access to specific users, teams, and organizations.

More information about this subject can be found here: https://beta.docs.docker.com/datacenter/ucp/2.2/guides/admin/manage-users/isolate-nodes-between-teams/.


# Central Logging

Central logging is implemented following the best practice documented by Docker which is available at https://success.docker.com/Architecture/Docker_Reference_Architecture%3A_Docker_Logging_Design_and_Best_Practices.

Two types of logs are collected and sent to the central logging VM: 
- OS system logs, these logs include the logs generated by the docker engine itself
- `stderr` / `stdout` from containers (including DTR and UCP containers)

The first category of logs is collected by **rsyslog** and sent to the central logging VM. **rsyslog** on the individual VMs is configured using a template named `rsyslog.conf` located in <`directory`>/`file`/ where <`directory`> is the directory into which you cloned the playbook repository.

The second category of logs is collected by the Docker Engine default logging driver (`json_file`) and all the corresponding logs are sent to the central logging VM by Logspout  running on all Docker nodes (VMs). Logspout is configured as a global service and hence the Docker swarm will make sure one instance of the container is always running on each and every Docker node in the swarm. More information on Logspout can be found at https://github.com/gliderlabs/logspout.

**Note:** At the time of writing, some functionality required to run Logspout as a global service is only available in the `master` branch of Logspout so you need to specify the tag `'master'` rather than `'latest'` (v3.2.3) when pulling the Logspout image.

Operators can SSH to the central logging VM to locate the logs in the `/var/log/messages` directory. Developers can see container logs using the command `docker logs`.



# HA considerations

## Service Level Protection 

The matrix in Table 12 outlines the HA and service level protection for all the critical containers and services within this solution.   

**Table 12.** Service level protection matrix

| |	Host HW or network failure protection|  Application or service failure protection | 
|---------|-----------|---------|
|Docker Worker Node | Requests will be serviced by 2 of 3 remaining Docker worker on other 2 nodes.  Restart of failed Docker worker on other physical node not required.| Requests will be serviced by 2 of 3 remaining Docker worker on other 2 nodes.  Restart of failed Docker worker on other physical node not required. |
|Docker UCP service | Requests will be serviced by 2 of 3 remaining UCP services on other 2 nodes.  Restart of failed UCP on other physical node not required. | Requests will be serviced by 2 of 3 remaining UCP services on other 2 nodes.  Restart of failed UCP on other physical node not required.|
|Docker DTR service |	Requests will be serviced by 2 of 3 remaining DTR services on other 2 nodes.  Restart of failed DTR on other physical node not required.	| Requests will be serviced by 2 of 3 remaining DTR services on other 2 nodes.  Restart of failed DTR on other physical node not required.|
|Application container	| UCP restarts this app container on one of two remaining worker nodes|
|Prometheus load exporter service||
|Prometheus cAdvisor service||
|Prometheus container||
|Grafana container ||
|Logging service VM||
|NFS server VM|VMware restarts NFS VM on one of two remaining nodes||
|UCP Load Balancer VM (HA Proxy)	|VMware restarts UCP Load Balancer on one of two remaining nodes|
|DTR Load Balancer VM (HA Proxy)||
|Worker Load Balancer VM (HA Proxy)||


## Host failure

For details of the impact of a host failure, see Table 13.

**Table 13.** Host failure

|Component	|Technology	|Duration	|Consequence	|Impact   |
|:-----------|:-----------|:-----------|:---------------|:---------|
|UCP Load Balancer	|Protected by VMware Cluster HA	|Minutes	|VM is failed-over	|No access to service during failover|
|Workers Load Balancer	|Protected by VMware Cluster HA	|Minutes	|VM is failed-over	|No access to service during failover
|DTR Load Balancer	|Protected by VMware Cluster HA	|Minutes	|VM is failed-over	|No access to service during failover
|Central Logging	|Protected by VMware Cluster HA	|Minutes	|VM is failed-over	|The logs will be available in central logging but may not reach Logspout|
|NFS	|Protected by VMware Cluster HA	|Minutes	|VM is failed-over	|No push/pull of images.|
|UCP service	|Protected by UCP scale out design	|Seconds	|Potentially new leader elected	|
|DTR service	|Protected by DTR scale out design	|Seconds	|DTR continues to be operational	|
|Monitoring	|Protected by Docker service (replicas)	|Seconds	|Grafana/Prometheus relocated	|Transparent due to routing mesh|
|Resource plane	|Protected by Docker scale out design|		|Less capacity	
|Docker volumes	|SimpliVity		|    |At least 1 replica will remain	|Possible performance degradation if container is scheduled on node with no local replica|
|User applications	|Depends on application (service or standalone container)	|||



## VM Failure

For details on the impact of a VM failure, see Table 14.

**Table 14.** VM failure

|Component	|Technology	|Duration	|Consequence	|Impact   |
|:-----------|:-----------|:-----------|:---------------|:---------|
|UCP Load Balancer	|Manual recovery	|Minutes	|Service unavailable	|Recovery procedure required (restore from backup)|
|Workers Load Balancer	|Manual recovery	|Minutes	|Service unavailable	|Recovery procedure required (restore from backup)|
|DTR Load Balancer	|Manual recovery	|Minutes	|Service unavailable	|Recovery procedure required (restore from backup)|
|Central Logging	|Manual recovery	|Minutes	|Service unavailable	|Recovery procedure required (restore from backup)|
|NFS	|Manual recovery	|Minutes	|DTR push/pull unavailable	|Recovery procedure required (restore from backup)|
|UCP service	|Protected by UCP scale out design	|Seconds	|	|Recovery procedure required|
|DTR service	|Protected by DTR scale out design	|Seconds	|	|Recovery procedure required|
|Monitoring	|Protected by Docker service (replicas)	|	|New replica	
|Resource plane	|Manual recovery	|Minutes	|Reduced capacity|	
|Docker volumes	|Applicable (someone deletes file in the datastore)	|||		
|User applications	|Depends on application (service or standalone container)|||			

# Container backup and restore

In order to restore a Docker volume, you need to restore a special VM  that has been deployed for the sole purpose of backing up Docker volumes. There is one such VM for each datastore defined in the `datastores` array in the `group_vars/vars` file. By default, a single datastore is specified in the playbooks:

<pre>
datastores: ['<b>Docker_CLH</b>']
</pre>

***Note:*** The use of a single datastore is recommended. If you have configured multiple datastores, you need to understand and keep track of how your Docker volumes are distributed across the datastores.

The name of the special VM follows the pattern `<prefix>-in-dockervols-<Datastore>` where
- `<prefix>` is the value of the variable `dummy_vm_prefix` from the file `group_vars/vars`
- `<Datastore>` is the name of the datastore

For example, based on the default values in the scripts, the VM name would be `clh-VM-in-dockervols-Docker_CLH`.


## Create a Docker volume

After the initial deployment,  a single Docker volume will have been created for Prometheus using the vSphere driver. 

```
[root@clh-ucp01 ~]# docker volume ls | grep vsphere
vsphere:latest      prom_clh-db-data@Docker_CLH
[root@clh-ucp01 ~]#
```

To create a Docker volume named `test_01`, you can use the `docker volume create` command specifying the vSphere driver: 

```
[root@clh-ucp01 ~]# docker volume create -d vsphere test_01
test_01
```

You can check that the volume exists using the 'docker volume ls' command:

```
[root@clh-ucp01 ~]# docker volume ls | grep vsphere
vsphere:latest      prom_clh-db-data@Docker_CLH
vsphere:latest      test_01@Docker_CLH
```

You can attach a container to the volume and then add data to it by creating a text file with some arbitrary content:

<pre>
[root@clh-ucp01 ~]# docker run -it --rm -v test_01:/tmp alpine sh -c "echo <b>some test data here</b> > /tmp/foo.txt"
[root@clh-ucp01 ~]#
</pre>

If this is the first time you have used the alpine image, you may see additional output relating to download of image layers:

```
Unable to find image 'alpine:latest' locally
latest: Pulling from library/alpine
88286f41530e: Already exists
Digest: sha256:f006ecbb824d87947d0b51ab8488634bf69fe4094959d935c0c103f4820a417d
Status: Downloaded newer image for alpine:latest
```

The container will exit once the shell command has run and any unnamed volumes will be removed. However, the named volume `test_01:/tmp` will persist. To check that the data is still available after the container exited, spin up a new container and try to retrieve the data:

<pre>
[root@clh-ucp01 ~]# docker run -it --rm -v test_01:/tmp alpine sh -c "cat /tmp/foo.txt"	
<b>some test data here</b>
[root@clh-ucp01 ~]#
</pre>


## Automated backup

By default, the special VM and any Docker volume in the `dockvols` folder are backed up every hour. This is controlled by the following settings in the `group_vars/vars` file.

```
backup_policies:

 - name: 'clh-gold'
   days: 'All'
   start_time: '00:00'
   frequency: '60'
   retention: '43200'
dummy_vm_prefix: 'clh-VM'
docker_volumes_policy: 'clh-gold'
```

The backup policy `clh-gold` is assigned to the special VM that is used to backup the Docker volumes. This policy specifies that a backup is taken every hour (`frequency: '60'` means sixty minutes)  while the backup is retained for one month (`retention: '43200'` means 43200 minutes or thirty days).

## Manual backup

Rather than waiting for an automated backup to take place, you can create a backup immediately. Right-click on the special VM, in this case  `clh-VM-in-dockervols-Docker_CLH`, select `All HPE SimpliVity Actions` and choose `Backup Virtual Machine` as shown in Figure 27.


![Backup virtual machine][backupvirtualmachine]
**Figure 27.** Backup virtual machine

You can specify a backup name, in this case 'manual_backup_test_01', as shown in Figure 28.

![Backup virtual machine details][backupvmdetails]

**Figure 28.** Backup virtual machine details


## Restore

Right-click on the special VM, in this case `clh-VM-in-dockervols-Docker_CLH` and on the `Configure` tab, select `HPE SimpliVity Search Backups` as shown in Figure 29.

![Search backups][searchbackups]
**Figure 29.** Search backups

You can narrow the search based on the time of the backup. If you are restoring from an automatic backup, the name will be the timestamp of the backup. If you are restoring from a manual backup, the name will be the one you specified earlier when creating the backup, in this case `manual_backup_test_01`.

Right-click on the backup you wish to restore, as shown in Figure 30, and select 'Restore Virtual Machine'.

![Restore virtual machine][restorevm]
**Figure 30.** Restore virtual machine


In the details screen, shown in Figure 31, you can choose a name for the new virtual machine and specify the datastore.

![Restore virtual machine details][restorevmdetails]

**Figure 31.** Restore virtual machine details

The name of the new virtual machine will default to a combination of the special VM name and a timestamp, in this instance `clh-VM-in-dockervols-Docker_CLH-2017-10-26-09h47m00s`. The datastore should be the one specified in the `datastores` array from the `group_vars/vars` file. Click `OK` to restore the virtual machine.


Once the virtual machine has been restored, navigate to the datastore and locate the new VM in the file browser, as shown in Figure 32.


![Browse to restored virtual machine][browserestoredvm]
**Figure 32.** Browse to restored virtual machine


Navigate to the folder named `1111111-1111-1111-1111-...` as shown in Figure 33. You will see files with names based on the Docker volume name that you used at the start, in this instance `test_01.vmdk` and `test_01-478...f1f.vmdf` 

![Locate vmdk and vmdf files][vmdkfiles]
**Figure 33.** Locate vmdk and vmdf files


You need to move these two files to the `dockvols` sub-directory named `1111111-1111-1111-1111-...` in the same datastore. Right click on the `.vmdk` file and choose `Move to...` as shown in Figure 34.

![Move files][moveto]
**Figure 34.** Move files


Set the destination folder to the `dockvols` sub-directory named `1111111-1111-1111-1111-...` as shown in Figure 35.

![Move to destination][destination]

**Figure 35.** Move to destination

It is only necessary to move the `.vmdk` file as the `.vmdf` file will automatically follow. The `dockvols` sub-directory named `1111111-1111-1111-1111-...` should now contain both files as shown in Figure 36.

![Files moved to destination][moved]
**Figure 36.** Files moved to destination



## Test the restore

You can check that the volume `test_01` has been restored by using the `docker volume ls` command again.

```
[root@clh-ucp01 ~]# docker volume ls | grep vsphere
vsphere:latest      prom_clh-db-data@Docker_CLH
vsphere:latest      test_01@Docker_CLH
```

You can verify that the volume contains the correct data by spinning up a container and running a shell command:

<pre>
[root@clh-ucp01 ~]# docker run -it --rm -v test_01:/tmp alpine sh -c "cat /tmp/foo.txt"
<b>some test data here</b>
</pre>

The data you entered in the text file before performing the backup and deleting the volume is available once again after restoring the volume.


# Solution Lifecycle Management

## Introduction

Lifecycle management with respect to this solution refers to the maintenance and management of software and hardware of various components within that build up the solution stack. Lifecycle management is required to keep the solution up-to date and ensure that latest versions of the software are running in to provide optimal performance, security and fix any existing defects within the product.

In this section, we will cover life cycle management of the different components that are used in this solution. The architectural diagram of the solution in Figure 27 shows the software and hardware stacks that make up the solution. Each stack is shown in a different color.


![Solution stack][solutionstack]

**Figure 37.** Solution stack


Based on the diagram above, lifecycle of the following stacks need to be maintained and managed.

1. Monitoring (Prometheus and Grafana) Tools
2. Docker Enterprise Edition Environment
3. Virtual Machine Operating systems
4. vSphere Docker Volume Service
5. SimpliVity environment

The general practice and recommendation is to follow a bottom-up approach for updating all components of the environment and making sure the dependencies are met. In our solution, we would start with the SimpliVity stack and end with the Prometheus and Grafana monitoring environment. If all components are not being updated at the same time, the same approach can be followed – updating only the components that require updates while adhering to the interdependencies of each component that is being updated.



## SimpliVity environment

The SimpliVity environment is made up of proprietary SimpliVity software, VMware software and HPE firmware. There are interdependencies between the various components that need to be accounted and are provided in the table below. The components in Table 15 are part of the SimpliVity environment that require lifecycle management.

In general, ensure that the software bits for the Arbiter and vSphere extension corresponding to an OmniStack release are used.

**Table 15.** SimpliVity components

<table>
  <tr>
    <th>Order</th>
    <th>Component</th>
    <th>Dependency (compatibility)</th>
    <th>Download/Documentation</th>	
  </tr>
  <tr>
    <td>1</td>
	<td>HPE SimpliVity Arbiter</td>
	<td>1. HPE OmniStack</td>
    <td rowspan=3>SimpliVity OmniStack for vSphere Upgrade Guide<br><br>Download software bits from HPE’s support website.<br><br>http://www.hpe.com/support</td>
  </tr>
  <tr>
    <td>2</td>
	<td>HPE SimpliVity VMware Plug-in</td>
	<td>1. HPE SimpliVity Arbiter <br>2. HPE OmniStack</td>
  </tr>
  <tr>
    <td>3</td>
	<td>HPE Omnistack</td>
	<td>1. HPE SimpliVity VMware Plug-in <br>2. HPE SimpliVity Arbiter</td>
  </tr>  
</table>



## VMware Components 

The SimpliVity solution used in this deployment guide is built on VMware vSphere. VMware ESXi and vCenter (see Table 16) are the two components from VMware that are leveraged by the SimpliVity software.

The VMware ESXi and vCenter versions must be compatible with each other and with the HPE OmniStack version that is running on the SimpliVity systems.

**Table 16.** VMware components

<table>
  <tr>
    <th>Order</th>
    <th>Component</th>
    <th>Dependency (compatibility)</th>
    <th>Download/Documentation</th>	
  </tr>
  <tr>
    <td>1</td>
	<td>VMware vCenter</td>
	<td>1. HPE OmniStack <br>2. VMware ESXi</td>
    <td rowspan=2><a href="https://support.simplivity.com/Site_Specific_Content/Product_Manuals/Upgrade_Guides/ESXi_Guided_Upgrade">VMware Upgrade for SimpliVity</a></td>
  </tr>
  <tr>
    <td>2</td>
	<td>VMware ESXi</td>
	<td>1. HPE OmniStack<br>2. VMware vCenter</td>
  </tr>

</table>



## HPE Server Software

SimpliVity servers are based on HPE server platforms and require compatible firmware version to function with HPE OmniStack Software, as shown in Table 17.

**Table 17.** HPE server components

<table>
  <tr>
    <th>Order</th>
    <th>Component</th>
    <th>Dependency (compatibility)</th>
    <th>Download/Documentation</th>	
  </tr>
  <tr>
    <td>1</td>
	<td>HPE Firmware</td>
	<td>1. HPE OmniStack Software</td>
	<td><a href="https://support.simplivity.com/Site_Specific_Content/Product_Manuals/Upgrade_Guides/SimpliVity_Platform_Firmware_Guided_Upgrade">
	Firmware Upgrade for SimpliVity</a></td>
	
  </tr>
</table>


## vSphere Docker Volume Service Plug-in

vSphere Docker Volume service plug-in is part of an open source project by VMware that enables running stateful containers by providing persistent docker volumes leveraging existing storage technology from VMware. There are two parts to the plug-in, namely, client software and server software (see Table 18). Every version of the plug-in that is released includes both pieces of software and it is imperative that the version number installed on the client side and server side are the same.

When updating the Docker Volume service plug-in, ensure the ESXi version you are running is supported and that the client software is compatible with the operating system.

**Table 18.**	 vSphere Docker Volume service components

<table>
  <tr>
    <th>Order</th>
    <th>Component</th>
    <th>Dependency (compatibility)</th>
    <th>Download/Documentation</th>	
  </tr>
  <tr>
    <td>1</td>
	<td>Server Software</td>
	<td>1. VMware ESXi<br>2. Docker EE</td>
    <td rowspan=2><a href="http://vmware.github.io/docker-volume-vsphere/documentation/index.html">vSphere Docker Volume Service on GitHub</a></td>
  </tr>
  <tr>
    <td>2</td>
	<td>Client Software</td>
	<td>1. VM Operating System<br>2. Docker EE</td>
  </tr>

</table>



## Red Hat Enterprise Linux operating system

This solution is built using Red Hat Enterprise Linux (see Table 19) as the base operating system.  When upgrading the operating system on the VMs, first verify that the OS version is compatible to run Docker EE by looking at the Docker OS compatibility metric.

**Table 19.** Operating system

<table>
  <tr>
    <th>Order</th>
    <th>Component</th>
    <th>Dependency (compatibility)</th>
    <th>Download/Documentation</th>	
  </tr>
  <tr>
    <td>1</td>
	<td>Red Hat Enterprise Linux</td>
	<td>1. Docker EE <br>2. vDVS client software plugin</td>
	<td><a href="https://access.redhat.com/articles/11258">RHEL</a></td>	
  </tr>
</table>


## Docker EE Environment

Each release of Docker Enterprise Edition contains three technology components – UCP, DTR and the Docker Daemon or Engine. It is imperative that the components belonging to the same version are deployed or upgraded together – see Table 20. 

A banner will be displayed on the UI when an update is available for UCP or DTR. The admin can start the upgrade process by clicking the link shown in Figure 38.

![Docker update notification][dockerupdate]
**Figure 38.** Docker update notification


**Table 20.** Docker EE components


<table>
  <tr>
    <th>Order</th>
    <th>Component</th>
    <th>Dependency (compatibility)</th>
    <th>Download/Documentation</th>	
  </tr>
  <tr>
    <td>1</td>
	<td>Docker Daemon/Engine</td>
	<td rowspan="3">1. VM Operating System <br><br> 2. vDVS plugin <br><br>3. Prometheus and Grafana</td>
	<td rowspan="3"><a href="https://success.docker.com/Policies/Maintenance_Lifecycle">Docker Lifecycle Maintenance</a><br><br>
	<a href="https://success.docker.com/Policies/Compatibility_Matrix">Docker Compatibility Matrix</a>
	</td>	
  </tr>
  <tr>
    <td>2</td>
	<td>Universal Control Plane</td>  
  </tr>
  <tr>
    <td>3</td>
	<td>Docker Trusted Registry</td>  
  </tr>  
</table>


## Monitoring Tools

Prometheus and Grafana monitoring tools (see Table 21) run as containers within the Docker environment. Newer versions of these tools can be deployed by pulling the Docker images from Docker Hub. Verify that the version of Prometheus that is being used is compatible with the version of Docker EE.

**Table 21.** Monitoring tools

<table>
  <tr>
    <th>Order</th>
    <th>Component</th>
    <th>Dependency (compatibility)</th>
    <th>Download/Documentation</th>	
  </tr>
  <tr>
    <td>1</td>
	<td>Prometheus	</td>
	<td>1. Grafana<br> 2. Docker EE</td>
	<td rowspan="3">1. Prometheus Images on Docker Hub<br><br>2. <a href="http://docs.grafana.org/installation/upgrading/">Upgrading Grafana</a>
	</td>	
  </tr>
  <tr>
    <td>2</td>
	<td>Grafana</td>  
    <td>1. Prometheus<br> 2. Docker EE</td>
  </tr>
</table>

## High-Level dependency map

Based on the lifecycle management details provided above, Figure 39 is a consolidated diagram that shows the dependencies between the various components in the solution stack. Bi-directional arrows between components indicate that the two components have an interoperability dependence. Before upgrading a component to a newer version, you must ensure that the new version of that component is compatible the current version of any dependent components.

![High-level dependency map][dependencymap]

**Figure 39.** High-level dependency map


[simplivity-ops-simple-architecture]: </ops/images/simplivity-ops-simple-architecture.png> "Figure 1. Solution Architecture"
[provisioning]: </ops/images/provisioning.png> "Provisioning Steps"
[createnewvm]: </ops/images/createnewvirtualmachine.png> "Figure 2. Create New Virtual Machine"
[vmnamelocation]: </ops/images/vmnamelocation.png> "Figure 3. Specify name and location for the virtual machine" 
[choosehost]: </ops/images/choosehost.png> "Figure 4. Choose host / cluster"
[selectstorage]: </ops/images/selectstorage.png> "Figure 5. Select storage for template files"
[chooseos]: </ops/images/chooseos.png> "Figure 6. Choose operating system"
[createnetwork]: </ops/images/createnetwork.png> "Figure 7. Create network connections"
[createprimarydisk]: </ops/images/createprimarydisk.png> "Figure 8. Create primary disk"
[confirmsettings]: </ops/images/confirmsettings.png> "Figure 9. Confirm settings"
[vmprops]: </ops/images/vmprops.png> "Figure 10. Virtual machine properties"
[removefloppy]: </ops/images/removefloppy.png> "Figure 11. Remove Floppy drive"
[welcomescreen]: </ops/images/welcomescreen.png> "Figure 12. Welcome screen"
[installsummary]: </ops/images/installsummary.png> "Figure 13. Installation summary"
[installdestination]: </ops/images/installdestination.png> "Figure 14. Installation destination"
[installdrive]: </ops/images/installdrive.png> "Figure 15. Select installation drive"
[configuser]: </ops/images/configuser.png> "Figure 16. Configure user settings"
[setrootpwd]: </ops/images/setrootpwd.png> "Figure 17. Set root password"



[converttotemplate]: </ops/images/converttotemplate.png> "Figure 18. Convert to template"
[grafana]: </ops/images/grafana.png> "Figure 19. Grafana UI"
[ucpauth]: </ops/images/ucpauth.png> "Figure 20. UCP authentication screen"
[ucpdash]: </ops/images/ucpdash.png> "Figure 21. UCP dashboard"
[nodesinfo]: </ops/images/nodesinfo.png> "Figure 22. Nodes information"
[servicesinfo]: </ops/images/servicesinfo.png> "Figure 23. Services information"
[dtrauth]: </ops/images/dtrauth.png> "Figure 24. DTR authentication screen"
[dtrrepos]: </ops/images/dtrrepos.png> "Figure 25. DTR repositories"
[imagescanning]: </ops/images/imagescanning.png> "Figure 26. Image scanning in DTR"

[backupvirtualmachine]: </ops/images/backupvirtualmachine.png> "Figure 27. Backup virtual machine"
[backupvmdetails]: </ops/images/backupvmdetails.png> "Figure 28. Backup virtual machine details"
[searchbackups]: </ops/images/searchbackups.png> "Figure 29. Search backups"
[restorevm]: </ops/images/restorevm.png> "Figure 30. Restore virtual machine"
[restorevmdetails]: </ops/images/restorevmdetails.png> "Figure 31. Restore virtual machine details"
[browserestoredvm]: </ops/images/browserestoredvm.png> "Figure 32. Browse to restored virtual machine"
[vmdkfiles]: </ops/images/vmdkfiles.png> "Figure 33. Locate vmdk and vmdf files"
[moveto]: </ops/images/moveto.png> "Figure 34. Move files"
[destination]: </ops/images/destination.png> "Figure 35. Move to destination"
[moved]: </ops/images/moved.png> "Figure 36. Files moved to destination"


[solutionstack]: </ops/images/solutionstack.png> "Figure 37. Solution stack"
[dockerupdate]: </ops/images/dockerupdate.png> "Figure 38. Docker update notification"
[dependencymap]: </ops/images/dependencymap.png> "Figure 39. High-level dependency map"


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
[config_dummy_vms_for_docker_volumes_backup]: </playbooks/config_dummy_vms_for_docker_volumes_backup.yml>
[config_simplivity_backups]: </playbooks/config_simplivity_backups.yml>


# VMware configuration

All VMware-related variables are mandatory and are described in the table below.

|Variable|File|Description|
|:-------|:---|:----------|
|vcenter_hostname|group_vars/vars|IP or hostname of the vCenter appliance|
|vcenter_username|group_vars/vars|Username to log in to the vCenter appliance. It might include a domain, for example, '`administrator@vsphere.local`'.|
|vcenter_password|**group_vars/vault**|The password for the `vcenter_username` user above.|
|vcenter_validate_certs|group_vars/vars|‘no’|
|datacenter|group_vars/vars|Name of the datacenter where the environment will be provisioned|
|vm_username|group_vars/vars|Username to log into the VMs. It needs to match the one from the VM Template, so unless you have created a user, you must use 'root'.|
|vm_password|**group_vars/vault**|The password for the `vm_username` user above.|
|vm_template|group_vars/vars|Name of the RHEL VM Template to be use. Note that this is the name from a vCenter perspective, not the hostname.|
|folder_name|group_vars/vars|vCenter folder to deploy the VMs. If you do not wish to deploy in a particular folder, the value should be `/`. Note: If you want to deploy in a specific folder, you need to create this folder in the inventory of the selected datacenter before starting the deployment.|
|datastores|group_vars/vars|List of datastores to be used, in list format, i.e. ['`Datastore1`','`Datastore2`'...]. This or these datastore(s) must exist before you run the playbooks. Note that all the datastores should be mounted on all the ESXi hosts. Please note that from a HPE SimpliVity perspective, it is a best practice to use only one Datastore. Using more than one will not provide any advantages in terms of reliability and will add additional complexity.|
|disk2|group_vars/vars|UNIX® name of the second disk for the Docker VMs. Typically `/dev/sdb`|
|disk2_part|group_vars/vars|UNIX name of the partition of the second disk for the Docker VMs. Typically `/dev/sdb1`|
|vsphere_plugin_version|group_vars/vars|Version of the vSphere plugin for Docker. The default is 0.21.2 which is the latest version at the time of writing this document. The version of the plugin should match the version of the vSphere Installation Bundle (VIB) that you installed on the ESXi servers.|
|vm_portgroup|group_vars/vars|Used by the playbook `create_vms.yml`, this variable specifies the portgroup connected to the network that connects all the VMs. There is currently only one network.|

 It is recommended that the template, which is used as the base for all deployed VMs, specifies a network adapter but it is not required. If a network adapter is specified, you should not attach this adapter to a standard switch if the portgroup designated by `vm_portgroup` is connected to a distributed vSwitch. In addition, you should make sure that the adapter specifies `Connect At Power On`.

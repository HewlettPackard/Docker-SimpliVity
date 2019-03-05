# HPE SimpliVity configuration

Variables related to your HPE SimpliVity deployment are mandatory and are described in the table below.

|Variable|File|Description|
|:-------|:---|:----------|
|simplivity_username|group_vars/vars|Username to log in to the HPE SimpliVity Omnistack appliances. It might include a domain, for example, `administrator@vsphere.local`. The corresponding password is stored in the variable named `simplivity_password`.|
|simplivity_password|**group_vars/vault**|The password for the `simplivity_username` user.|
|omnistack_ovc|group_vars/vars|List of Omnistack hosts to be used, in list format, i.e. `[‘omni1.local’,’onmi2.local’...]`. If your OmniStack virtual machines do not have their names registered in DNS, you can use their IP addresses.|

### VM placement and number of HPE SimpliVity servers in the cluster

The placement of the various VMs deployed by the playbooks depends on whether DRS is enabled or not:

1.  If DRS is not enabled, the placement of the VMs is specified in the ansible inventory file vm_hosts
2.  If DRS is enabled, the placement of the VMs is outside the control of the playbooks

The playbooks have only been tested with three nodes in the ESX cluster, but the following sections provide guidance on how to use more than three nodes.

### Using more than three nodes when DRS is not enabled

The default `vm_hosts` file in the solution GitHub repository corresponds to a deployment on a 3-node HPE SimpliVity cluster. For each Ansible host in the inventory, you use the `esxi_hosts` variable to specify on which ESX hosts the VM should be placed. The following code extract shows 3 UCP VMs distributed across the three members of the cluster. This is the recommended placement as you do not want one node to host two UCP VMs since a failure of that node would result in the cluster losing quorum.

```

[ucp]
hpe-ucp01 ip_addr='10.10.174.112/22' esxi_host='simply01.am2.cloudra.local'
hpe-ucp02 ip_addr='10.10.174.113/22' esxi_host='simply02.am2.cloudra.local'
hpe-ucp03 ip_addr='10.10.174.114/22' esxi_host='simply03.am2.cloudra.local'

```

In the above example, the first UCP VM will be placed on the ESX host named `simply01.am2.cloudra.local`. Note that the value for `esxi_host` is the name of the ESX host in the vCenter inventory.

The default `vm_hosts` inventory configures three Docker worker nodes and distributes them across the three ESX hosts:

```

[worker]
hpe-worker01 ip_addr='10.10.174.122/22' esxi_host='simply01.am2.cloudra.local'
hpe-worker02 ip_addr='10.10.174.123/22' esxi_host='simply02.am2.cloudra.local'
hpe-worker03 ip_addr='10.10.174.124/22' esxi_host='simply03.am2.cloudra.local'

```

If you have more than three ESX hosts in your cluster, you can add an additional worker node as follows:

```

[worker]
hpe-worker01 ip_addr='10.10.174.122/22' esxi_host='simply01.am2.cloudra.local'
hpe-worker02 ip_addr='10.10.174.123/22' esxi_host='simply02.am2.cloudra.local'
hpe-worker03 ip_addr='10.10.174.124/22' esxi_host='simply03.am2.cloudra.local'
hpe-worker04 ip_addr='10.10.174.150/22' esxi_host='simply04.am2.cloudra.local'

```

You can also distribute the infrastructure VMs across fours nodes rather than across the default nodes. For example, the default placement for the NFS server VM is as follows:

```

[nfs]
hpe-nfs ip_addr='10.10.174.121/22'    esxi_host='simply03.am2.cloudra.local'

```

Instead, you can change the placement NFS server VM, leveraging a fourth ESX node:

```

[nfs]
hpe-nfs ip_addr='10.10.174.121/22'    esxi_host='simply04.am2.cloudra.local'

```

When you specify the placement of the VM, you should ensure that you follow these placement guidelines:

-   Do not place two UCP VMs on the same node. If the node fails, the UCP cluster will lose quorum and the service will go down.
-   Do not place two DTR replicas (VMs) on the same node. Once again, the cluster will lose quorum if that node fails.

**Note:** The OmniStack software maintains two replicas on two different hosts for each VM. As a result, when a VM is scheduled on an ESX server that does not have local access to one of the replicas, the VM will report the warning “SimpliVity VM Data Access Not Optimized”. You can safely ignore this warning.

### Using more than three nodes when DRS is enabled

When DRS is enabled, it controls the placement of the VMs and as a result, the placement you have specified in the `vm_hosts` inventory is ignored. Instead, you use DRS rules to make sure that the UCP and DTR VMs are distributed across three nodes for the reasons explained earlier.

**Warning:** If you do not specify DRS rules to determine the placement, DRS will automatically move the VMs that report the “SimpliVity VM Data Access Not Optimized” warning to a node with a replica of the VM which may break the earlier placement guideline.
# Editing the inventory

The inventory is the file named `vm_hosts` in the `~/Docker-SimpliVity` directory. You need to edit this file to describe the configuration you want to deploy.

The nodes inside the inventory are organized in groups. The groups are defined by brackets and the group names are static so they must not be changed. Other fields (hostnames, specifications, IP addresses…) are edited to match your setup. The groups are as follows:

-   `[ucp_main]`: A group containing one single node which will be the main UCP node and swarm leader. Do not add more than one node under this group.
-   `[ucp]`: A group containing all the UCP nodes, including the main UCP node. Typically you should have either 3 or 5 nodes under this group.
-   `[dtr_main]`: A group containing one single node which will be the first DTR node to be installed. Do not add more than one node under this group.
-   `[dtr]`: A group containing all the DTR nodes, including the main DTR node. Typically you should have either 3 or 5 nodes under this group.
-   `[worker]`: A group containing all the Linux worker nodes.
-   `[win_worker]`: A group containing all the Windows worker nodes.
-   `[nfs]`: A group containing one single node which will be the NFS node. Do not add more than one node under this group.
-   `[logger]`: A group containing one single node which will be the logger node. Do not add more than one node under this group.
-   `[local]`: A group containing the local Ansible host. It contains an entry that should not be modified.

If you are deploying the new `active-active` load balancers, using floating IPs managed by `keepalived`:

-   `[loadbalancer]`: A group containing the UCP, DTR and any worker load balancers you are deploying.

If you are using the legacy, standalone load balancers:

-   `[ucp_lb]`: A group containing one single node which will be the load balancer for the UCP nodes. Do not add more than one node under this group.
-   `[dtr_lb]`: A group containing one single node which will be the load balancer for the DTR nodes. Do not add more than one node under this group.
-   `[worker_lb]`: A group containing one single node which will be the load balancer for the worker nodes. Do not add more than one node under this group.
-   `[lbs]`: A group containing all the legacy standalone load balancers. This group will have 3 nodes, also defined individually in the three groups above.

There are also a few special groups:

-   [docker:children]: A group of groups including all the nodes where Docker will be installed.
-   [vms:children]: A group of groups including all the Virtual Machines involved, with the exception of the local host.

Finally, you will find some variables defined for each group:

-   [vms:vars]: A set of variables defined for all VMs. Currently only the size of the boot disk is defined here.
-   [ucp:vars]: A set of variables defined for all nodes in the [`ucp`] group.
-   [dtr:vars]: A set of variables defined for all nodes in the [`dtr`] group.
-   [worker:vars]: A set of variables defined for all nodes in the [`worker`] group.
-   [win_worker:vars]: A set of variables defined for all nodes in the [`win_worker`] group.
-   [loadbalancer:vars]: A set of variables defined for all nodes in the [`loadbalancer`] group.
-   [lbs:vars]: A set of variables defined for all nodes in the [`lbs`] group.
-   [nfs:vars]: A set of variables defined for all nodes in the [`nfs`] group.
-   [logger:vars]: A set of variables defined for all nodes in the [`logger`] group.

If you wish to configure your nodes with different specifications to the ones defined by the group, it is possible to declare the same variables at the node level, overriding the group value. For instance, you could have one of your workers with higher specifications by setting:

```
[worker] 
worker01 ip_addr='10.0.0.10/16' esxi_host='esxi1.domain.local' 
worker02 ip_addr='10.0.0.11/16' esxi_host='esxi1.domain.local' 
worker03 ip_addr='10.0.0.12/16' esxi_host='esxi1.domain.local' cpus='16' ram'32768' 

[worker:vars] 
cpus='4' ram='16384' disk2_size='200'
```

In the example above, the `worker03` node would have 4 times more CPU and double the RAM compared to the rest of the worker nodes.

The different variables you can use are described in the table below. They are all mandatory unless otherwise specified.

|Variable|Scope|Description|
|:-------|:----|:----------|
|ip_addr|Node|IP address in CIDR format to be given to a node|
|esxi_host|Node|ESXi host where the node will be deployed. If the cluster is configured with DRS, this option will be overridden|
|cpus|Node/Group|Number of CPUs to assign to a VM or a group of VMs|
|ram|Node/Group|Amount of RAM in MB to assign to a VM or a group of VMs|
|disk2_usage|Node/Group|Size of the second disk in GB to attach to a VM or a group of VMs. This variable is only mandatory on Docker nodes (UCP, DTR, worker) and NFS node. It is not required for the logger node or the load balancers.|
|node_policy|Node/Group|HPE SimpliVity backup policy to assign to a VM or a group of VMs. The name has to match one of the backup policies defined in the `group_vars/vars` file described in the section `HPE SimpliVity backup configuration`.|

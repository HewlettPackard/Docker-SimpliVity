# Orchestrator configuration

The variable `orchestrator` in the `[worker]` group is used to specify if a worker node should be assigned to the Kubernetes orchestrator (`orchestrator: 'kubernetes'`) or to the Swarm orchestrator (`orchestrator: 'swarm'`). In general, you should only change the orchestrator for worker nodes.

**Note:** Docker supports a third type, `mixed`, that enables workloads to be scheduled by both Kubernetes and Swarm on the same node. Mixing orchestrator types on the same node is not recommended for production deployments because of the likelihood of resource contention and so, these playbooks do not support the `mixed` type.

The following example shows how to set Kubernetes as the default orchestrator for worker nodes, and how to over-ride the default to use Swarm on one specific node instead.

```

## WORKER
[worker]
hpe-worker01 ip_addr='10.60.59.21/16' esxi_host='esxi-hpe-1.cloudra.local'
hpe-worker02 ip_addr='10.60.59.22/16' esxi_host='esxi-hpe-2.cloudra.local'
hpe-worker03 ip_addr='10.60.59.23/16' esxi_host='esxi-hpe-3.cloudra.local' orchestrator=swarm
 
[worker:vars]
cpus='4'
ram='65536'
disk2_size='500'
orchestrator=kubernetes

```

**Note:** The playbooks do not change Docker's default orchestrator type which is `swarm`. Instead, the inventory is used to configure worker nodes for Kubernetes workloads or swarm workloads as explained above. If you want to change the default orchestrator type, use the method explained in the Docker documentation at [https://docs.docker.com/ee/ucp/admin/configure/set-orchestrator-type/\#set-the-default-orchestrator-type-for-new-nodes](https://docs.docker.com/ee/ucp/admin/configure/set-orchestrator-type/#set-the-default-orchestrator-type-for-new-nodes). It is possible to manually change the orchestrator type for a node. When you do this, existing workloads are evicted and they are not migrated automatically to the new orchestrator. If you want the workloads to be scheduled by the new orchestrator, you must migrate them manually. More information is available in the Docker documentation at [https://docs.docker.com/ee/ucp/admin/configure/set-orchestrator-type/\#what-happens-when-you-change-a-nodes-orchestrator](https://docs.docker.com/ee/ucp/admin/configure/set-orchestrator-type/#what-happens-when-you-change-a-nodes-orchestrator).

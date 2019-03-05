# Solution configuration

## Linux-only VM configuration

-   3 Docker Universal Control Plane (UCP) VM nodes for HA and cluster management
-   3 Docker Trusted Registry (DTR) VM nodes for HA of the container registry

The Docker UCP and DTR nodes are spread across 3 physical nodes, with one on each physical node. An odd number of manager nodes is recommended to avoid split-brain issues. It is possible to restrict the deployment to 1 UCP and 1 DTR, or to expand to more than 3, but the recommended minimum for an enterprise production deployment is 3 UCPs and 3 DTRs.

-   3 Docker Linux worker VM nodes for container workloads - Kubernetes or Docker swarm or a mix

The Docker worker nodes will be co-located with the UCP and DTR nodes in a 3 physical node deployment. Where more than 3 physical nodes are available, the worker nodes will typically be separated onto the extra nodes. It is possible to specify that more than one worker node is deployed per physical node but this decision will depend on the requirements of your applications.

-   1 Docker UCP load balancer VM to ensure access to UCP in the event of a node failure
-   1 Docker DTR load balancer VM to ensure access to DTR in the event of a node failure

By default, two load balancer VMs are deployed to increase availability of UCP and DTR and these are placed on separate physical nodes. Load balancing for applications running on worker nodes can achieved by using the playbooks to deploy additional load balancers, or by manually configuring the existing two to support your applications in addition to supporting UCP and DTR.

-   1 Logging server VM for central logging
-   1 NFS server VM for storage of Docker DTR images

With the addition of the NFS and logging VMs, a total of 13 VMs are created for the default Linux-only deployment. In addition to these VMs, the playbooks also set up the Docker persistent storage plug-in from VMware. The vSphere Docker volume plug-in facilitates the storage of data in a shared datastore that can be accessed from any machine in the cluster.


## Hybrid VM configuration (Windows and Linux)

-   3 Docker swarm Windows worker VM nodes for container workloads (optional). Kubernetes is not yet supported for Windows workers.

The hybrid deployment will typically add 3 Windows worker nodes to the above configuration, co-located with the Linux workers.

**Note:** Some of the application software supported by this configuration does not currently run on Windows, for example, the Sysdig Software Agent (see the section `Monitoring with Sysdig`).


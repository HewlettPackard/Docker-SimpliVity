# Sizing considerations

A node is a machine in the cluster (virtual or physical) with Docker Engine running on it. There are two types of nodes: managers and workers. UCP will run on the manager nodes. Although DTR runs on a worker node, Docker does not recommend running other application containers on these nodes.

To decide what size the node should be in terms of CPU, RAM, and storage resources, consider the following:

1.  All nodes should at least fulfil the minimal requirements, for UCP 3.1, 8GB of RAM and 4GB of storage. For production systems, 16GB of RAM is recommended for manager nodes. More detailed requirements are in the Docker EE UCP documentation at [https://docs.docker.com/ee/ucp/admin/install/system-requirements/](https://docs.docker.com/ee/ucp/admin/install/system-requirements/).
2.  UCP controller nodes should be provisioned with more than the minimal requirements if other workloads run on them.
3.  Ideally, worker node size will vary based on your workloads so it is impossible to define a universal standard size.
4.  Other considerations like target density (average number of containers per node), whether one standard node type or several are preferred, and other operational considerations might also influence sizing.

If possible, node size should be determined by experimentation and testing actual workloads; and they should be refined iteratively. A good starting point is to select a standard or default machine type in your environment and use this size only. If your standard machine type provides more resources than the UCP controller nodes need, it makes sense to have a smaller node size for these. Whatever the starting choice, it is important to monitor resource usage and cost to improve the model.

For this solution, the following tables describe sizing configurations, assuming 3 Linux workers and 3 Windows workers. The vCPU allocations are described in Table 1 while the memory allocation is described in Table 2.

**Table 1.** vCPU

|vCPUs|node01|node02|node03|
|:----|:----:|:----:|:----:|
|ucp1|4| | |
|ucp2| |4| |
|ucp3| | |4|
|dtr1|2| | |
|dtr2| |2| |
|dtr3| | |2|
|worker1|4| | |
|worker2| |4| |
|worker3| | |4|
|win-worker1|4| | |
|win-worker2| |4| |
|win-worker3| | |4|
|lb1|2| | |
|lb2| |2| |
|nfs| | |2|
|logger| |2| |
|Total vCPU per node|16|18|16|

**Note:** 
In the case of one ESX host failure, 2 nodes are enough to accommodate the amount of vCPU required.

**Table 2.** Memory allocation

|RAM (GB)|node01|node02|node03|
|:---------|:----:|:----:|:----:|
|ucp1|16| | |
|ucp2| |16| |
|ucp3| | |16|
|dtr1|16| | |
|dtr2| |16| |
|dtr3| | |16|
|lb1|4| | |
|lb2| |4| |
|nfs| | |4|
|logger| |4| |
|worker1|64| | |
|worker2| |64| |
|worker3| | |64|
|win-worker1|64| | |
|win-worker2| |64| |
|win-worker3| | |64|
|**Total RAM required (per node)**|**164**|**168**|**164**|
|**Available RAM**|**384**|**384**|**384**|

**Note:** 

In the case of one ESX host failure, the two surviving hosts can accommodate the amount of RAM required for all VMs.

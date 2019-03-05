# High availability

Uptime is paramount for businesses implementing Docker containers in business critical environments. The HPE Express Containers with Docker Enterprise Edition on HPE SimpliVity solution offers various levels of high availability (HA) to support continuous availability. The Docker EE system components run on multiple manager nodes in the cluster. The management plane continues to operate even in the event of a manager node failure. Application containers can be protected through the use of `services` running on top of swarm. The swarm orchestrator works to maintain the number of containers declared as part of the service. The Ansible playbooks can be modified to fit your environment and your high availability (HA) needs.

## Load Balancers

This solution also deploys load balancers in the system to help with container traffic management. There are two load balancer VMs – the UCP load balancer and DTR load balancer. The playbooks can be configured to deploy one or more worker load balancers depending on the requirements of your applications. A typical load balancer architecture for applications running on Docker EE is shown in [\#lbs](#lbs). The playbooks now support load balancers based on VRRP, using `HAproxy` and `keepalived`. The solution can be deployed using these loadbalancers, or external load balancers, or no load balancers or the legacy version of standalone load balancers.

 ![ "Load balancer architecture"][media-load-balancers-png] 

**Figure 2.** Load balancer architecture


[media-load-balancers-png]:<../media/load-balancers.png> "Figure 2. Load balancer architecture"
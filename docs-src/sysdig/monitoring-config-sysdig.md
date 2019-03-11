# Sysdig configuration


## Sysdig configuration for Kubernetes

The following table defines the variables used for configuring the Sysdig deployment on Kubernetes.


|Variable|File|Description|
|:-------|:---|:----------|
|sysdig_collector|group_vars/vars|The URL for the Sysdig SaaS, by default, `'collector.sysdigcloud.com'`|
|sysdig_collector_port|group_vars/vars|The port used by the agent, by default,  `'6666'`|
|sysdig_access_key|**group_vars/vault**|After the activation of your account on the Sysdig portal, you will be provided with your access key which will be used by the playbooks to install the agent on each UCP, DTR and Linux Kubernetes worker node.|
|k8s_cluster|group_vars/vars|This should match the cluster name - this is displayed when you configure the client bundle|
|sysdig_tags|group_vars/vars|Tagging your hosts is highly recommended. Tags allow you to sort the nodes of your infrastructure into custom groups in Sysdig Monitor. Specify location, role, and owner in the format: `'location:City,role:Express CaaS,owner:Customer Name'`|

## Sysdig configuration for Docker swarm

The following table defines the variables used for configuring the Sysdig deployment on Docker swarm.


|Variable|File|Description|
|:-------|:---|:----------|
|sysdig_access_key|**group_vars/vault**|After the activation of your account on the Sysdig portal, you will be provided with your access key which will be used by the playbooks to install the agent on each UCP, DTR and Linux worker node, as well as the NFS, logger and load balancer VMs.|
|sysdig_agent|group_vars/vars|Specifies the URL to the Sysdig Linux native install agent, for example, `https://s3.amazonaws.com/download.draios.com/stable/install-agent`|
|sysdig_tags|group_vars/vars|Tagging your hosts is highly recommended. Tags allow you to sort the nodes of your infrastructure into custom groups in Sysdig Monitor. Specify location, role, and owner in the format: `'location:City,role:Express CaaS,owner:Customer Name'`|





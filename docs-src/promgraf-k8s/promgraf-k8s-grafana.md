
# Grafana UI

The Grafana UI is available via your UCP, DTR or Kubernetes worker nodes, using `HTTP` on port `33030`, 
for example,

```
http://hpe-ucp01.am2.cloudra.local:33030
```
The default username and password for Grafana is `admin`/`admin`. The first time you login, you will be asked 
to reset the default `admin` password.


A number of dashboards are installed by default. The following figues illustrate some of the dashboard provided.

!["Compute resources dashboard"][media-k8s-compute-resources-cluster] 

**Figure:** Compute resources dashboard



!["USE method nodes dashboard"][media-k8s-USE-method-node]

**Figure:** USE method node dashboard


!["USE method node dashboard"][media-k8s-USE-method-node]

**Figure:** USE method nodes dashboard



!["Nodes dashboard"][media-k8s-nodes]

**Figure:** Nodes dashboard



!["Pods"][media-k8s-pods]

**Figure:** Pods dashboard

[media-k8s-compute-resources-cluster]:<../media/k8s-compute-resources-cluster.png> 
[media-k8s-USE-method-cluster]:<../media/k8s-USE-method-cluster.png> 
[media-k8s-USE-method-node]:<../media/k8s-USE-method-node.png> 
[media-k8s-pods]:<../media/k8s-pods.png> 
[media-k8s-nodes]:<../media/k8s-nodes.png> 



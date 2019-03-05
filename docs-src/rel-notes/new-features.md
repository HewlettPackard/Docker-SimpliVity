# New features


## Express Containers 2.1

This release of the Docker-SimpliVity playbooks deploys Docker EE 2.1, featuring Kubernetes 1.11.

- **Prometheus/Grafana on Kubernetes:** The playbooks now set up  a full monitoring stack for the deployed  Kubernetes infrastructure using Prometheus Operator. They install `kube-state-metrics` and `node-exporter` components, as well as supporting Kubelet and Apiserver metrics. Sample dashboards for Grafana are installed to help you monitor your Kubernetes infrastructure.

- **Docker UCP metrics for Kubernetes:** A separate, standalone Prometheus/Grafana deployment is provided to support visualization of UCP metrics. This will be integrated into the full stack deployment in a future release.

-  **Sysdig for Kubernetes:** The Sysdig deployment has been updated to use Kubernetes  1.11 RBAC and config maps for sensitive data.

- **NFS Provisioner for Kubernetes:** The NFS Provisioner has been updated to use Kubernetes 1.11 RBAC.

- **WordPress and MySQL using NFS Provisioner:** Playbooks are provided to validate the NFS Provisioner, featuring a WordPress and MySQL deployment with persistent storage.

- **kubectl:** A convenience playbook is provided to download and install `kubectl`.

- **Client bundle:** A convenience playbook is available to download and configure the client bundle from UCP.

- **Helm charts:** Playbooks for downloading, installing and configuring Helm are provided, with the use of sample charts for validation purposes.



## Express Containers 2.0
This release of the Docker-SimpliVity playbooks is based on the recent release of the corresponding Docker-Synergy playbooks with some specific additions:

-   **Load balancers:** The playbooks now support load balancers based on VRRP, using `HAproxy` and `keepalived`. The solution can be deployed using these loadbalancers, external load balancers, no load balancers or the legacy version of standalone load balancers.
-   **Default storage driver:** The default storage driver is now `overlay2`, as recommended by Docker. Previously, the `devicemapper` was configured in `direct-lvm` mode.
-   **Windows workers behind proxy:** Windows worker nodes can now be deployed behind a proxy. Simple HTTP proxy support is provided and the playbooks do not support any type of authentication with the proxy (on either RHEL or Windows nodes).
-   **Windows boot drive:** The OS partition of Windows worker nodes is now resized to occupy all the boot disk, whereas, previously, there would have been some unallocated space.

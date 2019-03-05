# Critical security issue in the Kubernetes API Server

To address [CVE-2018-1002105](https://nvd.nist.gov/vuln/detail/CVE-2018-1002105), a critical security issue in the Kubernetes API Server, Docker is using a custom build of Kubernetes 1.8.15 for UCP 3.0.7.

It is recommened that you specify `ucp_version: 3.0.7` in your Docker configuration - see the section `Docker configuration` for more information.

# New features

This release of the Docker-SimpliVity playbooks is based on the recent release of the corresponding Docker-Synergy playbooks with some specific additions:

-   **Load balancers:** The playbooks now support load balancers based on VRRP, using `HAproxy` and `keepalived`. The solution can be deployed using these loadbalancers, external load balancers, no load balancers or the legacy version of standalone load balancers.
-   **Default storage driver:** The default storage driver is now `overlay2`, as recommended by Docker. Previously, the `devicemapper` was configured in `direct-lvm` mode.
-   **Windows workers behind proxy:** Windows worker nodes can now be deployed behind a proxy. Simple HTTP proxy support is provided and the playbooks do not support any type of authentication with the proxy (on either RHEL or Windows nodes).
-   **Windows boot drive:** The OS partition of Windows worker nodes is now resized to occupy all the boot disk, whereas, previously, there would have been some unallocated space.

# Features taken from Docker-Synergy release

The principal features inherited from this release include:

-   Docker 2.0 with Kubernetes 1.8
-   Splunk support for monitoring Kubernetes logs and metrics
-   Sysdig support for monitoring Kubernetes clusters
-   Updated versions of Prometheus and Grafana

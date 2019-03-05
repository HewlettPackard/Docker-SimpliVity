cAdvisor
cAdvisor is an open source container resource usage and performance analysis agent. It is purpose-built for containers and supports Docker containers natively. In Kubernetes, cAdvisor is integrated into the Kubelet binary. cAdvisor auto-discovers all containers in the machine and collects CPU, memory, filesystem, and network usage statistics. cAdvisor also provides the overall machine usage by analyzing the ‘root’ container on the machine.

Kubelet exposes a simple cAdvisor UI for containers on a machine, via the default port 4194. However, this feature has been marked deprecated in v1.10 and completely removed in v1.12. For more inforation on how upcoming releases will reduce the set of metrics exposed by the kubelet, see the relevant issue page at https://github.com/kubernetes/kubernetes/issues/68522.

The Kubelet also starts an internal HTTP server on port 10255 and exposes endpoints including /metrics and /metrics/cadvisor. As this release of Express Containers uses Kubernetes 1.11, it is able to use this feature.

In future releases, it will be necessary to deploy cAdvisor as a DaemonSet for access to the cAdvisor UI.

The table below lists some example expressions using cAdvisor metrics.
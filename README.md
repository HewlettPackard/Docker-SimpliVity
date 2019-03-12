# Welcome to HPE Express Containers with Docker Enterprise Edition on HPE SimpliVity

HPE Express Containers with Docker Enterprise Edition on HPE SimpliVity is a complete solution from Hewlett Packard Enterprise that includes all the hardware, software, professional services, and support you need to deploy a Containers-as-a-Service (CaaS) platform, allowing you to get up and running quickly and efficiently.

The latest release deploys Docker EE 2.1 with Kubernetes 1.11

New features include:

- Full deployment of the Prometheus/Grafana stack (including node-exporter and kube-state-metrics) on Kubernetes, using Prometheus Operator
- Docker UCP metrics for Kubernetes in standalone Prometheus deployment
- Updated Sysdig deployment for Kubernetes 1.11
- Updated NFS Provisioner for Kubernetes 1.11 RBAC
- Validation of Kubernetes install, featuring a WordPress and MySQL deployment with persistent storage using the NFS Provisioner
- Playbooks for installing and configuring `kubectl` and the UCP client bundle
- Support for Helm charts, with 2 sample charts for validation purposes


**Warning:** There is a known issue with restoring DTR backups in this release - this should be fixed in the next release
of Docker EE 2.1, due in a few weeks. If this issue is a show-stopper for you, then you should use the previous release 
of HPE Express Containers, which features Docker EE 2.0 (Kubernetes 1.8).  

Documentation is available at [https://hewlettpackard.github.io/Docker-SimpliVity](https://hewlettpackard.github.io/Docker-SimpliVity)


PDF version [HPE Express Containers with Docker Enterprise Edition on HPE SimpliVity.pdf](https://github.com/HewlettPackard/Docker-SimpliVity/raw/master/HPE%20Express%20Containers%20with%20Docker%20Enterprise%20Edition%20on%20HPE%20SimpliVity.pdf)


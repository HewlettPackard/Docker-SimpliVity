# Critical security issue in the Kubernetes API Server

To address [CVE-2018-1002105](https://nvd.nist.gov/vuln/detail/CVE-2018-1002105), a critical security issue in the Kubernetes API Server, Docker is using a custom build of Kubernetes 1.8.15 for UCP 3.0.7.

It is recommened that you specify `ucp_version: 3.0.7` in your Docker configuration - see the section [Docker configuration](../config-core/docker-config.md) for more information.

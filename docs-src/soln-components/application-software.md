# Application software

A number of different logging and monitoring solutions are supported by this solution:

-   Splunk
-   Sysdig
-   Prometheus and Grafana

The application software components used in this Reference Configuration are listed in Table 5.

**Table 5.** Application software

|Component|Version|
|:--------|:------|
|Splunk|7.1.2|
|Sysdig|latest|
|Prometheus|v2.3.2|
|Grafana|5.2.3|

## Monitoring with Splunk and Sysdig

The solution can be configured to use either Splunk or Sysdig or to enable both simultaneously. While there is some overlap in the functionality provided by these tools, they are ultimately complimentary in what they offer. Splunk aggregates logging and tracing for a wide variety of sources and provides a clean, high-level dashboard for all your enterprise systems. Sysdig, on the other hand, has been engineered from the ground up to focus on containerized environments and includes both monitoring and security features, with built-in understanding of the different workloads running on your cloud.

More information on configuring Splunk and running the relevant playbooks can be found in the section `Deploying Splunk`.

For more information on configuring Sysdig and running the relevant playbooks, see the section `Deploying Sysdig monitoring`.

## Monitoring with Prometheus and Grafana

The solution can be configured to enable the use of Prometheus and Grafana for monitoring. In this setup, there is no need for native installs and all the required monitoring software runs in containers, deployed as either services or stacks. See the section `Deploying Prometheus and Grafana on Docker RHEL nodes` for more information on configuring and deploying the software.

The solution supports two separate monitoring stacks, with one running on Kubernetes and the other using Docker swarm.

For more information on running Prometheus and Grafana on Kubernetes, see section `Monitoring Kubernetes with Prometheus and Grafana`.

For more information on running Prometheus and Grafana on Docker swarm, see section `Monitoring Docker swarm with Prometheus and Grafana`


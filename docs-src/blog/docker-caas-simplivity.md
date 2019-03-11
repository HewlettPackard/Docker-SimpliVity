---
title: Deploy Docker Containers as a Service in minutes on HPE SimpliVity
date: 2019-01-02
description: Learn how to architect and deploy a Docker CaaS platform on HPE SimpliVity. Use Ansible playbooks to quickly install a production-ready container environment with Kubernetes.
---

# Deploy Docker Containers as a Service in minutes on HPE SimpliVity

I recently blogged about understanding containers and the related monitoring challenges. Now it’s time to discuss the 
resources available to help you tackle those challenges and to speed deployment of Docker Containers-as-a-Service (CaaS) on HPE SimpliVity.

The recently updated deployment guide for HPE Express Containers with Docker Enterprise Edition on HPE SimpliVity delivers 
one-click deployment of a complete private cloud including compute, network and storage resources. 

The accompanying Ansible playbooks allow you to quickly deploy Docker Enterprise Edition 2.0 and Kubernetes on top of VMware vSphere. 
Also included are scripts to backup and restore your cloud, along with software to integrate with leading container-aware 
monitoring offerings. The Ansible playbooks and online documentation are available now. 

## New features in this release

This release deploys Docker Enterprise Edition 2.0 and provides a choice of orchestrator: Docker Swarm or Kubernetes. 
You can use the same simple, declarative syntax to deploy applications to either orchestrator, so this provides a 
convenient migration path for existing Docker swarm users to move to Kubernetes. The Docker Universal Control Plane 
uses a single pane of glass to control the deployment and management of applications across both orchestrators and 
gives role-based access control (RBAC) to secure your cluster. Docker Trusted Registry (DTR) is also deployed 
so that you can build, store, scan and sign your container images locally. 


The solution also supports Windows worker nodes, but the functionality is lagging behind what is available for Linux, 
particularly in the areas of networking and monitoring. This situation should improve soon with upcoming releases 
of Docker EE and Windows Server. Other functionality under consideration for future releases of the solution 
includes support for bare-metal worker nodes and more storage options.

The solution addresses both the opportunities and the challenges presented by the shift to cloud-native applications. 
This change promises to deliver functionality in a faster and more streamlined manner, but comes at the cost of 
increased system complexity that necessitates new working practices and tools for developers and system administrators. 
The remainder of this blog post outlines the monitoring solutions that the solutuon provides to help you transition 
to this new software lifecycle, from development and testing to deployment and day-to-day operations.

## Monitoring support in the solution

### Sysdig

HPE has teamed up with Sysdig to offer a fully featured, 90-day trial version of Sysdig Monitor and Secure as 
part of HPE Express Containers with Docker Enterprise Edition on HPE SimpliVity. 

For more details on how to sign up, see the GitHub repository. The Sysdig Agent runs in a container on each 
Linux VM in the solution and can infer both the physical and the logical structure of the applications deployed 
on your cloud. This allows Sysdig Monitor, running as Software-as-a-Service (SaaS), to provide rich visibility 
from an infrastructure-centric point of view for the operations engineer and from an application-centric point 
of view for the software developer.

### Prometheus and Grafana
Prometheus is a hugely popular, open-source time-series database for collecting and querying monitoring data, 
and is typically used in conjunction with Grafana for data visualization. You can instrument your application 
code to generate custom metrics, while there are custom exporters for common third-party software. 
cAdvisor generates container metrics, node-exporter reports on the underlying servers while Kubernetes itself 
produces metrics on how it is performing. All this data can be gathered and queried in Prometheus for 
rules-based alerting and to produce management dashboards in Grafana.

### Splunk
Splunk Enterprise allows you to aggregate and analyze data from any source, both structured or unstructured, 
using machine leaning to provide insight into patterns and trends and to help you make faster, better-informed 
business decisions. This solution deploys a fully-featured (but capacity-restricted) demo version of 
Splunk Enterprise that has been updated to support Kubernetes, while also facilitating integration with 
existing installations of Splunk Enterprise that your company may already have.







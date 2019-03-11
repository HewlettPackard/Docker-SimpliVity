---
title: Understanding containers and related monitoring challenges
date: 2019-01-01
description: Covering the basics on containers, DevOps and what it takes to lessen the challenges that come with monitoring containerized applications 
---

# Understanding containers and related monitoring challenges

## What is a container?

Containers are often viewed as lightweight virtual machines (VMs). While a VM has its own complete operating system sitting on top of a hypervisor, containers are sandboxes running directly on top of the host system’s kernel and, as a result, are faster and less resource intensive. 

Developers initially adopted containers as a means to package up their code, along with all of its dependencies and configuration details, to run it anywhere - public, private or hybrid cloud. By simplifying the development environment, container technology allowed developers to run multiple versions of their own and 3rd party software on a single workstation without annoying conflicts. As a result, containers became a common, standardized building block for software development and led to the demise of the "it works on my machine" scenario.

Containers have been around for a long time in the Linux world, but Docker popularized them by making them easy and efficient to use and by providing a public registry of standardized container images for 3rd party software.  In the past, container technology had been perceived to be prone to security vulnerabilities, in particular to "breakout" where malicious code could escape the sandbox and access sensitive information on the host. Over the years, Docker has worked to reduce the attack surface and to limit the blast-radius should any attack succeed. As a result, running applications on containers can now significantly reduce the impact of any attack due to the underlying protections available out of the box using Docker.

Containers also facilitated the adoption of microservices architectures where, instead of developing single monoliths, applications are split up into a set of independent services that communicate with each other via well-defined interfaces (APIs). As result, the container has now become the standardized unit for software development for packaging, composition, deployment, scaling and re-use.  However, to deploy and maintain a reliable distributed system using all these containers, another layer of management software is required and that is role of the container orchestrator.


## What is a container orchestrator?

A container orchestrator is a piece of software that attempts to automate the operations that would traditionally be performed by a system administrator including:

* Scaling applications up and down, depending on demand
* Load balancing across containers
* Restarting individual containers that fail
* Replacing and rescheduling containers when an underlying host node dies
* Managing compute, network and storage resources
* Optimizing resource utilization
* Automating the roll-out and rollback of deployments
* Allowing services to discover other services in the system
* Monitoring and centralized logging


The use of an orchestrator typically results in increased container density, leading to improved overall utilization of resources. In addition, the average lifetime of a container also decreases significantly as the orchestrator restarts, removes or relocates containers when auto-scaling or node failure occurs.

## What is Kubernetes?

Kubernetes is an open-source container orchestrator project, founded by Google in 2014 and based on the internal distributed systems that support some of Google's most popular applications.

A number of proprietary container orchestration systems have been available, including Docker swarm and Mesosphere DC/OS. However, the DevOps community rapidly converged to make Kubernetes the de-facto standard and most commercial offerings have now pivoted to include Kubernetes as part of their offerings.  It should be noted that Kubernetes also underpins offerings from all the main cloud providers such as Amazon's Elastic Container Service for Kubernetes (EKS), Microsoft's Azure Kubernetes Service (AKS) and Google's own Kubernetes Engine (GKE). This ability to support on-premises, public cloud and hybrid deployments using a single technology and avoiding vendor lock-in, helps further copper-fasten the grip Kubernetes has on the DevOps mindset.


## What is DevOps?

DevOps is a culture that attempts to bring speed and agility to an organization that in the past might have had monthly or quarterly release cycles, but that now requires daily or even hourly updates to remain competitive. It involves a blurring of the responsibilities between the previously disparate roles of software developer and operations engineer. After the transition from data centers to the cloud (public, private and hybrid), operations engineers are typically insulated from the underlying infrastructure, and no longer install, cable or upgrade hardware. Instead, the entire infrastructure for running applications can be provisioned using software, and the use of proven software development practices along with Infrastructure as Code (IaC) tools such as Git and Ansible, allow operations engineers to automate deployment and maintenance. At the same time, software developers have to learn how to accommodate regular "failures" in their applications where containers and nodes dynamically stop and re-start, and also to understand how their code will perform in a distributed environment and the cost implications of their architecture decisions.


## Monitoring: why it’s important and difficult?

Monitoring has many distinct goals. Examples include: producing management dashboards, generating threshold-based alerts to prompt human or automated intervention, or enabling root cause, performance and trend analysis. 

Orchestration and DevOps processes simplify the day-zero deployment of container-based applications and support the ongoing management of reliable, distributed systems. However, they also make monitoring more difficult. New layers of complexity are introduced that make it harder for developers and ops engineers to gain visibility into running applications and to determine how they might mitigate issues that arise. 

Monitoring metrics can be produced by the application code itself and by any third-party software, running as distributed microservices. In addition, the infrastructure generates significant data about the containers, the servers they run on and the orchestrator itself. 

Together with the higher density and dynamic nature of containers, traditional monitoring software can struggle with the volume and granularity of data produced and the constant churn in the systems involved. A new generation of software has evolved to monitor containers and microservices, while some legacy offerings have been adapted to handle these new requirements. 

In my next blog, I’ll be talking about reference configurations designed to support a number of monitoring solutions—both open-source and commercial—that are geared toward cloud-native applications. I’ll also delve into deploying Docker containers-as-a-service (CaaS) in minutes on HPE Synergy.




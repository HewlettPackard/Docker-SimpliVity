# Software

The software components used in this Reference Configuration are listed in Table 3 and Table 4.

**Table 3.** Third-party software

|Component|Version|
|:--------|:------|
|Ansible|2.7|
|Docker EE|2.1 with Docker EE Engine 18.09 (tested with UCP 3.1.3 and DTR 2.6.2)|
|Red Hat® Enterprise Linux|7.6|
|Microsoft® Windows|Server 2016|
|VMware®|ESXi 6.5.0 and vCenter 6.5.0|


**Table 4.** HPE Software

|Component|Version|
|:--------|:------|
|HPE SimpliVity OmniStack|3.7.6|

## About Ansible

Ansible is an open-source automation engine that automates software provisioning, configuration management and application deployment.

As with most configuration management software, Ansible has two types of servers: the controlling machine and the nodes. A single controlling machine orchestrates the nodes by deploying modules to the Linux nodes over SSH. The modules are temporarily stored on the nodes and communicate with the controlling machine through a JSON protocol over the standard output. When Ansible is not managing nodes, it does not consume resources because no daemons or programs are executing for Ansible in the background. Ansible uses one or more inventory files to manage the configuration of the multiple nodes in the system.

When deploying Windows nodes in a hybrid deployment, the Ansible playbooks make use of the Python `pywinrm` module which carries out actions via the Windows remote manager.

More information about Ansible can be found at [http://docs.ansible.com](http://docs.ansible.com/).

## About Docker Enterprise Edition

Docker Enterprise Edition (EE) is the leading enterprise-ready container platform for IT that manages and secures diverse applications across disparate infrastructure, both on-premises and in the cloud. Docker EE provides integrated container management and security from development to production. Enterprise-ready capabilities like multi-architecture orchestration and secure software supply chain give IT teams the ability to manage and secure containers without breaking the developer experience.

Docker EE provides:

-   Integrated management of all application resources from a single web admin UI.
-   Frictionless deployment of applications and Compose files to production in a few clicks.
-   Multi-tenant system with granular role-based access control (RBAC) and LDAP/AD integration.
-   Self-healing application deployment with the ability to apply rolling application updates.
-   End-to-end security model with secrets management, image signing and image security scanning.

More information about Docker Enterprise Edition can be found at [https://www.docker.com/enterprise-edition](https://www.docker.com/enterprise-edition).
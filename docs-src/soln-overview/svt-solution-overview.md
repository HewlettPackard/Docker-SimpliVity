# HPE SimpliVity solution overview 

The HPE Express Containers with Docker Enterprise Edition on HPE SimpliVity solution consists of a set of Ansible playbooks that run on top of a VMware virtualization platform on HPE SimpliVity hardware. The solution allows you to configure a flexible OS environment (with both RHEL and Windows workers) providing built-in high availability (HA), container monitoring and security, and backup and restore functionality.

![ "Solution overview"][svt----media-overview-graphic-svt-png]

**Figure 1.** Solution overview

[Figure 1](svt-solution-overview.md#overview-graphic) provides an overview of the steps used to deploy the solution. Deploying your hardware and HPE SimpliVity is specific to your environment and is not covered here. This document shows you how to:

-   Prepare the VM templates
-   Create the Ansible host
-   Configure the Ansible parameters
-   Run the Ansible playbooks

Once you are up and running, you should regularly backup the system using the scripts provided as part of this solution.


[svt----media-overview-graphic-svt-png]:<../media/overview-graphic-svt.png> "Figure 1. Solution overview"
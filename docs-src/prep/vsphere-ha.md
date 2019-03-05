# Enable vSphere High Availability (HA)

You must enable vSphere High Availability (HA) to support virtual machine failover during a HA event such as a host failure. Sufficient CPU and memory resources must be reserved across the cluster so that all VMs on the affected host(s) can fail over to remaining available hosts in the cluster. You configure an Admission Control Policy (ACP) to specify the percentage CPU and memory to reserve on all the hosts in the cluster to support HA functionality.

More information on enabling vSphere HA and configuring Admission Control Policy is available in the HPE SimpliVity documentation. Log in to the HPE Support Center at [https://www.hpe.com/us/en/support.html](https://www.hpe.com/us/en/support.html) and search for “HPE SimpliVity 380”. The administration guide is listed when you select the User document type.

**Note:** 

You should not use the default Admission Control Policy. Instead, you should calculate the memory and CPU requirements that are specific to your environment.

# vSphere Docker Volume Service Plug-in

vSphere Docker Volume service plug-in is part of an open source project by VMware that enables running stateful containers by providing persistent Docker volumes leveraging existing storage technology from VMware. There are two parts to the plug-in, namely, client software and server software (see Table 28). Every version of the plug-in that is released includes both pieces of software and it is imperative that the version number installed on the client side and server side are the same.

When updating the Docker Volume service plug-in, ensure the ESXi version you are running is supported and that the client software is compatible with the operating system.

**Table 28.** vSphere Docker Volume service components

|Order|Component|Dependency (compatibility)|Download/Documentation|
|:----|:--------|:---------------------------|:---------------------|
|1.|Server Software|1.  VMware ESXi<br>2.  Docker EE|[vSphere Docker Volume Service on GitHub](http://vmware.github.io/vsphere-storage-for-docker/documentation/index.html)|
|2.|Client Software|1.  VM Operating System<br>2.  Docker EE|
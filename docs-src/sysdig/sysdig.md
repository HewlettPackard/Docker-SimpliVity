# Monitoring with Sysdig

Sysdig's approach to Docker monitoring uses transparent instrumentation to see inside containers from the outside, with no need for agents in each container. Metrics from Docker containers, and from your applications running inside them, are aggregated in real-time across each service to provide meaningful monitoring dashboards and alerts for your application.

Figure 3 provides an overview of the Sysdig architecture.

 ![ "Sysdig architecture"][media-sysdig-architecture-png] 

**Figure 3.** Sysdig architecture

**Sysdig Monitor** allows you to analyze response times, application performance metrics, container and server utilization metrics, and network metrics. You can build dashboards across applications, micro-services, container and networks, and explore metadata from Docker, Kubernetes, Mesos and AWS. For more information, see the [Sysdig Container Monitoring](https://www.youtube.com/watch?v=NR9XLZw0ndo) video overview and the [Sysdig Monitor 101](https://sysdig.teachable.com/p/sysdig-101) training course.

**Sysdig Secure** provides security at the orchestrator as well as the container level. You create service-aware policies that allow you to take actions (like killing a container) or send alerts (to Slack, Splunk, etc) whenever a policy violation occurs. All commands are audited to help you identify anomalous actions, along with taking snapshots of all activities pre-and-post a policy violation. For more information, see the [Sysdig Container Monitoring](https://www.youtube.com/watch?v=e_kdjHjK7mY) video overview and the [Sysdig Secure 101](https://sysdig.teachable.com/p/sysdig-secure-101) training course.

The implementation in this solution uses the Software as a Service (SaaS) version of Sysdig. The playbooks deploy Sysdig Agent software on each UCP, DTR and Linux worker node, as well as the NFS, logger and load balancer VMs and captured data is relayed back to your Sysdig SaaS Cloud portal. The deployment provides access to a 90 day try-and-buy, fully featured version of the Sysdig software.

**Note:** The Sysdig functionality is not turned on by default in this solution - see the section on Configuration for more information on how to enable Sysdig. For more information on how to access the 90 day try-and-buy version, see the section `Registering for Sysdig trial`.


[media-sysdig-architecture-png]:<../media/sysdig-architecture.png> "Figure 3. Sysdig architecture"

# Docker EE Environment

Each release of Docker Enterprise Edition contains three technology components – UCP, DTR and the Docker Daemon or Engine. It is imperative that the components belonging to the same version are deployed or upgraded together – see Table 30. 

A banner will be displayed on the UI, as shown in Figure 32, when an update is available for UCP or DTR. You can start the upgrade process by clicking on the banner.

 ![ "Docker update notification"][media-dockerupdate-png] 

**Figure 32.** Docker update notification

**Table 30.** Docker EE components

|Order|Component|Dependency (compatibility)|Download/Documentation|
|:----|:--------|:---------------------------|:---------------------|
|1.|Docker Daemon/Engine|1.  VM Operating System<br>2.  vDVS plugin<br>3.  Prometheus and Grafana|-   [Docker Lifecycle Maintenance](https://success.docker.com/Policies/Maintenance_Lifecycle)<br>-   [Docker Compatibility Matrix](https://success.docker.com/Policies/Compatibility_Matrix)|
|2.|Universal Control Plane|
|3.|Docker Trusted Registry|

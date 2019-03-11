# Monitoring Tools

To learn more about upgrading Splunk, see the relevant documentation at [How to upgrade Splunk Enterprise](http://docs.splunk.com/Documentation/Splunk/7.1.2/Installation/HowtoupgradeSplunk).

The Sysdig agent runs as a container and the latest version is pulled from the Docker hub on first installation. Re-run the `install_sysdig.yml` playbook to update to the newest version if required.

Prometheus and Grafana monitoring tools (see Table 31) run as containers within the Docker environment. Newer versions of these tools can be deployed by pulling the Docker images from Docker Hub. Verify that the version of Prometheus that is being used is compatible with the version of Docker EE.


**Table 31.** Monitoring tools: Prometheus and Grafana

|Order|Component|Dependency (compatibility)|Download/Documentation|
|:----|:--------|:---------------------------|:---------------------|
|1.|Prometheus|1.  Grafana<br>2.  Docker EE|1.  Prometheus Images on Docker Hub<br>2.  [Upgrading Grafana](http://docs.grafana.org/installation/upgrading/)|
|2.|Grafana|1.  Prometheus<br>2.  Docker EE|

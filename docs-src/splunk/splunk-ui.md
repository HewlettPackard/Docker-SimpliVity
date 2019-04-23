# Accessing Splunk UI

After the installation is complete, the Splunk UI can be reached at `http://<fqdn>:8000`, where `<fqdn>` is the FQDN of one of your Linux Docker nodes. Mesh routing does not currently work on Windows so you must use a Linux node to access the UI. For example:

```
http://hpe-ucp01.am2.cloudra.local:8000/
```

The default username and password for Splunk is `admin` / `changeme`.

Use the `Docker App` to view the Docker overview and the Docker stats as shown in Figures 15 and 16.

![ "Docker overview"][media-splunk-ui-docker-png]

**Figure 15.** Docker overview

![ "Docker stats"][media-splunk-ui-docker-stats-png]

**Figure 16.** Docker stats

Use the `k8s App` to see the Kubernetes overview as shown in Figure 17 and then access the details for deployments, daemon sets, replica sets, services, etc.

![ "Kubernetes overview"][media-splunk-k8s-overview-png]

**Figure 17.** Kubernetes overview

[media-splunk-ui-docker-png]:<../media/splunk-ui-docker.png> "Figure 15. Docker overview"
[media-splunk-ui-docker-stats-png]:<../media/splunk-ui-docker-stats.png> "Figure 16. Docker stats"
[media-splunk-k8s-overview-png]:<../media/splunk-k8s-overview.png> "Figure 17. Kubernetes overview"
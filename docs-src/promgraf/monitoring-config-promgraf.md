# Prometheus and Grafana configuration

All Monitoring-related variables for Prometheus and Grafana are described in [\#monitoring-config-table-conref](#monitoring-config-table-conref). The variables determine the versions of various software tools that are used and it is recommended that the values given below are used.

|Variable|Description|
|:-------|:----------|
|cadvisor_version| `v0.28.3` |
|node_exporter_version| `v1.15.0` |
|prometheus_version| `v2.3.2` |
|grafana_version| `5.2.3` |
|prom_persistent_vol_name|The name of the volume which will be used to store the monitoring data. The volume is created using the vSphere Docker Volume plugin.|
|prom_persistent_vol_size|The size of the volume which will hold the monitoring data. The exact syntax is dictated by the vSphere Docker Volume plugin. The default value is 10GB.|
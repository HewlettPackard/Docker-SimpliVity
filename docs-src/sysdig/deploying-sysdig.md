# Introduction

By default, the playbooks for deploying Sysdig are commented out in `site.yml` and must be explicitly enabled in that file if you want it included in the initial deployment. Alternatively, you can run the specific playbooks detailed in this section in a stand-alone manner, subsequent to the initial deployment.

**Note:** 

By default, you must have outgoing port `6666` open in your firewall, to allow data to flow to `collector.sysdigcloud.com`. You can configure the agent to use a different port using the variable `sysdig_collector_port` in `group_vars/vars`.

 For more information, see the relevant Sysdig documentation at [https://support.sysdig.com/hc/en-us/articles/204205969](https://support.sysdig.com/hc/en-us/articles/204205969).

If you are using a proxy, it must be configured to be "fully-transparent". Non-transparent proxies will not allow the agent to connect.
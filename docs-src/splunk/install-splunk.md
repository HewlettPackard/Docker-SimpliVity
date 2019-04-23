# Playbooks for installing Splunk

The following playbooks are used to deploy Splunk.

-   `playbooks/splunk_demo.yml` installs a demo of Splunk Enterprise in the cluster (if the `splunk_demo` deployment option is selected. A value of `splunk` is used to configure an external production Splunk deployment.)
-   `playbooks/splunk_uf.yml` installs and configures the Splunk Universal Forwarder on each Linux and Windows machine in the inventory

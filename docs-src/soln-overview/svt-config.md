# HPE SimpliVity configuration

The Ansible playbooks are available to download at [https://github.com/HewlettPackard/Docker-SimpliVity](https://github.com/HewlettPackard/Docker-SimpliVity). By default, the playbooks are configured to set up a 3 node environment. This is the minimal starter configuration recommended by HPE and Docker for production.

The Operations environment is comprised of three HPE SimpliVity 380 Gen10 servers. HPE recommends dual socket HPE SimpliVity systems with at least 14 CPU cores per socket (28 total cores per system) for optimal performance and support during HA failover scenarios. Since the HPE SimpliVity technology relies on VMware virtualization, the servers are managed using vCenter.
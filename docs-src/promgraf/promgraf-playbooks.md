# Playbooks for installing Prometheus and Grafana on Swarm

The following playbooks are used to deploy Prometheus and Grafana on Docker Swarm.

-   `playbooks/install_logspout.yml` installs and configures **Logspout** on all Docker nodes. Logspout is responsible for sending logs produced by containers running on the Docker nodes to the central logger VM. By default, this playbook is commented out in `site.yml`.
-   `playbooks/config_monitoring.yml` configures a monitoring system for the Docker environment based on Grafana, Prometheus, cAdvisor and node-exporter Docker containers. By default, this playbook is commented out in `site.yml`, so if you want to use the solution to automatically deploy a Prometheus/Grafana monitoring system, you must explicitly uncomment both this and the `playbooks/install_logspout.yml` playbook in `site.yml` or run these playbooks post-deployment.
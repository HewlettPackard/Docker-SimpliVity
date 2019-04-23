# Playbooks for installing Sysdig on RHEL

-   `playbooks/sysdig-k8s-rbac.yml` is used to configure Sysdig for Kubernetes.
-   `playbooks/install_sysdig.yml` is used to configure Sysdig for Docker swarm. It opens the required port in the firewall, and installs the latest version of the Sysdig agent image on the nodes. By default, this playbook is commented out in `site.yml`, so if you want to use the solution to automatically configure Sysdig, you must uncomment this line. Alternatively, you can run this playbook standalone, post-deployment.




# Deploying Sysdig monitoring on Docker Swarm

The playbook `playbooks/install_sysdig.yml` is used to automate the configuration of the SaaS setup. By default, this playbook is commented out in `site.yml` and must be explicitly enabled. An access key variable must be set in the `group_vars/vault` file as detailed in the section `Sysdig configuration for Docker swarm`.

```
# cd Docker-SimpliVity
# ansible-playbook -i vm_hosts playbooks/install_sysdig.yml --vault-password-file .vault_pass

```

Using the Sysdig software as a solution (SaaS) website [https://app.sysdigcloud.com](https://app.sysdigcloud.com), you are able to view, analyze and inspect various different dashboards.

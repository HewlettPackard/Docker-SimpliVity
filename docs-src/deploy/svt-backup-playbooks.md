# HPE SimpliVity backup playbooks

Two playbooks are provided to support the backup of Docker volumes using HPE SimpliVity functionality. The playbooks are run by default when using `site.yml` to deploy the solution.

### Configure dummy VMs to backup Docker volumes

The playbook `playbooks/config_dummy_vms_for_docker_volumes_backup.yml` ensures that you can back up Docker volumes that have been created using the vSphere plugin (vDVS) in HPE SimpliVity. There is not a straight forward way to do this, so you need to use a workaround. Since all Docker volumes are going to be stored in the `dockvols` folder in the datastore(s), you need to create a ‘dummy’ VM per datastore. The `vmx`, `vmsd` and `vmkd` files from this VMs will have to be inside the dockvols folder, so that, when these VMs are backed up, the volumes are backed up as well. Obviously these VMs don’t need to consume any resources and you can keep them powered off.

### Configure HPE SimpliVity backups

The playbook `playbooks/config_simplivity_backups.yml` configures the backup policies, defined in the group variables file, on your HPE SimpliVity installation. It will configure all Docker nodes plus the ‘dummy’ VMs created before, so that existing Docker volumes are also taken into account. The playbook will mainly use the HPE SimpliVity REST API to perform these tasks. A reference to the REST API can be found at: [https://api.simplivity.com/rest-api_getting-started_overview/rest-api_getting-started_overview_rest-api-overview.html](https://api.simplivity.com/rest-api_getting-started_overview/rest-api_getting-started_overview_rest-api-overview.html) 

# Introduction to backup and restore

This reference configuration provides playbooks and scripts to help you back up and restore:

-   Docker UCP and DTR
-   Docker volumes

## Backup and restore UCP and DTR

The playbooks provided in this solution implement the backup and restore procedures as they are described in the Docker documentation at [https://docs.docker.com/enterprise/backup/](https://docs.docker.com/enterprise/backup/). The solution follows the recommendations in the Docker best practices document at [https://success.docker.com/article/backup-restore-best-practices](https://success.docker.com/article/backup-restore-best-practices).

**Note:** It is important that you make copies of the backed up data and that you store the copies in a separate physical location. You must also recognize that the backed up data contains sensitive information such as private keys and so it is important to restrict access to the generated files. However, the playbooks do not backup the sensitive information in your `group_vars/vault` file so you should make sure to keep track of the credentials for the UCP Administrator.

**Warning:** The restore procedures do not restore swarm data. You should follow infrastructure as code (IaC) guidelines and maintain your service, stack and network definitions using source code or configuration management tools. You must also ensure that you safely manage the credentials of your administration accounts as existing UCP Client bundles will not work when you restore UCP on a new swarm.

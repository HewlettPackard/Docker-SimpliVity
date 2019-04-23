# Backup and restore playbooks

Best practices and procedures are described in the section `Backup and restore`. The following playbooks are used to perform backups:

-   `playbooks/backup_swarm.yml` is used to back up the swarm data
-   `playbooks/backup_ucp.yml` is used to back up UCP
-   `playbooks/backup_dtr_meta.yml` is used to back up DTR metadata
-   `playbooks/backup_dtr_images.yml` is used to back up DTR images

The following playbooks are used to restore the system:

-   `playbooks/restore_dtr_images.yml` is used to restore DTR images
-   `playbooks/restore_dtr_metadata.yml` is used to restore DTR metadata
-   `playbooks/restore_ucp.yml` is used to restore UCP

The playbooks for configuring HPE SimpliVity backup functionality are run as part of `site.yml` by default:

-   `playbooks/config_dummy_vms_for_docker_volumes_backup.yml` 
-   `playbooks/config_simplivity_backups.yml` 
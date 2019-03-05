# Running the playbooks

At this point, the system is ready to be deployed. Make sure you are logged on as `root` on your ansible box and that your current directory is `/root/Docker-SimpliVity`

**Note:** As well as configuring your `vars` and `vault` files, you must also provide a `backups` configuration file in the `group_vars` folder when running `site.yml`. An example file is provided in the repository named `backups.sample`. Rename it to `backups` before running the playbooks. Details on how to configure this file are available in the section TODO LINKS.
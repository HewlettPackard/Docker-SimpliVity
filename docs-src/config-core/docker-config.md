# Docker configuration

All Docker-related variables are mandatory and are described in the following table.

|Variable|File|Description|
|:-------|:---|:----------|
|docker_ee_url|**group_vars/vault**|Note: This is a private link to your Docker EE subscription. The value for `docker_ee_url` is the URL documented at the following address: [https://docs.docker.com/engine/installation/linux/docker-ee/rhel/](https://docs.docker.com/engine/installation/linux/docker-ee/rhel/).|
|docker_ee_reponame|group_vars/vars|For Docker EE 2.1, this variable should be set to the value `stable-18.09`|
|rhel_version|group_vars/vars|For the Docker installation, this sets the version of your RHEL OS, such as `7.6`. The playbooks were tested with RHEL 7.6.|
|dtr_version|group_vars/vars|Version of the Docker DTR you wish to install. You can use a numeric version or `latest` for the most recent one. The playbooks were tested with 2.6.2|
|ucp_version|group_vars/vars|Version of the Docker UCP you wish to install. You can use a numeric version or `latest` for the most recent one. The playbooks were tested with UCP 3.1.3.|
|images_folder|group_vars/vars|Directory in the NFS server that will be mounted in the DTR nodes and that will host your Docker images.|
|license_file|group_vars/vars|Full path to your Docker EE license file on your Ansible host. The license file is available from the Docker Store|
|ucp_username|group_vars/vars|Username of the administrator user for UCP and DTR, typically `admin`.|
|ucp_password|**group_vars/vault**|The password for the `ucp_username` account.|
|docker_storage_driver|group_vars/vars|Storage driver for Docker nodes. Accepted values are `overlay2` (the default) and `devicemapper`.|

To see how to use customer-supplied certificates with UCP and DTR, see Appendix B.

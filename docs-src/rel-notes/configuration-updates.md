# Configuration updates


## Express Containers 2.1

New variables and configuration files introduced in release 2.1 of Docker-SimpliVity:

- `backup_passphrase` variable in `group_vars/vault` - a dummy value is provided in the sample vault file   
- `nfs_provisioner_namespace` variable in `group_vars/vars` - default value is `nfsstorage`
- `nfs_provisioner_serviceaccount` variable in `group_vars/vars` - default value is `nfs-provisioner`
- `sysdig_collector` variable in `group_vars/vars` - default value is `collector.sysdigcloud.com`
- `sysdig_collector_port` variable in `group_vars/vars` - default value is `6666`
- `kubectl_version` variable in `group_vars/vars` - default value is `1.11.5`
- `kubectl_checksum` variable in `group_vars/vars` - default value is checksum for version `1.11.5`
- `helm_version` variable in `group_vars/vars` - default value is `2.12.3`
- `helm_checksum`variable in `group_vars/vars` - default value is checksum for version `2.12.3`

## Express Containers 2.0

New variables and configuration files introduced in release 2.0 of Docker-SimpliVity:

-   `docker_ee_reponame` variable in `group_vars/vars` replaces `docker_ee_version` 
-   `docker_ee_version_windows` variable in `group_vars/vars` 
-   `docker_storage_driver` variable in `group_vars/vars` 
-   `windows_update` variable in `group_vars/vars` 
-   `windows_winrm_script` variable in `group_vars/vars` 

Recently added variables and configuration files inherited from the underlying Docker-Synergy release:

-   `splunk_uf_password` variable in `group_vars/vault` 
-   `orchestrator` variable in `vm_hosts` 
-   `k8s_pod_cidr` variable in `group_vars/vars` 
-   Additional configuration files for each group in the inventory including `group_vars/vms.yml`, `group_vars/ucp.yml`, `group_vars/dtr.yml`, `group_vars/worker.yml` and `group_vars/nfs.yml` 

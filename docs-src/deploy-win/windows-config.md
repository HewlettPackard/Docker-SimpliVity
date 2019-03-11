# Windows configuration

Window-related variables are shown in Table 15.


**Table 15.** Windows variables

|Variable|File|Description|
|:-------|:---|:----------|
|win_vm_template|group_vars/vars|Name of the Windows 2016 VM Template to use. Note that this is the name from a vCenter perspective, not the hostname.|
|win_username|group_vars/vars|Windows user name. The default is `Administrator` |
|win_password|**group_vars/vault**|The password for the Windows account.|
|windows_vdvs_ps|group_vars/vars|Variable used to download the PowerShell script that is used to install vDVS for Windows. For example, `https://raw.githubusercontent.com/vmware/vsphere-storage-for-docker/master/install-vdvs.ps1` |
|windows_vdvs_path|group_vars/vars|Variable used to download vSphere Docker Volume Service software. This variable is combined with `windows_vdvs_version` (below) to generate a URL of the form `<windows_vdvs_path>_<windows_vdvs_version>.zip` to download the software. For example, to download version 0.21, set `windows_vdvs_path` equal to `https://vmware.bintray.com/vDVS/vsphere-storage-for-docker_windows` and `windows_vdvs_version` equal to `0.21` |
|windows_vdvs_version|group_vars/vars|Combined with `windows_vdvs_path`, this variable is used to generate the URL for downloading the software.|
|windows_vdvs_directory|group_vars/vars|Variable used to determine where vDVS software will be unzipped and installed from. The default is `C:\Users\Administrator\Downloads`|
|windows_winrm_script|group_vars/vars|Variable used to determine where the `winrm` Powershell script will be downloaded from. See the section `Deploying Windows workers behind a proxy` for more information.|
|docker_ee_version_windows|**group_vars/vars**|It is important that the version of the Docker engine running on your Windows worker nodes is the same as that running on RHEL in the rest of your cluster. You should use this variable to explicitly match up the versions. For Docker 2.1, the recommended value is `'18.09'`. If you do not explicitly set this value, you may end up with an incompatible newer version running on your Windows workers.|
|windows_update|group_vars/vars|Variable used to determine if Windows updates are automatically downloaded when installing Docker on Windows worker nodes (in the `playbooks/install_docker.yml`). Defaults to `true`. See the section `Deploying Windows workers behind a proxy` for more information.|

## group_vars/win_worker.yml

There is a separate file in the `group_vars` directory named `win_worker.yml` for advanced, Windows-specific configuration. These variables are used in the following playbooks:

-   playbooks/create_windows_vms.yml
-   playbooks/install_docker_window.yml
-   playbooks/scale_workers_win.yml

In general, it should not be necessary to modify this file, but the variables are documented in Table 16 for the sake of completeness.


**Table 16.** Advanced windows variables

|Variable|File|Description|
|:-------|:---|:----------|
|ansible_user|**group_vars/win_worker.yml**|Defaults to the Windows user account `win_username` as specified in `group_vars/vars` |
|ansible_password|**group_vars/win_worker.yml**|Defaults to the Windows user password `win_password` as specified in `group_vars/vault`|
|ansible_port|**group_vars/win_worker.yml**|5986|
|ansible_connection|**group_vars/win_worker.yml**|winrm|
|ansible_winrm_server_cert_validation|**group_vars/win_worker.yml**|Defaults to `ignore`|
|ansible_winrm_operation_timeout_sec|**group_vars/win_worker.yml**|Defaults to `250`|
|ansible_winrm_read_timeout_sec|**group_vars/win_worker.yml**|Defaults to `300`|
|windows_timezone|**group_vars/win_worker.yml**|Defaults to `15`|

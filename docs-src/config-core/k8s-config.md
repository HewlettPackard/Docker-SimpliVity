# Kubernetes configuration

The current playbooks support the deployment of UCP 3.1.\* which deploys Kubernetes version 1.11.\*. This version of the playbooks will not work with a version of UCP lower than version 3. If you wish to deploy using UCP 2.\*, you will need to download an earlier release of the playbooks, which are available on the GitHub site.

The preceding section explains how to assign a worker node to the Kubernetes orchestrator. This sections covers specific Kubernetes configuration, including how to set the pod CIDR and how to configure Kubernetes Persistent Volumes.

### Pod CIDR

The variable `k8s_pod_cidr` is specified in `group_vars/vars` and configures a custom range of IP addresses to be used by pods. The specific range you use should be dedicated to the cluster.

The default value is `192.168.0.0/16`. To set an alternative value, use the variable as shown in the example:

```
    k8s_pod_cidr: 192.168.128.0/17
```

## Kubernetes Persistent Volume configuration

Variables related to the configuration of Kubernetes Persistent Volumes are shown in the following table.

|Variable|File|Description|
|:-------|:---|:----------|
|nfs_provisioner_namespace|group_vars/vars|The Kubernetes namespace, for example, `nfsstorage`|
|nfs_provisioner_role|group_vars/vars|Name of the role to create, for example, `nfs-provisioner-runner`.|
|nfs_provisioner_serviceaccount|group_vars/vars|The Kubernetes service account name to use for RBAC purposes, for example, `nfs-provisioner`|
|nfs_provisioner_name|group_vars/vars|Name of the provisioner, for example, `hpe.com/nfs`|
|nfs_provisioner_storage_class_name|group_vars/vars|Name of the storage class to create, for example, `nfs`|
|nfs_provisioner_server_ip|group_vars/vars|IP address (or FQDN) of your external NFS server, for example, `hpe2-nfs.am2.cloudra.local`|
|nfs_provisioner_server_share|group_vars/vars|Name of the NFS share where all the persistent volume data will be stored, for example, `/k8s`|

### Related playbooks

-   `playbooks/k8s-nfs-provisioner.yml` is used to enable a dynamic NFS provisioner which can be used to automatically create and allocate Kubernetes persistent volumes. The backend storage is provided by an NFS backend. This playbook is run from the Ansible box after configuring `kubectl` and a UCP client bundle for the `admin` account. For more information on using this playbook, see the section `Deploying the NFS provisioner for Kubernetes`.

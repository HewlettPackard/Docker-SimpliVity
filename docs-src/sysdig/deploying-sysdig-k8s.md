# Deploying Sysdig monitoring on Kubernetes

## Prerequisites

-   Install the `kubectl` binary on your Ansible box
-   Install the UCP Client bundle for the `admin` user
-   Confirm that you can connect to the cluster by running a test command, for example, `kubectl get nodes`
-   Ensure that you have configured the required variables, as described in the section `Sysdig configuration for Kubernetes`. For example, you add the relevant variables in the `group_vars/vars` file.

```
    sysdig_collector: 'collector.sysdigcloud.com'
    sysdig_collector_port: '6666'
    sysdig_tags: 'location:Enter city,role:Enter role,owner:Customer name'
    k8s_cluster: 'ucp_hpe2-ucp.cloudra.local'
```

You should add the access key to the encrypted `group_vars/vault` using the command `ansible-vault edit group_vars/vault`.

```
sysdig_access_key: '10****97-9160-****-9061-84bfd0f****0'    
```


## Running the playbook

```
# cd Docker-SimpliVity
# ansible-playbook -i vm_hosts playbooks/sysdig-k8s-rbac.yml --vault-password-file .vault_pass
```

Using the Sysdig software as a solution (SaaS) website [https://app.sysdigcloud.com](https://app.sysdigcloud.com), you are able to view, analyze and inspect various different dashboards. Initially, you will just see the monitoring information for the infrastructure itself. Deploy a sample application, as detailed in the section `Kubernetes guestbook example with Redis`, and use the Sysdig solution to analyze the different facets of the deployed application.
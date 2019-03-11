# Redeploying Splunk demo

The Splunk demo deployment, whilst fully featured, is severely restricted in the amount of data it can process. Once this limit has been reached, often after running for just one or two days, it is necessary to re-deploy the application if you want to continue experimenting with the demo.

Before you redeploy, it is necessary to remove the corresponing Docker stack and delete the associated volumes.

```
# ssh hpe-ucp02

# docker stack rm splunk_demo
Removing service splunk_demo_splunkenterprise
Removing network splunk_demo_default

# docker volume ls | grep splunk
vsphere:latest      splunk_demo_vsplunk-opt-splunk-etc@Docker_GAB
vsphere:latest      splunk_demo_vsplunk-opt-splunk-var@Docker_GAB

# docker volume rm splunk_demo_vsplunk-opt-splunk-etc@Docker_GAB
splunk_demo_vsplunk-opt-splunk-etc@Docker_GAB

# docker volume rm splunk_demo_vsplunk-opt-splunk-var@Docker_GAB
splunk_demo_vsplunk-opt-splunk-var@Docker_GAB


```

Then re-run the playbook on your ansible node.

```
ansible-playbook -i vm_hosts playbooks/splunk_demo.yml --vault-password-file .vault_pass
```

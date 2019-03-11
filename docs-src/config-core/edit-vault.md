# Protecting sensitive information

A vault file is used to protect any sensitive variables that should not appear in clear text in your `group_vars/vars` file. The vault file will be encrypted and will require a password to be entered before it can be read or updated.

A sample vault file is provided named `group_vars/vault.sample` that you can use as a model for your own vault file. To create a vault, you create a new file called `group_vars/vault` and add entries similar to:

```
---
docker_ee_url: 'your_url_here'
vcenter_password: 'xxxx'
vm_password: 'xxxx'

simplivity_password: 'xxx'
ucp_password: 'zzzz'
win_password: 'yourpass'
sysdig_access_key: 'enter_sysdig_access_key'
rhn_orgid: "YourOrgId"
rhn_key: "YourActivationKey"
#password for the splunk universal forwarder. Must meet password complexity requirement (see splunk doc)
splunk_uf_password: 'YourPa$$word12'

```

`rhn_orgid` and `rhn_key` are the credentials needed to subscribe the virtual machines with Red Hat Customer Portal. For more information regarding activation keys, see the following URL: [https://access.redhat.com/articles/1378093](https://access.redhat.com/articles/1378093)

To encrypt the vault you need to run the following command:

```
# ansible-vault encrypt group_vars/vault
```

You will be prompted for a password that will decrypt the vault when required. You can update the values in your vault by running:

```
# ansible-vault edit group_vars/vault
```

In order for Ansible to be able to read the vault, you need to specify a file where the password is stored, for instance, in a file called `.vault_pass`. Once the file is created, take the following precautions to avoid illegitimate access to this file:

1.  Change the permissions so only `root` can read it using `# chmod 600 .vault_pass` 
2.  Add the file to your `.gitignore` file if you are using a Git repository to manage your playbooks.

When you use a vault, you must specify the password file every time on the command line, for example,

```
# ansible-playbook -i vm_hosts site.yml --vault-password-file .vault_pass
```
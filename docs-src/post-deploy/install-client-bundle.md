# Installing the client bundle


A convenience playbook is provided to install and apply the client bundle. To run the playbook:

```
# cd ~/Docker-SimpliVity
# ansible-playbook -i vm_hosts playbooks/install-client-bundle.yml --vault-password-file .vault_pass
```

The client bundle is downloaded to `~/certs.<<ucp_instance>>.<<ucp_username>>` where `ucp_instance` will 
be specific to the cluster you are running against, for example, `hpe2-ucp01` and the `ucp-username` is typically `admin`.

Test the configuration by again running the `kubectl version` command - this time, it should now report 
the server  version as well as the client version:

```
# kubectl version

Client Version: version.Info{Major:"1", Minor:"11", GitVersion:"v1.11.5", GitCommit:"753b2dbc622f5cc417845f0ff8a77f539a4213ea", GitTreeState:"clean", BuildDate:"2018-11-26T14:41:50Z", GoVersion:"go1.10.3", Compiler:"gc", Platform:"linux/amd64"}
Server Version: version.Info{Major:"1", Minor:"11+", GitVersion:"v1.11.5-docker-1", GitCommit:"d512ba512d0de40cd80258f480ff66bf71f2d8a4", GitTreeState:"clean", BuildDate:"2018-12-03T19:55:14Z", GoVersion:"go1.10.3", Compiler:"gc", Platform:"linux/amd64"}
```


More information on the client bundle is available at [https://docs.docker.com/ee/ucp/user-access/cli/\#download-client-certificates-by-using-the-rest-api](https://docs.docker.com/ee/ucp/user-access/cli/#download-client-certificates-by-using-the-rest-api)

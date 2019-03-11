# Installing kubectl


A convenience playbook is provided to make it easy to install `kubectl`. This playbook uses variables in `group_vars/vars` to determine which version to download. The default version specified by the variable `kubectl_version` in the sample variables file is `1.11.5`. 


To run the playbook:

```
# cd ~/Docker-SimpliVity
# ansible-playbook -i vm_hosts playbooks/install-kubectl.yml --vault-password-file .vault_pass
```


Test the installation by running the `kubectl version` command:

```
# kubectl version

Client Version: version.Info{Major:"1", Minor:"11", GitVersion:"v1.11.5", GitCommit:"753b2dbc622f5cc417845f0ff8a77f539a4213ea", GitTreeState:"clean", BuildDate:"2018-11-26T14:41:50Z", GoVersion:"go1.10.3", Compiler:"gc", Platform:"linux/amd64"}
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```

The client version is reported correctly. However, `kubectl` cannot connect to the server until you set up 
a client bundle - this is described in the section titled `Installing the client bundle`.


## Manually installing kubectl


You can find the version number for the current stable version of `kubectl` at [https://kubernetes.io/docs/tasks/tools/install-kubectl/](https://kubernetes.io/docs/tasks/tools/install-kubectl/). At the time of writing, the stable version is `1.13`.

The following is an example of manually downloading and installing a specific version of `kubectl`.

```
# version=v1.10.4
# wget -O kubectl https://storage.googleapis.com/kubernetes-release/release/${version}/bin/linux/amd64/kubectl
# chmod +x ./kubectl
# sudo mv ./kubectl /usr/local/bin/kubectl

# kubectl version
Client Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.4", GitCommit:"5ca598b4ba5abb89bb773071ce452e33fb66339d", GitTreeState:"clean", BuildDate:"2018-06-06T08:13:03Z", GoVersion:"go1.9.3", Compiler:"gc", Platform:"linux/amd64"}
```

More details on installing `kubectl` are available at [https://kubernetes.io/docs/tasks/tools/install-kubectl/](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 
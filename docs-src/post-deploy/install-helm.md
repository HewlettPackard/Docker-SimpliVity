# Installing Helm


## Prerequisites

-   Install the `kubectl` binary on your Ansible box
-   Install the UCP Client bundle for the `admin` user
-   Confirm that you can connect to the cluster by running a test command, for example, `kubectl get nodes`


## Playbook

To run the playbook on your Ansible controller:

```
# cd ~/Docker-SimpliVity
# ansible-playbook -i vm_hosts playbooks/install_helm.yml --vault-password-file .vault_pass
```

The playbook relies on the variable helm_version to determine the version of Helm to download. The playbooks have been tested using version `2.12.3`. 
You must also specify the appropriate checksum for the download in the variable `helm_checksum`. 
This value can be obtained from the downloads page at https://github.com/helm/helm/releases. 
The `vars.sample` file that ships with this release contains the following values:

```
helm_version: "2.12.3"
helm_checksum: "sha256:3425a1b37954dabdf2ba37d5d8a0bd24a225bb8454a06f12b115c55907809107"
```

## Install sample charts

A number of sample charts are delivered with the solution, for the purposes of demonstration.

### Alpine

A simple chart is provided in the `~/Docker-SimpliVity/test/files/helm/alpine` directory to run a single pod of Alpine Linux.

The `templates/` directory contains a very simple pod resource with a couple of parameters. The `values.yaml` file contains the default values for the `alpine-pod.yaml` template.

```
# cd ~/Docker-SimpliVity
# helm install test/files/helm/alpine
```

The output shows that a single pod was deployed.

```
NAME:   old-mole
LAST DEPLOYED: Fri Feb  8 17:27:35 2019
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1/Pod
NAME             READY  STATUS   RESTARTS  AGE
old-mole-alpine  1/1    Running  0         0s
```


### Nginx

An example chart is provided in the `~/Docker-SimpliVity/test/files/helm/nginx` directory to install a simple nginx server according to the following pattern:

- A ConfigMap is used to store the files the server will serve. (`templates/configmap.yaml`)
- A Deployment is used to create a Replica Set of nginx pods. (`templates/deployment.yaml`)
- A Service is used to create a gateway to the pods running in the replica set (`templates/service.yaml`)

The `values.yaml` exposes a few of the configuration options in the charts.

```
# cd ~/Docker-SimpliVity
# helm install test/files/helm/nginx
```

The output shows a service being created with a NodePort at `34567`. This value comes from the `values.yml` file in the folder.


```
NAME:   worn-olm
LAST DEPLOYED: Fri Feb  8 16:23:21 2019
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1/Deployment
NAME            DESIRED  CURRENT  UP-TO-DATE  AVAILABLE  AGE
worn-olm-nginx  1        1        1           1          14s

==> v1/Pod(related)
NAME                             READY  STATUS     RESTARTS  AGE
worn-olm-nginx-7d648f7dfb-gg2jk  1/1    Running    0         14s
worn-olm-nginx-vhwc7             0/1    Completed  0         14s

==> v1/ConfigMap
NAME            DATA  AGE
worn-olm-nginx  2     14s

==> v1/Service
NAME            TYPE      CLUSTER-IP    EXTERNAL-IP  PORT(S)       AGE
worn-olm-nginx  NodePort  10.96.30.222  <none>       80:34567/TCP  14s
```


Helm also allows you to easily delete installed releases. List the installed releases to find the name of the release you wish to delete.

```
# helm list
NAME            REVISION        UPDATED                         STATUS          CHART           APP VERSION     NAMESPACE
worn-olm        1               Fri Feb  8 16:23:21 2019        DEPLOYED        nginx-0.1.0                     default
```

Use the `helm delete` command to remove the named release.

```
# helm delete worn-olm
release "worn-olm" deleted
```

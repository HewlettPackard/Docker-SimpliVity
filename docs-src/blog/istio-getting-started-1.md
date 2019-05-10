---
title: Getting started with Istio Service Mesh - Part 1
date: 2019-05-01
description: Istio Service Mesh - Part 1 Deploying Istio
---


# Getting started with Istio Service Mesh - Part 1 Deploying Istio


## Introduction to service meshes

A Microservice Architecture breaks up the monolith into many smaller pieces that are composed together. Patterns to secure the communication between services like fault tolerance (via timeout, retry, circuit breaking, etc.) have been developed. A service mesh can now provide these services on a platform level and frees the application writers from those tasks. Routing decisions are done at the mesh level. Distributed tracing is used to see where calls are going in the microservice topology.



## Prerequisites

-   Install the `kubectl` binary on your Ansible box
-   Download the UCP Client bundle for the `admin` user. Ensure that you have configured the bundle in your terminal.
    ```
    # cd ~/certs.hpe-ucp01.admin/
    # eval "$(<env.sh)"
    Cluster "ucp_hpe-ucp01.cloudra.local:6443_admin" set.
    User "ucp_hpe-ucp01.cloudra.local:6443_admin" set.
    Context "ucp_hpe-ucp01.cloudra.local:6443_admin" modified.
    ```
-   Confirm that you can connect to the cluster by running a test command, for example, `kubectl get nodes`


## Installing Istio

Download the installation file from the GitHub site and set up your `PATH` variable:

```
cd ~
curl -L https://git.io/getLatestIstio | ISTIO_VERSION=1.1.5 sh -
export PATH="$PATH:/root/istio-1.1.5/bin"
```

Check that `istioctl` is available:
```
# which istioctl

/root/istio-1.1.5/bin/istioctl

# istioctl version

version.BuildInfo{Version:"1.1.5", GitRevision:"9b6d31b74d1c0cc9358cc82d395b53f71393326b", User:"root", Host:"3e29fde4-6c3f-11e9-b00d-0a580a2c0205", GolangVersion:"go1.10.4", DockerHub:"docker.io/istio", BuildStatus:"Clean", GitTag:"1.1.4-10-g9b6d31b"}
```



Install all the Istio Custom Resource Definitions (CRDs) using `kubectl apply`, and wait a few seconds for the CRDs to be committed in the Kubernetes API-server:

```
cd ~/istio-1.1.5
for i in install/kubernetes/helm/istio-init/files/crd*yaml; do kubectl apply -f $i; done
```



Enforce mutual TLS authentication between all clients and servers.  This variant should only be used on a 
fresh Kubernetes cluster where all workloads will be Istio-enabled. All newly deployed workloads will have Istio 
sidecars installed. (If installing on an existing cluster, use the playbook `install/kubernetes/istio-demo.yaml` 
the permissive mutual TLS mode, where all services accept both plain text and mutual TLS traffic)


```
kubectl apply -f install/kubernetes/istio-demo-auth.yaml
```

You will probably see the error:

```
The Service "istio-ingressgateway" is invalid: spec.ports[0].nodePort: Invalid value: 31380: provided port is not in the valid range. The range of valid ports is 32768-35535
```

You need to modify a number of ports used so that they are in the valid range:

```
find ./ -type f -exec sed -i 's/31380/33380/g' {} \;
find ./ -type f -exec sed -i 's/31390/33390/g' {} \;
find ./ -type f -exec sed -i 's/31400/33400/g' {} \;
```

Re-apply, using the modified file:

```
kubectl apply -f install/kubernetes/istio-demo-auth.yaml
```

Use `kubectl get pods` and wait until all the required pods are running:

```
# kubectl get pods -n istio-system
NAME                                      READY     STATUS      RESTARTS   AGE
grafana-7d46986779-8nbqv                  1/1       Running     0          12m
istio-citadel-7476b85687-5kfcl            1/1       Running     0          12m
istio-cleanup-secrets-m9rbp               0/1       Completed   0          13m
istio-egressgateway-7b6b576cfc-x8mkv      1/1       Running     0          12m
istio-galley-5d5f7f896b-5xpv4             1/1       Running     0          12m
istio-grafana-post-install-6b4bf          0/1       Completed   3          13m
istio-ingressgateway-7df9bdbf56-g6mtp     1/1       Running     0          12m
istio-pilot-5dc49bbdc6-gb4sl              2/2       Running     0          12m
istio-policy-85f58fb8b6-rgxgw             2/2       Running     0          12m
istio-security-post-install-v72lm         0/1       Completed   2          13m
istio-sidecar-injector-7d6d989cc8-jz7z5   1/1       Running     0          12m
istio-telemetry-85fd5c7d97-crdbm          2/2       Running     1          12m
istio-tracing-7bc6d6476b-h47v5            1/1       Running     0          12m
prometheus-77bbf67664-gnv68               1/1       Running     0          12m
servicegraph-664d5975cf-dkmkt             1/1       Running     0          12m
```




## Set up NodePort for each service

Use `kubectl get svc` to inspect the services:

```
# kubectl get svc -n istio-system
NAME                     TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S) 
grafana                  ClusterIP      10.96.183.82    <none>        3000/TCP 
istio-citadel            ClusterIP      10.96.7.153     <none>        8060/TCP,15014/TCP
istio-egressgateway      ClusterIP      10.96.12.233    <none>        80/TCP,443/TCP,15443/TCP 
istio-galley             ClusterIP      10.96.27.192    <none>        443/TCP,15014/TCP,9901/TCP
istio-ingressgateway     LoadBalancer   10.96.26.105    <pending>     15020:33459/TCP,80:33380/TCP,443:33390/TCP,33400:33400/TCP,15029:35354/TCP,15030:35380/TCP,15031:35113/TCP,15032:34307/TCP,15443:33202/TCP
istio-pilot              ClusterIP      10.96.179.134   <none>        15010/TCP,15011/TCP,8080/TCP,15014/TCP
istio-policy             ClusterIP      10.96.105.251   <none>        9091/TCP,15004/TCP,15014/TCP          
istio-sidecar-injector   ClusterIP      10.96.15.99     <none>        443/TCP           
istio-telemetry          ClusterIP      10.96.136.207   <none>        9091/TCP,15004/TCP,15014/TCP,42422/TCP
jaeger-agent             ClusterIP      None            <none>        5775/UDP,6831/UDP,6832/UDP
jaeger-collector         ClusterIP      10.96.2.225     <none>        14267/TCP,14268/TCP      
jaeger-query             ClusterIP      10.96.15.223    <none>        16686/TCP         
kiali                    ClusterIP      10.96.28.157    <none>        20001/TCP         
prometheus               ClusterIP      10.96.145.238   <none>        9090/TCP          
tracing                  ClusterIP      10.96.119.30    <none>        80/TCP            
zipkin                   ClusterIP      10.96.245.224   <none>        9411/TCP          
```

You can set up NodePorts to make it easier to access some of the services such as Prometheus (on port 33090), Grafana (33030), Jaeger (33086) and Kiali (33001):

```
kubectl -n istio-system patch svc prometheus   --type='json' -p '[{"op":"replace","path":"/spec/type","value":"NodePort"}]'
kubectl -n istio-system patch svc prometheus   --type='json' -p '[{"op": "add", "path":"/spec/ports/0/nodePort", "value":33090}]'
kubectl -n istio-system patch svc grafana --type='json' -p '[{"op":"replace","path":"/spec/type","value":"NodePort"}]'
kubectl -n istio-system patch svc grafana --type='json' -p '[{"op": "add", "path":"/spec/ports/0/nodePort", "value":33030}]'
kubectl -n istio-system patch svc jaeger-query --type='json' -p '[{"op":"replace","path":"/spec/type","value":"NodePort"}]'
kubectl -n istio-system patch svc jaeger-query --type='json' -p '[{"op": "add", "path":"/spec/ports/0/nodePort", "value":33086}]'
kubectl -n istio-system patch svc kiali --type='json' -p '[{"op":"replace","path":"/spec/type","value":"NodePort"}]'
kubectl -n istio-system patch svc kiali --type='json' -p '[{"op": "add", "path":"/spec/ports/0/nodePort", "value":33001}]'
```


## Admission registration

Verify that Kubernetes api-server supports admission registration:
```
# kubectl api-versions | grep admissionregistration

admissionregistration.k8s.io/v1alpha1
admissionregistration.k8s.io/v1beta1
```

Verify sidecar injector deployment: 

```
# kubectl -n istio-system get deployment -l istio=sidecar-injector

NAME                     DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
istio-sidecar-injector   1         1         1            1           22m
```


Label the default namespace for automatic sidecar injection:

```
# kubectl label namespace default istio-injection=enabled

namespace/default labeled
```

Check that the label has been applied for the default namespace:
```
# kubectl get namespace -L istio-injection

NAME           STATUS    AGE       ISTIO-INJECTION
default        Active    2d        enabled
istio-system   Active    22m       disabled
kube-public    Active    2d
kube-system    Active    2d
```

Now you are ready to install the reference BookInfo application for Istio.




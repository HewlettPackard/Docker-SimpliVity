---
title: Getting started with knative serving
date: 2019-03-07
description: An example of running a "serverless" app
---


# Getting started with knative

This post is based on [https://github.com/knative/docs/blob/master/install/getting-started-knative-app.md](https://github.com/knative/docs/blob/master/install/getting-started-knative-app.md)

This post uses the Hello World sample app in Go to demonstrate the basic workflow for deploying an app.



# Install knative
Following the instructions at [https://github.com/knative/docs/blob/master/install/Knative-with-any-k8s.md](https://github.com/knative/docs/blob/master/install/Knative-with-any-k8s.md)


## Install Istio

Try to install Istio using the following command:

```
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.4.0/istio-crds.yaml && \
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.4.0/istio.yaml
```

You will probably see the error:

```
The Service "istio-ingressgateway" is invalid: spec.ports[0].nodePort: Invalid value: 31380: provided port is not in the valid range. The range of valid ports is 32768-35535
```

You need to download the [https://github.com/knative/serving/releases/download/v0.4.0/istio-crds.yaml](https://github.com/knative/serving/releases/download/v0.4.0/istio-crds.yaml) file locally and modify the ports used, to fall within this range:

Change the `nodePort` values from 31380, 31390, 31400 to  33380, 33390, 33400:

```
...
apiVersion: v1
kind: Service
metadata:
  name: istio-ingressgateway
  namespace: istio-system
  annotations:
  labels:
    chart: gateways-1.0.1
    release: RELEASE-NAME
    heritage: Tiller
    app: istio-ingressgateway
    istio: ingressgateway
spec:
  type: LoadBalancer
  selector:
    app: istio-ingressgateway
    istio: ingressgateway
  ports:
    -
      name: http2
      nodePort: 31380
      port: 80
      targetPort: 80
    -
      name: https
      nodePort: 31390
      port: 443
    -
      name: tcp
      nodePort: 31400
      port: 31400
....
``` 

to:

```
...
apiVersion: v1
kind: Service
metadata:
  name: istio-ingressgateway
  namespace: istio-system
  annotations:
  labels:
    chart: gateways-1.0.1
    release: RELEASE-NAME
    heritage: Tiller
    app: istio-ingressgateway
    istio: ingressgateway
spec:
  type: LoadBalancer
  selector:
    app: istio-ingressgateway
    istio: ingressgateway
  ports:
    -
      name: http2
      nodePort: 33380
      port: 80
      targetPort: 80
    -
      name: https
      nodePort: 33390
      port: 443
    -
      name: tcp
      nodePort: 33400
      port: 31400
...
```


Re-apply, using the modified local file:

```
kubectl apply --filename istio.yaml
```

Label the default namespace with `istio-injection=enabled`:

```
# kubectl label namespace default istio-injection=enabled
```

Monitor the Istio components until all of the components show a STATUS of Running or Completed:

```
# kubectl get pods --namespace istio-system
```

## Install knative and dependencies

```
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.4.0/serving.yaml \
--filename https://github.com/knative/build/releases/download/v0.4.0/build.yaml \
--filename https://github.com/knative/eventing/releases/download/v0.4.0/release.yaml \
--filename https://github.com/knative/eventing-sources/releases/download/v0.4.0/release.yaml \
--filename https://github.com/knative/serving/releases/download/v0.4.0/monitoring.yaml \
--filename https://raw.githubusercontent.com/knative/serving/v0.4.0/third_party/config/build/clusterrole.yaml
```


If you see an error such as:

```
unable to recognize "https://github.com/knative/eventing/releases/download/v0.4.0/release.yaml": no matches for kind "ClusterChannelProvisioner" in version "eventing.knative.dev/v1alpha1"
unable to recognize "https://github.com/knative/eventing/releases/download/v0.4.0/release.yaml": no matches for kind "ClusterChannelProvisioner" in version "eventing.knative.dev/v1alpha1"
```

you may be hitting a known issue:

```
https://github.com/knative/eventing/issues/680

It fails the first time because the `ClusterChannelProvisioner` CRD hasn't been fully reconciled yet when the in-memory-channel provisioner is created. The second time usually succeeds (because the CRD has been reconciled by then).
```

Simply re-run the command a second time to re-apply the same files. 

Monitor the Knative components until all of the components show a STATUS of Running:

```
kubectl get pods --namespace knative-serving
kubectl get pods --namespace knative-build
kubectl get pods --namespace knative-eventing
kubectl get pods --namespace knative-sources
kubectl get pods --namespace knative-monitoring
```


# Deploying your serverless app

To deploy an app using Knative, you need a configuration .yaml file that defines a Service. 

This configuration file specifies metadata about the application, points to the hosted image of the app for deployment, and allows the deployment to be configured.


Create a new file named `service.yaml` with the following content:

```
# cat service.yaml

apiVersion: serving.knative.dev/v1alpha1 # Current version of Knative
kind: Service
metadata:
  name: helloworld-go # The name of the app
  namespace: default # The namespace the app will use
spec:
  runLatest:
    configuration:
      revisionTemplate:
        spec:
          container:
            image: gcr.io/knative-samples/helloworld-go # The URL to the image of the app
            env:
              - name: TARGET # The environment variable printed out by the sample app
                value: "Go Sample v1"
```

From the directory where the new `service.yaml` file was created, apply the configuration:

```
# kubectl apply --filename service.yaml

service.serving.knative.dev/helloworld-go created
```

Now that your service is created, Knative will perform the following steps:

- Create a new immutable revision for this version of the app.
- Perform network programming to create a route, ingress, service, and load balancer for your app.
- Automatically scale your pods up and down based on traffic, including to zero active pods.

# Interacting with your app

To see if your app has been deployed succesfully, you need the host URL and IP address created by Knative.

Use `kubectl get svc` to see the details of the service:

```
[root@hpe-ansible knative]# kubectl get svc istio-ingressgateway --namespace istio-system
NAME                   TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)                                                                                                                   AGE
istio-ingressgateway   LoadBalancer   10.96.72.109   <pending>     80:33380/TCP,443:33390/TCP,31400:33400/TCP,15011:33994/TCP,8060:34944/TCP,853:35094/TCP,15030:33326/TCP,15031:34179/TCP   1h
```

Patch the type to be `NodePort`:

```
# kubectl -n istio-system patch svc istio-ingressgateway --type='json' -p '[{"op":"replace","path":"/spec/type","value":"NodePort"}]'

service/istio-ingressgateway patched
```

And patch the port to be, for example, `33333`:

```
# kubectl -n istio-system patch svc istio-ingressgateway --type='json' -p '[{"op": "add", "path":"/spec/ports/0/nodePort", "value":33333}]'

service/istio-ingressgateway patched
```

Check that the changes to the service have been made:

```
# kubectl get svc istio-ingressgateway --namespace istio-system -o yaml
```



# Test service

To find the host URL for your service, enter:

```
# kubectl get ksvc helloworld-go  --output=custom-columns=NAME:.metadata.name,DOMAIN:.status.domain

NAME                DOMAIN
helloworld-go       helloworld-go.default.example.com
```



Simply use `curl` to test the service, specifing the appropriate port and domain:

```
# curl -vH "Host: helloworld-go.default.example.com" http://hpe2-ucp01.am2.cloudra.local:33333

Hello Go Sample v1!
```


# Teardown

To remove the sample app from your cluster, delete the service record:

```
# kubectl delete --filename service.yaml
```




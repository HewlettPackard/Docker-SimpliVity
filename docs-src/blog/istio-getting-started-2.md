---
title: Getting started with Istio Service Mesh - Part 2 Deploying the Bookinfo application
date: 2019-05-02
description: Istio Service Mesh - Part 2 Deploying the Bookinfo application
---



# Deploying the Bookinfo application

The standard reference application for getting started with Istio is documented at [https://istio.io/docs/examples/bookinfo/](https://istio.io/docs/examples/bookinfo/).

The example deploys a sample application composed of four separate microservices used to demonstrate various Istio features. The application displays information about a book, similar to a single catalog entry of an online book store. Displayed on the page is a description of the book, book details (ISBN, number of pages, and so on), and a few book reviews.

The Bookinfo application is broken into four separate microservices:

- **productpage:** The productpage microservice calls the details and reviews microservices to populate the page.
- **details:** The details microservice contains book information.
- **reviews:** The reviews microservice contains book reviews. It also calls the ratings microservice.
- **ratings:** The ratings microservice contains book ranking information that accompanies a book review.

There are 3 versions of the reviews microservice:

- Version `v1` doesn’t call the ratings service.
- Version `v2` calls the ratings service, and displays each rating as 1 to 5 black stars.
- Version `v3` calls the ratings service, and displays each rating as 1 to 5 red stars.

The end-to-end architecture of the application is shown below.

![ "Bookinfo application"][media-bookinfo-png]

**Figure.** Bookinfo application


Apply the Bookinfo yaml file:

```
# cd ~/istio-tutorial
# kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml

service/details created
deployment.extensions/details-v1 created
service/ratings created
deployment.extensions/ratings-v1 created
service/reviews created
deployment.extensions/reviews-v1 created
deployment.extensions/reviews-v2 created
deployment.extensions/reviews-v3 created
service/productpage created
deployment.extensions/productpage-v1 created
```


View the resources deployed:

```
# kubectl get deployment

NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
details-v1       1         1         1            1           1m
productpage-v1   1         1         1            0           59s
ratings-v1       1         1         1            0           1m
reviews-v1       1         1         1            0           1m
reviews-v2       1         1         1            0           1m
reviews-v3       1         1         1            0           59s


# kubectl get svc

NAME          TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
details       ClusterIP   10.96.238.55   <none>        9080/TCP   1m
kubernetes    ClusterIP   10.96.0.1      <none>        443/TCP    2d
productpage   ClusterIP   10.96.239.77   <none>        9080/TCP   1m
ratings       ClusterIP   10.96.171.64   <none>        9080/TCP   1m
reviews       ClusterIP   10.96.161.13   <none>        9080/TCP   1m

Wait for all the pods to have a status of `running`:

# kubectl get pods
NAME                              READY     STATUS    RESTARTS   AGE
details-v1-67566c8cd-9v7xq        2/2       Running   0          9m
productpage-v1-549ccbd868-n4v9d   2/2       Running   0          9m
ratings-v1-69554c6fd6-b75pz       2/2       Running   0          9m
reviews-v1-7df8c546cc-hn9dr       2/2       Running   0          9m
reviews-v2-69cbd88965-bcljd       2/2       Running   0          9m
reviews-v3-645cb56f49-clk8c       2/2       Running   0          9m

```



View the details for the `productpage` pod and note that there are two containers in the pod - the `productpage` itself and the `istio-proxy` side-car:
```
# kubectl describe pod productpage-v1-549ccbd868-n4v9d

Name:               productpage-v1-549ccbd868-n4v9d
Namespace:          default
Priority:           0
PriorityClassName:  <none>
Node:               hpe-worker02.am2.cloudra.local/10.15.140.242
Start Time:         Wed, 08 May 2019 12:50:22 +0000
Labels:             app=productpage
                    pod-template-hash=1057768424
                    version=v1
...
Containers:
  productpage:
    Container ID:   docker://e1de7bb5b816d54db8e92a0542e07989950466856570681bc60f362b956067a2
    Image:          istio/examples-bookinfo-productpage-v1:1.10.1
    Image ID:       docker-pullable://istio/examples-bookinfo-productpage-v1@sha256:a427e10277a814b27c066d9ea5f2605b656fc1948714ed09e55c97342c5a721d
    Port:           9080/TCP
...
   istio-proxy:
    Container ID:  docker://f9960295d0f6ef967e1f7c037af4bfa22c5111a05ed85fdff0e1e2645857b9c2
    Image:         docker.io/istio/proxyv2:1.1.5
    Image ID:      docker-pullable://istio/proxyv2@sha256:1f00a1bfd3f5b9cd8d3088fa254ec8cd95c72711d77999e4da656e4b36a78931
    Port:          15090/TCP
...
```

To confirm that the Bookinfo application is running, send a request to it using a `curl` command from a container
in some pod, for example from the `ratings` container in the `ratings` pod:

```
# kubectl exec -it $(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}') -c ratings -- curl productpage:9080/productpage | grep -o "<title>.*</title>"

<title>Simple Bookstore App</title>
```



# Expose Bookinfo application through Istio Ingress Gateway

## Inspect the Ingress Gateway
The ingress gateway is deployed as a normal LoadBalancer:
```
# kubectl get svc istio-ingressgateway -n istio-system -o yaml

apiVersion: v1
kind: Service
...
spec:
  clusterIP: 10.96.109.164
  externalTrafficPolicy: Cluster
  ports:
  - name: status-port
    nodePort: 33976
    port: 15020
    protocol: TCP
    targetPort: 15020
  - name: http2
    nodePort: 33380
    port: 80
    protocol: TCP
    targetPort: 80
  - name: https
    nodePort: 33390
    port: 443
    protocol: TCP
    targetPort: 443
  - name: tcp
    nodePort: 33400
    port: 33400
    protocol: TCP
    targetPort: 33400
  - name: https-kiali
    nodePort: 33405
    port: 15029
    protocol: TCP
    targetPort: 15029
  - name: https-prometheus
    nodePort: 34030
    port: 15030
    protocol: TCP
    targetPort: 15030
  - name: https-grafana
    nodePort: 33224
    port: 15031
    protocol: TCP
    targetPort: 15031
  - name: https-tracing
    nodePort: 34847
    port: 15032
    protocol: TCP
    targetPort: 15032
  - name: tls
    nodePort: 34091
    port: 15443
    protocol: TCP
    targetPort: 15443
  selector:
    app: istio-ingressgateway
    istio: ingressgateway
    release: istio
  sessionAffinity: None
  type: LoadBalancer
status:
  loadBalancer: {}
...
```

To view the logs, identify the `ingressgateway` pod: 

```
# kubectl get pods -n istio-system

NAME                                      READY     STATUS      RESTARTS   AGE
grafana-65fd5ddc8b-pwp6z                  1/1       Running     0          22h
istio-citadel-76d9fcfb85-z5rwn            1/1       Running     0          22h
istio-cleanup-secrets-1.1.5-wtbwd         0/1       Completed   0          22h
istio-egressgateway-7675bcf567-rhg6t      1/1       Running     0          22h
istio-galley-55c748f9df-rcf8r             1/1       Running     0          22h
istio-grafana-post-install-1.1.5-kckln    0/1       Completed   0          22h
istio-ingressgateway-65f97ff4b6-mscrg     1/1       Running     0          22h
istio-pilot-54dcd4d8d-lvf9x               2/2       Running     0          22h
...

Use `kubectl logs` for the relevant pod:

# kubectl -n istio-system logs istio-ingressgateway-65f97ff4b6-mscrg

2019-05-08T12:25:21.207858Z     info    FLAG: --applicationPorts="[]"
2019-05-08T12:25:21.207905Z     info    FLAG: --binaryPath="/usr/local/bin/envoy"
2019-05-08T12:25:21.207909Z     info    FLAG: --concurrency="0"
2019-05-08T12:25:21.207912Z     info    FLAG: --configPath="/etc/istio/proxy"
2019-05-08T12:25:21.207916Z     info    FLAG: --connectTimeout="10s"
2019-05-08T12:25:21.207919Z     info    FLAG: --controlPlaneAuthPolicy="MUTUAL_TLS"
2019-05-08T12:25:21.207923Z     info    FLAG: --controlPlaneBootstrap="true"
2019-05-08T12:25:21.207928Z     info    FLAG: --customConfigFile=""
...
[2019-05-08T13:07:35.186Z] "GET /productpage HTTP/1.1" 200 - "-" 0 4415 497 497 "192.168.70.64" "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36" "8ded16c5-36b1-9590-84e0-21557cd605c1" "hpe-ucp01.am2.cloudra.local:33380" "192.168.70.5:9080" outbound|9080||productpage.default.svc.cluster.local - 192.168.70.75:80 192.168.70.64:51443 -
...

```

## Configure the Ingress Gateway for the Bookinfo application

Now that the Bookinfo services are up and running, you need to make the application accessible from outside of your Kubernetes cluster, e.g., from a browser. An Istio Gateway is used for this purpose.

```
# kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml

gateway.networking.istio.io/bookinfo-gateway created
virtualservice.networking.istio.io/bookinfo created
```



## View the Bookinfo application

View the service details to determine the port where the application is available (here, port 80 is mapped to 33380)
```
# kubectl get service istio-ingressgateway -n istio-system

NAME                   TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)
istio-ingressgateway   LoadBalancer   10.96.109.164   <pending>     15020:33976/TCP,80:33380/TCP,443:33390/TCP,33400:33400/TCP,15029:33405/TCP,15030:34030/TCP,15031:33224/TCP,15032:34847/TCP,15443:34091/TCP
```

View the `productpage` route using the port on any node in your cluster. In this instance, 
accessing `http://hpe-ucp01.cloudra.local:33380/productpage`  displays version 1 of the reviews (no stars): 

![ "Product page - first time"][media-productpage1st-png]

**Figure.** Product page - first time


Refresh the browser - in this instance, we see version 3 of the review (red stars):

![ "Product page - second time"][media-productpage2nd-png]

**Figure.** Product page - second time


Refresh the browser again - now we see version 2 of the reviews (black stars):

![ "Product page - third time"][media-productpage3rd-png]

**Figure.** Product page - third time



# Apply default destination rules
Before you can use Istio to control the Bookinfo version routing, you need to define the available versions, called subsets, in destination rules. Because we enforced mutual TLS authentication between all clients and 
servers when setting up the demo (using the file `install/kubernetes/istio-demo-auth.yaml`), you need to use
the corresponding version of the destination rules file `destination-rule-all-mtls.yaml`. If you did not enforce 
mutual TLS, then use the file `destination-rule-all.yaml`.

```
# kubectl apply -f samples/bookinfo/networking/destination-rule-all-mtls.yaml
```

This file sets up default routing rules for all the services in the application, for example, `productpage`:

```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: productpage
spec:
  host: productpage
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
  subsets:
  - name: v1
    labels:
      version: v1
```

You can see the results of applying the rules with the following commands:

```
# kubectl get destinationrules

# kubectl get destinationrules -o yaml
```

You are now ready to start configuring routing requests.


[media-bookinfo-png]:<./media/bookinfo.png> "Figure: Bookinfo application"
[media-productpage1st-png]:<./media/productpage1st.png> "Figure: Product page - first time"
[media-productpage2nd-png]:<./media/productpage2nd.png> "Figure: Product page - second time"
[media-productpage3rd-png]:<./media/productpage3rd.png> "Figure: Product page - third time"

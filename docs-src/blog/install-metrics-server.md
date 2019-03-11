---
title: Installing metrics-server
date: 2019-02-28
description: Install metrics-server, a prerequisite for Horizontal Pod Autoscaling
---

# Installing metrics-server

If `metrics-server` is not installed, you will see an error when you try to run  `kubectl top`.

```
# kubectl top pods
Error from server (NotFound): the server could not find the requested resource (get services http:heapster:)
```

Alternatively, run `kubectl get pods,svc,deployments -n kube-system | grep metrics-server` to see if `metrics-server` is present.

## Prerequisites

-   Install the `kubectl` binary on your Ansible box
-   Install the UCP Client bundle for the `admin` user
-   Confirm that you can connect to the cluster by running a test command, for example, `kubectl get nodes`




## Download and install `metrics-server`

Download the project from GitHub:

```
# git clone https://github.com/kubernetes-incubator/metrics-server
# cd metrics-server
```

Apply all the appropriate `yaml` files to deploy `metrics-server`:

```
# kubectl apply -f deploy/1.8+/

clusterrole.rbac.authorization.k8s.io/system:aggregated-metrics-reader created
clusterrolebinding.rbac.authorization.k8s.io/metrics-server:system:auth-delegator created
rolebinding.rbac.authorization.k8s.io/metrics-server-auth-reader created
apiservice.apiregistration.k8s.io/v1beta1.metrics.k8s.io created
serviceaccount/metrics-server created
deployment.extensions/metrics-server created
service/metrics-server created
clusterrole.rbac.authorization.k8s.io/system:metrics-server created
clusterrolebinding.rbac.authorization.k8s.io/system:metrics-server created
```

Now, when you run `kubectl get pods,svc,deployments -n kube-system`, you should see the deployment, pod and service:

```
NAME                                           READY     STATUS    RESTARTS   AGE
pod/metrics-server-559d9f45f-tg7l6             1/1       Running   0          34s

NAME                     TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)         AGE
service/metrics-server   ClusterIP   10.96.181.69    <none>        443/TCP         34s

NAME                                            DESIRED   CURRENT   UP-TO-DATE   AVAILABLE 
deployment.extensions/metrics-server            1         1         1            1         
```

You can look at the pod logs to ensure that it installed correctly:

```
# kubectl logs pod/metrics-server-559d9f45f-tg7l6 -n kube-system

I0227 13:50:34.034542       1 serving.go:273] Generated self-signed cert (apiserver.local.config/certificates/apiserver.crt, apiserver.local.config/certificates/apiserver.key)
[restful] 2019/02/27 13:50:34 log.go:33: [restful/swagger] listing is available at https://:443/swaggerapi
[restful] 2019/02/27 13:50:34 log.go:33: [restful/swagger] https://:443/swaggerui/ is mapped to folder /swagger-ui/
I0227 13:50:34.556081       1 serve.go:96] Serving securely on [::]:443
```

## Use metrics-server via `kubectl top`

Now, when you run `kubectl top`, you should see metrics reported:

```
[root@hpe-ansible metrics-server]# kubectl top nodes
NAME                              CPU(cores)   CPU%      MEMORY(bytes)   MEMORY%
hpe2-dtr01.am2.cloudra.local      134m         6%        2201Mi          14%
hpe2-dtr02.am2.cloudra.local      106m         5%        2115Mi          13%
hpe2-dtr03.am2.cloudra.local      106m         5%        2154Mi          13%
hpe2-ucp01.am2.cloudra.local      586m         15%       4620Mi          33%
hpe2-ucp02.am2.cloudra.local      525m         14%       4884Mi          35%
hpe2-ucp03.am2.cloudra.local      743m         19%       7321Mi          53%
hpe2-worker01.am2.cloudra.local   360m         9%        4857Mi          7%
hpe2-worker02.am2.cloudra.local   143m         3%        2295Mi          3%
hpe2-worker03.am2.cloudra.local   105m         2%        1362Mi          2%
```

---
title: Horizontal pod autoscaling walkthrough
date: 2019-03-01
description: An example of scaling pods based on CPU usage
---




# Horizontal pod autoscaling



## Prerequisites

-   Install the `kubectl` binary on your Ansible box
-   Install the UCP Client bundle for the `admin` user
-   Confirm that you can connect to the cluster by running a test command, for example, `kubectl get nodes`
-   Install `metrics-server` as shown in [../blog/install-metrics-server.html](../blog/install-metrics-server.html)




## Introduction
The Horizontal Pod Autoscaler automatically scales the number of pods in a deployment or replica set based on the observed CPU utilization.

## Assigning CPU Resources to Containers and Pods
 
It is possible to `request` the minimum amount of CPU that a container requires. If the cluster has this amount available, the container will be allowed to start. However, the container will not be scheduled if the requested CPU resource is not 
available. You can also specify a CPU `limit` to set a maximum amount of CPU resources the container is allowed.

A Container is guaranteed to have as much CPU as specified in its `request`, but is not allowed to use more CPU than its `limit`. The CPU resource is measured in CPU units. One CPU, in Kubernetes, is equivalent to:

- One AWS vCPU
- One GCP Core
- One Azure vCore
- One Hyperthread on a bare-metal Intel processor with Hyperthreading

Fractional values are allowed. A Container that requests 0.5 CPU is guaranteed half as much CPU as a Container that requests 1 CPU. You can use the suffix `m` to mean `milli` or one thousandth of a CPU. For example, 100m CPU and 0.1 CPU are the same.

CPU is always requested as an absolute quantity, never as a relative quantity; 0.1 is the same amount of CPU on a single-core,dual-core, or 48-core machine.



## Workload

To demonstrate the Horizontal Pod Autoscaler, we will serve up a single PHP page that performs a compute-intensive workload:

```
<?php
  $x = 0.0001;
  for ($i = 0; $i <= 1000000; $i++) {
    $x += sqrt($x);
  }
  echo "OK!";
?>
```


This file is used as the index page for a web server that is deployed using a custom docker image. A Dockerfile  based on the `php-apache` image is used to containerize our worload:

```
FROM php:5-apache
ADD index.php /var/www/html/index.php
RUN chmod a+rx index.php

```

Evert time the index page is accessed, the computation will be performed and the message "OK!" will be returned to the client.


## Deploying the service

First, we will start a deployment running the image and expose it as a service. We set the CPU request to `200m` or `200/1000` equals `0.2` CPU. Note that, in this instance, we do not set an upper `limit` and so the container can use as much CPU as is available on the node.

```
$ kubectl run php-apache --image=k8s.gcr.io/hpa-example --requests=cpu=200m --expose --port=80
```

In a separate terminal, you can set up a watch for the pods, deployments and replica sets that are created:

```
# watch -n 10 kubectl get pods,deploy,rs

Every 10.0s: kubectl get pods,deploy,rs                    Fri Mar  1 14:43:14 2019

NAME                             READY     STATUS    RESTARTS   AGE
pod/php-apache-7bf9f4b44-lmzfl   1/1       Running   0          37s

NAME                               DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deployment.extensions/php-apache   1         1         1            1           38s

NAME                                         DESIRED   CURRENT   READY     AGE
replicaset.extensions/php-apache-7bf9f4b44   1         1         1         37s
```

In another terminal, you can use `kubectl top` to monitor the CPU usage. Here, you can see that the single pod is using minimal CPU and memory resources (`1m` equals 1/1000th CPU, '7Mi' equals 7MB memory).

```
# watch -n 10 kubectl top pods

Every 10.0s: kubectl top pods | grep php-apache    Fri Mar  1 14:43:26 2019

php-apache-7bf9f4b44-lmzfl   1m           7Mi
```

You can use the `kubectl describe` command to see details of the deployment. You can see the CPU `request` of `200m` and that,
for now, only one replica is deployed.

```
# kubectl describe deploy php-apache

Name:                   php-apache
Namespace:              default
CreationTimestamp:      Fri, 01 Mar 2019 14:41:45 +0000
Labels:                 run=php-apache
Annotations:            deployment.kubernetes.io/revision=1
Selector:               run=php-apache
Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  run=php-apache
  Containers:
   php-apache:
    Image:      k8s.gcr.io/hpa-example
    Port:       80/TCP
    Host Port:  0/TCP
    Requests:
      cpu:        200m
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   php-apache-7bf9f4b44 (1/1 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  8m    deployment-controller  Scaled up replica set php-apache-7bf9f4b44 to 1
```


## Expose NodePort

By default, the service that has been generated is assigned a ClusterIP. It can be convenient to use a NodePort to expose the service. 

```
# kubectl get svc php-apache
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
php-apache   ClusterIP   10.96.103.118   <none>        80/TCP    1m
```

Use the `kubectl patch` command to change the service type to `NodePort` and to set an explicit port, in this instance `33999`.

```
# kubectl patch svc php-apache --type='json' -p '[{"op":"replace","path":"/spec/type","value":"NodePort"}]'

# kubectl patch svc php-apache --type='json' -p '[{"op": "add", "path":"/spec/ports/0/nodePort", "value":33999}]'
```

Now, when you inspect the service, you will see that it can be accessed through any node in the cluster, on the specified port. You will use this when generating a load on the service.

```
# kubectl get svc php-apache

NAME         TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
php-apache   NodePort   10.96.103.118   <none>        80:33999/TCP   2m
```

## Create autoscaler

Use the `kubectl autoscale` command to generate the autoscaler. 



```
# kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10

horizontalpodautoscaler.autoscaling/php-apache autoscaled
```

In this instance, you specify that when the CPU hits 50% utilization, another pod should be deployed. (In reality, you may want to set this threshold higher, for example, to 70% or 80%). Remember that you set the CPU `request` to `200m`, so  you should see a new pod being created when CPU utilization rises above `100m` in absolute terms. You also specifiy that, at most, 10 pods should be deployed. 


In a separate terminal, run a watch on the `hpa` resource. Note that, as there is still no load on the web server, the target utilization shows `0%/50%`.

```
# watch -n 10 kubectl get hpa

Every 10.0s: kubectl get hpa                        Fri Mar  1 14:47:07 2019

NAME         REFERENCE               TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
php-apache   Deployment/php-apache   0%/50%    1         10        1          1m
```


## Generate load

In another terminal, run a simple shell script to repeatedly access the index page, using any of the nodes in the cluster and
the specified port number.

```
# while true; do wget -q -O- http://hpe2-ucp01.am2.cloudra.local:33999; done

OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK!OK...
```

## Wait for scaling

After a slight delay, `kubectl top pods` will report that the single pod is consuming significant CPU resources - recall that you did not specify a `limit` to set an upper boundary on the CPU utilization. In this instance, it is consuming more than 8 times the target threshold (50% of 200m or 100m), so new pods should be deployed shortly. 

```
Every 10.0s: kubectl top pods                      Fri Mar  1 14:52:34 2019

NAME                         CPU(cores)   MEMORY(bytes)
php-apache-7bf9f4b44-lmzfl   887m         10Mi
```

The `hpa` resource also indicates that the target is being exceeded (443%/50%).

```
Every 10.0s: kubectl get hpa                        Fri Mar  1 14:52:43 2019

NAME         REFERENCE               TARGETS    MINPODS   MAXPODS   REPLICAS
   AGE
php-apache   Deployment/php-apache   443%/50%   1         10        1
   6m
```

## Scaling to 4 pods

After a certain amount of time, the `watch` on pods, deployments and replica sets will show new pods being deployed:

```
Every 10.0s: kubectl get pods,deploy,rs                    Fri Mar  1 14:53:00 2019

NAME                             READY     STATUS    RESTARTS   AGE
pod/php-apache-7bf9f4b44-4q9xb   1/1       Running   0          26s
pod/php-apache-7bf9f4b44-6jmg4   1/1       Running   0          26s
pod/php-apache-7bf9f4b44-jsrlh   1/1       Running   0          26s
pod/php-apache-7bf9f4b44-lmzfl   1/1       Running   0          10m

NAME                               DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deployment.extensions/php-apache   4         4         4            4           10m
NAME                                         DESIRED   CURRENT   READY     AGE
replicaset.extensions/php-apache-7bf9f4b44   4         4         4         10m
```

Use `kubectl describe` on the deployment to see details of the scaling event.

```
# kubectl describe deploy php-apache
Name:                   php-apache
...
NewReplicaSet:   php-apache-7bf9f4b44 (4/4 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  11m   deployment-controller  Scaled up replica set php-apache-7bf9f4b44 to 1
  Normal  ScalingReplicaSet  1m    deployment-controller  Scaled up replica set php-apache-7bf9f4b44 to 4
```

## Impact of scaling to 4

After a while, `kubectl top pods` will show that the 4 pods are coping better than one, but they are still exceeding the target, in this instance, 50% of 200m or 100m.

```
Every 10.0s: kubectl top pods                      Fri Mar  1 14:55:28 2019

NAME                         CPU(cores)   MEMORY(bytes)
php-apache-7bf9f4b44-4q9xb   232m         10Mi
php-apache-7bf9f4b44-6jmg4   236m         10Mi
php-apache-7bf9f4b44-jsrlh   226m         9Mi
php-apache-7bf9f4b44-lmzfl   199m         10Mi
```


Similarly, the `hpa` resource  shows that the overall target threshold is still being missed (111%/50%).

```
Every 10.0s: kubectl get hpa                        Fri Mar  1 14:55:48 2019

NAME         REFERENCE               TARGETS    MINPODS   MAXPODS   REPLICAS    AGE
php-apache   Deployment/php-apache   111%/50%   1         10        4           10m

```

##  Scaling to 8 pods

As the thresholds are still being exceeded, another round of scaling takes place, this time from 4 to 8 pods.

```
Every 10.0s: kubectl get pods,deploy,rs                    Fri Mar  1 14:58:40 2019

NAME                             READY     STATUS    RESTARTS   AGE
pod/php-apache-7bf9f4b44-2bcc9   1/1       Running   0          3s
pod/php-apache-7bf9f4b44-4q9xb   1/1       Running   0          6m
pod/php-apache-7bf9f4b44-6jmg4   1/1       Running   0          6m
pod/php-apache-7bf9f4b44-7r7lp   1/1       Running   0          3s
pod/php-apache-7bf9f4b44-bpw8s   1/1       Running   0          3s
pod/php-apache-7bf9f4b44-d5jp7   1/1       Running   0          3s
pod/php-apache-7bf9f4b44-jsrlh   1/1       Running   0          6m
pod/php-apache-7bf9f4b44-lmzfl   1/1       Running   0          16m

NAME                               DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deployment.extensions/php-apache   8         8         8            8           16m
NAME                                         DESIRED   CURRENT   READY     AGE
replicaset.extensions/php-apache-7bf9f4b44   8         8         8         16m
```

Again, you can use `kubectl describe` on the deployment for confirmation of the scaling event.

```
# kubectl describe deploy php-apache
Name:                   php-apache
...
NewReplicaSet:   php-apache-7bf9f4b44 (8/8 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  17m   deployment-controller  Scaled up replica set php-apache-7bf9f4b44 to 1
  Normal  ScalingReplicaSet  7m    deployment-controller  Scaled up replica set php-apache-7bf9f4b44 to 4
  Normal  ScalingReplicaSet  1m    deployment-controller  Scaled up replica set php-apache-7bf9f4b44 to 8
```


## Impact of scaling to 8

After a while, `kubectl top pods` will show that the 8 pods are almost sufficient to achieve the required threshold. On average, it would seem that most pods are close to the `100m` requirement.

```
Every 10.0s: kubectl top pods                      Fri Mar  1 15:01:37 2019

NAME                         CPU(cores)   MEMORY(bytes)
php-apache-7bf9f4b44-2bcc9   83m          9Mi
php-apache-7bf9f4b44-4q9xb   98m          10Mi
php-apache-7bf9f4b44-6jmg4   143m         10Mi
php-apache-7bf9f4b44-7r7lp   80m          9Mi
php-apache-7bf9f4b44-bpw8s   111m         10Mi
php-apache-7bf9f4b44-d5jp7   157m         10Mi
php-apache-7bf9f4b44-jsrlh   108m         9Mi
php-apache-7bf9f4b44-lmzfl   96m          10Mi
```

Similarly, the `hpa` resource  shows that the overall target threshold is close to being achieved (54%/50%).

```
Every 10.0s: kubectl get hpa                        Fri Mar  1 15:01:55 2019

NAME         REFERENCE               TARGETS   MINPODS   MAXPODS   REPLICAS
  AGE
php-apache   Deployment/php-apache   54%/50%   1         10        8
  16m
```

## Further scaling and tolerance

Given this particular workload and your environment, the exact number of pods deployed is not certain. In this instance, another two pods were subsequently deployed, but then one was removed to leave a steady-state of 9 pods required to meet the CPU requirements. Tolerance levels are deployed to stop `thrashing`, where pods are added and removed repeatedly.


## Scaling down

Stop the shell script that is generating the workload. The CPU usage reported by `kubectl top pods` will drop to a minimal level (`1m`) while the `hpa` resouce will show a target of `0%/50%`.

```
Every 10.0s: kubectl top pods                      Fri Mar  1 15:15:28 2019

NAME                         CPU(cores)   MEMORY(bytes)
php-apache-7bf9f4b44-2bcc9   1m           9Mi
php-apache-7bf9f4b44-4q9xb   1m           10Mi
php-apache-7bf9f4b44-6jmg4   1m           10Mi
php-apache-7bf9f4b44-7r7lp   1m           9Mi
php-apache-7bf9f4b44-bpw8s   1m           10Mi
php-apache-7bf9f4b44-d5jp7   1m           10Mi
php-apache-7bf9f4b44-jsrlh   1m           9Mi
php-apache-7bf9f4b44-lmzfl   1m           10Mi
php-apache-7bf9f4b44-q6qcf   1m           10Mi
```

In time, the pods will be scaled down to one, as shown below:

```
Every 10.0s: kubectl get pods,deploy,rs                    Fri Mar  1 15:16:41 2019

NAME                             READY     STATUS        RESTARTS   AGE
pod/php-apache-7bf9f4b44-2bcc9   0/1       Terminating   0          18m
pod/php-apache-7bf9f4b44-4q9xb   0/1       Terminating   0          24m
pod/php-apache-7bf9f4b44-d5jp7   0/1       Terminating   0          18m
pod/php-apache-7bf9f4b44-lmzfl   1/1       Running       0          34m

NAME                               DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deployment.extensions/php-apache   1         1         1            1           34m
NAME                                         DESIRED   CURRENT   READY     AGE
replicaset.extensions/php-apache-7bf9f4b44   1         1         1         34m

```

You can again run `kubectl describe` on the deployment, to see the scaling event.

```
# kubectl describe deploy php-apache
Name:                   php-apache
...
NewReplicaSet:   php-apache-7bf9f4b44 (1/1 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  35m   deployment-controller  Scaled up replica set php-apache-7bf9f4b44 to 1
  Normal  ScalingReplicaSet  25m   deployment-controller  Scaled up replica set php-apache-7bf9f4b44 to 4
  Normal  ScalingReplicaSet  19m   deployment-controller  Scaled up replica set php-apache-7bf9f4b44 to 8
  Normal  ScalingReplicaSet  12m   deployment-controller  Scaled up replica set php-apache-7bf9f4b44 to 10
  Normal  ScalingReplicaSet  6m    deployment-controller  Scaled down replica set php-apache-7bf9f4b44 to 9
  Normal  ScalingReplicaSet  1m    deployment-controller  Scaled down replica set php-apache-7bf9f4b44 to 1
```


## Teardown

Run the following commands to clean up:

```
# kubectl delete deploy php-apache
deployment.extensions "php-apache" deleted

# kubectl delete service php-apache
service "php-apache" deleted

# kubectl delete hpa php-apache
horizontalpodautoscaler.autoscaling "php-apache" deleted
```



## Resources

Video:

<iframe src="https://player.vimeo.com/video/320716536" width="640" height="359" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/320716536">Horizontal pod autoscaling walkthrough</a>  on <a href="https://vimeo.com">Vimeo</a>.</p>


Introduction to HPA at [https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

Example is based on [https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)

Assigning CPU resources: [https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-resource/](https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-resource/)











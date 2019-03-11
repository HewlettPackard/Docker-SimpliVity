# Post-deploy validation



Many sample Kubernetes applications are available at [https://kubernetes.io/docs/tutorials/](https://kubernetes.io/docs/tutorials/). This section details how to deploy the stateless guestbook application with Redis as documented at [https://kubernetes.io/docs/tutorials/stateless-application/guestbook/](https://kubernetes.io/docs/tutorials/stateless-application/guestbook/). 


When deploying applications, you must be aware that Kubernetes version 1.11 shipped with Docker 2.1.  If you are testing examples that are designed to work with a newer (or older) version of Kubernetes, you may have to make changes in some places to the configuration files.


## Prerequisites

-   Install the `kubectl` binary on your Ansible box
-   Install the UCP Client bundle for the `admin` user
-   Confirm that you can connect to the cluster by running a test command, for example, `kubectl get nodes`


## Kubernetes guestbook example with Redis

The playbook for the Kubernetes example guestbook is based on the example taken from the GitHub repo at https://github.com/kubernetes/examples. 

```
# cd ~/Docker-Simplivity
# ansible-playbook -i vm_hosts test/playbooks/k8s-guestbook.yml --vault-password-file .vault_pass
```

You can run the playbook directly, but it can be informative to walk through the individual files to see what is going on under the covers.

### Quick start
```
# cd ~/Docker-Simplivity/test/files/k8s-examples/guestbook
# kubectl apply -f redis-master-deployment.yaml
# kubectl apply -f redis-master-service.yaml
# kubectl apply -f redis-slave-deployment.yaml
# kubectl apply -f redis-slave-service.yaml
# kubectl apply -f frontend-deployment.yaml
# kubectl apply -f frontend-service.yaml
# kubectl get svc frontend
```


### Details
Change to the directory containing the `guestbook` YAML files. 

```
# cd ~/Docker-Simplivity/test/files/k8s-examples/guestbook
```


The manifest file `redis-master-deployment.yaml`, included below, specifies a deployment controller that runs a single replica Redis master pod.

```
# cat redis-master-deployment.yaml

apiVersion: apps/v1 #  for k8s versions before 1.9.0 use apps/v1beta2  and before 1.8.0 use extensions/v1beta1
kind: Deployment
metadata:
  name: redis-master
spec:
  selector:
    matchLabels:
      app: redis
      role: master
      tier: backend
  replicas: 1
  template:
    metadata:
      labels:
        app: redis
        role: master
        tier: backend
    spec:
      containers:
      - name: master
        image: k8s.gcr.io/redis:e2e  # or just image: redis
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        ports:
        - containerPort: 6379
```

Apply the Redis master deployment from the `redis-master-deployment.yaml` file:

```
# kubectl apply -f redis-master-deployment.yaml
```

Query the list of Pods to verify that the Redis master pod is running.

```
# kubectl get pods | grep redis

redis-master-57657796fc-psvhc     1/1       Running   0          32s
```

Use the `kubectl logs` command to view the logs from the Redis master pod:

```
# kubectl logs -f redis-master-57657796fc-psvhc

                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 2.8.19 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in stand alone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 1
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

[1] 07 Feb 15:04:32.189 # Server started, Redis version 2.8.19
[1] 07 Feb 15:04:32.189 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
[1] 07 Feb 15:04:32.189 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
[1] 07 Feb 15:04:32.190 * The server is now ready to accept connections on port 6379
```

The guestbook application needs to communicate with the Redis master to write its data. You need to apply a service to proxy the traffic to the Redis master pod. A service defines a policy to access the pods.

```
# cat redis-master-service.yaml

apiVersion: v1
kind: Service
metadata:
  name: redis-master
  labels:
    app: redis
    role: master
    tier: backend
spec:
  ports:
  - port: 6379
    targetPort: 6379
  selector:
    app: redis
    role: master
    tier: backend
```

Apply the Redis master service from the `redis-master-service.yaml` file:

```
#  kubectl apply -f redis-master-service.yaml

service "redis-master" created

```

Query the list of services to verify that the Redis master service is running.

```
# kubectl get svc

NAME           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
redis-master   ClusterIP   10.96.240.18    <none>        6379/TCP         1m
```

Although the Redis master is a single pod, you can make it highly available to meet traffic demands by adding replica Redis slaves.

```
# cat redis-slave-deployment.yaml

apiVersion: apps/v1 #  for k8s versions before 1.9.0 use apps/v1beta2  and before 1.8.0 use extensions/v1beta1
kind: Deployment
metadata:
  name: redis-slave
spec:
  selector:
    matchLabels:
      app: redis
      role: slave
      tier: backend
  replicas: 2
  template:
    metadata:
      labels:
        app: redis
        role: slave
        tier: backend
    spec:
      containers:
      - name: slave
        image: gcr.io/google_samples/gb-redisslave:v1
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        env:
        - name: GET_HOSTS_FROM
          value: dns
          # If your cluster config does not include a dns service, then to
          # instead access an environment variable to find the master
          # service's host, comment out the 'value: dns' line above, and
          # uncomment the line below:
          # value: env
        ports:
        - containerPort: 6379
```

Create the Redis slaves from the `redis-slave-deployment.yaml` file.

```
# kubectl apply -f  redis-slave-deployment.yaml

deployment.apps "redis-slave" created

```

Query the list of Pods to verify that the Redis slave pods are running.

```
# kubectl get pods | grep redis

redis-master-57657796fc-psvhc     1/1       Running   0          7m
redis-slave-5cb5956459-bqqlg      1/1       Running   0          19s
redis-slave-5cb5956459-gql5x      1/1       Running   0          19s
```

The guestbook application needs to communicate to Redis slaves to read data. To make the Redis slaves discoverable, you need to set up a service that provides transparent load balancing to the set of pods.

```
# cat redis-slave-service.yaml

apiVersion: v1
kind: Service
metadata:
  name: redis-slave
  labels:
    app: redis
    role: slave
    tier: backend
spec:
  ports:
  - port: 6379
  selector:
    app: redis
    role: slave
    tier: backend
```

Deploy the Redis slave service from the `redis-slave-service.yaml` file

```
# kubectl apply -f redis-slave-service.yaml

service "redis-slave" created

```

Query the list of services to verify that the Redis slave service is running.

```
# kubectl get services | grep redis

redis-master   ClusterIP   10.96.240.18    <none>        6379/TCP         4m
redis-slave    ClusterIP   10.96.200.85    <none>        6379/TCP         22s
```

The guestbook application has a web frontend written in PHP serving the HTTP requests. It is configured to connect to the `redis-master` service for write requests and the `redis-slave` service for read requests.

```
# cat frontend-deployment.yaml

apiVersion: apps/v1 #  for k8s versions before 1.9.0 use apps/v1beta2  and before 1.8.0 use extensions/v1beta1
kind: Deployment
metadata:
  name: frontend
spec:
  selector:
    matchLabels:
      app: guestbook
      tier: frontend
  replicas: 3
  template:
    metadata:
      labels:
        app: guestbook
        tier: frontend
    spec:
      containers:
      - name: php-redis
        image: gcr.io/google-samples/gb-frontend:v4
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        env:
        - name: GET_HOSTS_FROM
          value: dns
          # If your cluster config does not include a dns service, then to
          # instead access environment variables to find service host
          # info, comment out the 'value: dns' line above, and uncomment the
          # line below:
          # value: env
        ports:
        - containerPort: 80
```

Create the frontend deployment using the `frontend-deployment.yaml` file.

```
# kubectl apply -f frontend-deployment.yaml

deployment.apps "frontend" created

```

Query the list of pods to verify that the three frontend replicas are running.

```
# kubectl get pods -l app=guestbook -l tier=frontend

NAME                        READY     STATUS    RESTARTS   AGE
frontend-7f5cd767dc-28j6b   1/1       Running   0          23s
frontend-7f5cd767dc-mqcbv   1/1       Running   0          23s
frontend-7f5cd767dc-v6lwc   1/1       Running   0          23s
```

If you want guests to be able to access your guestbook, you must configure the frontend service to be externally visible, so a client can request the service from outside the container cluster.

```
# cat frontend-service.yaml

apiVersion: v1
kind: Service
metadata:
  name: frontend
  labels:
    app: guestbook
    tier: frontend
spec:
  # comment or delete the following line if you want to use a LoadBalancer
  type: NodePort
  # if your cluster supports it, uncomment the following to automatically create
  # an external load-balanced IP for the frontend service.
  # type: LoadBalancer
  ports:
  - port: 80
  selector:
    app: guestbook
    tier: frontend
```

Deploy the `frontend` service using the `frontend-service.yaml` file

```
# kubectl apply -f frontend-service.yaml

service "frontend" created

```

Query the list of services to verify that the `frontend` service is running.

```
#  kubectl get services | grep frontend

frontend       NodePort    10.96.16.200    <none>        80:33444/TCP     25s
```

Access the UI using the identified port on any node in your cluster, for example, `http://hpe2-ucp01.am2.cloudra.local:33444/` as shown in the figure below.

![ "Guestbook UI"][media-k8s-guestbook1-png]

**Figure 21.** Guestbook UI

[media-k8s-guestbook1-png]:<../media/k8s-guestbook1.png> 


### Teardown

A playbook is provided to remove the deployed `guestbook`artifacts.

```
# cd ~/Docker-Simplivity
# ansible-playbook -i vm_hosts test/playbooks/k8s-guestbook-teardown.yml --vault-password-file .vault_pass
```

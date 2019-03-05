# Deploying the NFS provisioner for Kubernetes

## Prerequisites

-   Configure the variables described in the section `Kubernetes Persistent Volume configuration`
-   Install the `kubectl` binary on your Ansible box
-   Install the UCP Client bundle for the `admin` user
-   Confirm that you can connect to the cluster by running a test command, for example, `kubectl get nodes`



## Using NFS VM for post-deployment verification

In this example, it is assumed that the relevant variables are configured as follows:

|Variable|Value|
|:-------|:----|
|nfs_provisioner_namespace|`nfsstorage`|
|nfs_provisioner_role|`nfs-provisioner-runner`|
|nfs_provisioner_serviceaccount|`nfs-provisioner`|
|nfs_provisioner_name|`hpe.com/nfs`|
|nfs_provisioner_storage_class_name|`nfs`|
|nfs_provisioner_server_ip|`hpe2-nfs.am2.cloudra.local`|
|nfs_provisioner_server_share|`/k8s`|


In this instance, the server IP is set to the NFS VM that has been deployed.


## Running the playbook

Once the prerequisites are satisfied, run the appropriate playbook on your Ansible node:

```
# cd ~/Docker-SimpliVity
# ansible-playbook -i vm_hosts playbooks/k8s-nfs-provisioner.yml --vault-password-file .vault_pass
```

For validation, the playbook creates a test claim and a pod, the pod writes content to a file, the pod is deleted and then
the playbook checks that the contents of the file have been persisted.

```
        kubectl -n {{ nfs_provisioner_namespace }} apply -f /tmp/nfs-provisioner-test-claim.yml
        kubectl -n {{ nfs_provisioner_namespace }} apply -f /tmp/nfs-provisioner-test-pod.yml

        sleep 5 # need sleep here to allow pod/container to start up and write file

        ssh {{ nfs_provisioner_server_ip }} ls -R {{ nfs_provisioner_server_share }}

        echo '*** delete test-pod ***'

        kubectl -n {{ nfs_provisioner_namespace }} delete -f /tmp/nfs-provisioner-test-pod.yml

        echo '*** cat bar.txt ***'

        ssh {{ nfs_provisioner_server_ip }} "cd {{ nfs_provisioner_server_share }}/{{nfs_provisioner_namespace }}*; cat bar.txt"

        echo '*** delete test-claim ***'
        kubectl -n {{ nfs_provisioner_namespace }} delete -f /tmp/nfs-provisioner-test-claim.yml
```

The output of the playbook shows the various steps taking place:

```
        "pod/test-pod created",
        "/k8s:",
        "nfsstorage-test-claim-pvc-e6a09191-3b41-11e9-a830-0242ac11000b",
        "",
        "/k8s/nfsstorage-test-claim-pvc-e6a09191-3b41-11e9-a830-0242ac11000b:",
        "bar.txt",
        "*** delete test-pod ***",
        "pod \"test-pod\" deleted",
        "*** cat bar.txt ***",
        "hello",
        "*** delete test-claim ***",
        "persistentvolumeclaim \"test-claim\" deleted"
```


Running the command `kubectl get sc` will show the storage class named `nfs`:

```
# kubectl get sc

NAME      PROVISIONER   AGE
nfs       hpe.com/nfs   5m
```


The following section  shows how to manually perform a similar valiation test to the one done by the playbook. 


## Manually testing the NFS provisioner

Create a temporary file `/tmp/pvc.yml` for a persistent volume claim (PVC) named `dynnfs-testpvc` with a storage class of `nfs` 

```
# cat /tmp/pvc.yml <<EOF
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: dynnfs-testpvc
  annotations:
    volume.beta.kubernetes.io/storage-class: "nfs"
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 100Mi
EOF  

```

Create the PVC resource by running `kubectl apply` on this file.

```
# kubectl apply -f /tmp/pvc.yml

persistentvolumeclaim "dynnfs-testpvc" created
```

Verify that the corresponding persistent volume (PV) was created at the same time.

```
# kubectl get pv

NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM                    STORAGECLASS   REASON    AGE
pvc-e685a9d2-8a6f-11e8-9025-0242ac110010   100Mi      RWX            Delete           Bound     default/dynnfs-testpvc   nfs                      4s
```

Define a pod that will mount the persistent volume through using the persistent volume claim. The persistent volume is mounted under `/tmp/foo`.

```
cat /tmp/pod.yml <<EOF
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: dynnfs-testpod
spec:
  selector:
    matchLabels:
      app: dynnfs-testpod
  replicas: 1
  template:
    metadata:
      labels:
        app: dynnfs-testpod
    spec:
      volumes:
      - name: pod-data
        persistentVolumeClaim:
          claimName: dynnfs-testpvc
      containers:
      - name: dynnfs-testpod
        command:
        - sh
        - -c
        - while true; do sleep 1; done
        image: radial/busyboxplus:curl
        volumeMounts:
        - mountPath: /tmp/foo
          name: pod-data
EOF
```

Create the pod resource by running `kubectl apply` on the file.

```
# kubectl apply -f /tmp/pod.yml

deployment.apps "dynnfs-testpod" created
```

Retrieve the pod ID and then execute a command in the pod to create a test file on the persistent volume. The file is named `/tmp/foo/bar.txt` and contains the string `hello`.

```
# pod=$(kubectl get pod | awk '/dynnfs-testpod-/ {print $1}')
# kubectl exec -it $pod -- sh -c "echo hello >/tmp/foo/bar.txt"
```

In this example, where the NFS VM is being used as the storage back-end, you can examine the content of the folder containing the persistent volumes. Given the values specified above, where the NFS VM is named `hpe2-nfs` and the `nfs_provisioner_server_share` is `k8s`, you can connect to the VM and explore the folder as follows.

```
# ssh hpe2-nfs ls -R /k8s
/k8s:
default-dynnfs-testpvc-pvc-e685a9d2-8a6f-11e8-9025-0242ac110010
 
/k8s/default-dynnfs-testpvc-pvc-e685a9d2-8a6f-11e8-9025-0242ac110010:
bar.txt
```

Examine the contents of the file to ensure that the string `hello` has been persisted in the file `bar.txt`.

```
# ssh hpe2-nfs cat /k8s/default-dynnfs-testpvc-pvc-e685a9d2-8a6f-11e8-9025-0242ac110010/bar.txt
hello
```

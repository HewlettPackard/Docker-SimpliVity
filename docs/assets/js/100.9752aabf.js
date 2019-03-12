(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{207:function(e,t,s){"use strict";s.r(t);var n=s(0),a=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"deploying-the-nfs-provisioner-for-kubernetes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#deploying-the-nfs-provisioner-for-kubernetes","aria-hidden":"true"}},[e._v("#")]),e._v(" Deploying the NFS provisioner for Kubernetes")]),e._v(" "),s("h2",{attrs:{id:"prerequisites"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites","aria-hidden":"true"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),s("ul",[s("li",[e._v("Configure the variables described in the section "),s("code",[e._v("Kubernetes Persistent Volume configuration")])]),e._v(" "),s("li",[e._v("Install the "),s("code",[e._v("kubectl")]),e._v(" binary on your Ansible box")]),e._v(" "),s("li",[e._v("Install the UCP Client bundle for the "),s("code",[e._v("admin")]),e._v(" user")]),e._v(" "),s("li",[e._v("Confirm that you can connect to the cluster by running a test command, for example, "),s("code",[e._v("kubectl get nodes")])])]),e._v(" "),s("h2",{attrs:{id:"using-nfs-vm-for-post-deployment-verification"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#using-nfs-vm-for-post-deployment-verification","aria-hidden":"true"}},[e._v("#")]),e._v(" Using NFS VM for post-deployment verification")]),e._v(" "),s("p",[e._v("In this example, it is assumed that the relevant variables are configured as follows:")]),e._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[e._v("Variable")]),e._v(" "),s("th",{staticStyle:{"text-align":"left"}},[e._v("Value")])])]),e._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[e._v("nfs_provisioner_namespace")]),e._v(" "),s("td",{staticStyle:{"text-align":"left"}},[s("code",[e._v("nfsstorage")])])]),e._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[e._v("nfs_provisioner_role")]),e._v(" "),s("td",{staticStyle:{"text-align":"left"}},[s("code",[e._v("nfs-provisioner-runner")])])]),e._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[e._v("nfs_provisioner_serviceaccount")]),e._v(" "),s("td",{staticStyle:{"text-align":"left"}},[s("code",[e._v("nfs-provisioner")])])]),e._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[e._v("nfs_provisioner_name")]),e._v(" "),s("td",{staticStyle:{"text-align":"left"}},[s("code",[e._v("hpe.com/nfs")])])]),e._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[e._v("nfs_provisioner_storage_class_name")]),e._v(" "),s("td",{staticStyle:{"text-align":"left"}},[s("code",[e._v("nfs")])])]),e._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[e._v("nfs_provisioner_server_ip")]),e._v(" "),s("td",{staticStyle:{"text-align":"left"}},[s("code",[e._v("hpe2-nfs.am2.cloudra.local")])])]),e._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[e._v("nfs_provisioner_server_share")]),e._v(" "),s("td",{staticStyle:{"text-align":"left"}},[s("code",[e._v("/k8s")])])])])]),e._v(" "),s("p",[e._v("In this instance, the server IP is set to the NFS VM that has been deployed.")]),e._v(" "),s("h2",{attrs:{id:"running-the-playbook"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#running-the-playbook","aria-hidden":"true"}},[e._v("#")]),e._v(" Running the playbook")]),e._v(" "),s("p",[e._v("Once the prerequisites are satisfied, run the appropriate playbook on your Ansible node:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("# cd ~/Docker-SimpliVity\n# ansible-playbook -i vm_hosts playbooks/nfs-provisioner.yml --vault-password-file .vault_pass\n")])])]),s("p",[e._v("For validation, the playbook creates a test claim and a pod, the pod writes content to a file, the pod is deleted and then\nthe playbook checks that the contents of the file have been persisted.")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("        kubectl -n {{ nfs_provisioner_namespace }} apply -f /tmp/nfs-provisioner-test-claim.yml\n        kubectl -n {{ nfs_provisioner_namespace }} apply -f /tmp/nfs-provisioner-test-pod.yml\n\n        sleep 5 # need sleep here to allow pod/container to start up and write file\n\n        ssh {{ nfs_provisioner_server_ip }} ls -R {{ nfs_provisioner_server_share }}\n\n        echo '*** delete test-pod ***'\n\n        kubectl -n {{ nfs_provisioner_namespace }} delete -f /tmp/nfs-provisioner-test-pod.yml\n\n        echo '*** cat bar.txt ***'\n\n        ssh {{ nfs_provisioner_server_ip }} \"cd {{ nfs_provisioner_server_share }}/{{nfs_provisioner_namespace }}*; cat bar.txt\"\n\n        echo '*** delete test-claim ***'\n        kubectl -n {{ nfs_provisioner_namespace }} delete -f /tmp/nfs-provisioner-test-claim.yml\n")])])]),s("p",[e._v("The output of the playbook shows the various steps taking place:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('        "pod/test-pod created",\n        "/k8s:",\n        "nfsstorage-test-claim-pvc-e6a09191-3b41-11e9-a830-0242ac11000b",\n        "",\n        "/k8s/nfsstorage-test-claim-pvc-e6a09191-3b41-11e9-a830-0242ac11000b:",\n        "bar.txt",\n        "*** delete test-pod ***",\n        "pod \\"test-pod\\" deleted",\n        "*** cat bar.txt ***",\n        "hello",\n        "*** delete test-claim ***",\n        "persistentvolumeclaim \\"test-claim\\" deleted"\n')])])]),s("p",[e._v("Running the command "),s("code",[e._v("kubectl get sc")]),e._v(" will show the storage class named "),s("code",[e._v("nfs")]),e._v(":")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("# kubectl get sc\n\nNAME      PROVISIONER   AGE\nnfs       hpe.com/nfs   5m\n")])])]),s("p",[e._v("The following section  shows how to manually perform a similar validation test to the one done by the playbook.")]),e._v(" "),s("h2",{attrs:{id:"manually-testing-the-nfs-provisioner"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#manually-testing-the-nfs-provisioner","aria-hidden":"true"}},[e._v("#")]),e._v(" Manually testing the NFS provisioner")]),e._v(" "),s("p",[e._v("Create a temporary file "),s("code",[e._v("/tmp/pvc.yml")]),e._v(" for a persistent volume claim (PVC) named "),s("code",[e._v("dynnfs-testpvc")]),e._v(" with a storage class of "),s("code",[e._v("nfs")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('# cat /tmp/pvc.yml <<EOF\n---\nkind: PersistentVolumeClaim\napiVersion: v1\nmetadata:\n  name: dynnfs-testpvc\n  annotations:\n    volume.beta.kubernetes.io/storage-class: "nfs"\nspec:\n  accessModes:\n    - ReadWriteMany\n  resources:\n    requests:\n      storage: 100Mi\nEOF  \n\n')])])]),s("p",[e._v("Create the PVC resource by running "),s("code",[e._v("kubectl apply")]),e._v(" on this file.")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('# kubectl apply -f /tmp/pvc.yml\n\npersistentvolumeclaim "dynnfs-testpvc" created\n')])])]),s("p",[e._v("Verify that the corresponding persistent volume (PV) was created at the same time.")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("# kubectl get pv\n\nNAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM                    STORAGECLASS   REASON    AGE\npvc-e685a9d2-8a6f-11e8-9025-0242ac110010   100Mi      RWX            Delete           Bound     default/dynnfs-testpvc   nfs                      4s\n")])])]),s("p",[e._v("Define a pod that will mount the persistent volume through using the persistent volume claim. The persistent volume is mounted under "),s("code",[e._v("/tmp/foo")]),e._v(".")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("cat /tmp/pod.yml <<EOF\napiVersion: apps/v1beta2\nkind: Deployment\nmetadata:\n  name: dynnfs-testpod\nspec:\n  selector:\n    matchLabels:\n      app: dynnfs-testpod\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app: dynnfs-testpod\n    spec:\n      volumes:\n      - name: pod-data\n        persistentVolumeClaim:\n          claimName: dynnfs-testpvc\n      containers:\n      - name: dynnfs-testpod\n        command:\n        - sh\n        - -c\n        - while true; do sleep 1; done\n        image: radial/busyboxplus:curl\n        volumeMounts:\n        - mountPath: /tmp/foo\n          name: pod-data\nEOF\n")])])]),s("p",[e._v("Create the pod resource by running "),s("code",[e._v("kubectl apply")]),e._v(" on the file.")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('# kubectl apply -f /tmp/pod.yml\n\ndeployment.apps "dynnfs-testpod" created\n')])])]),s("p",[e._v("Retrieve the pod ID and then execute a command in the pod to create a test file on the persistent volume. The file is named "),s("code",[e._v("/tmp/foo/bar.txt")]),e._v(" and contains the string "),s("code",[e._v("hello")]),e._v(".")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("# pod=$(kubectl get pod | awk '/dynnfs-testpod-/ {print $1}')\n# kubectl exec -it $pod -- sh -c \"echo hello >/tmp/foo/bar.txt\"\n")])])]),s("p",[e._v("In this example, where the NFS VM is being used as the storage back-end, you can examine the content of the folder containing the persistent volumes. Given the values specified above, where the NFS VM is named "),s("code",[e._v("hpe2-nfs")]),e._v(" and the "),s("code",[e._v("nfs_provisioner_server_share")]),e._v(" is "),s("code",[e._v("k8s")]),e._v(", you can connect to the VM and explore the folder as follows.")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("# ssh hpe2-nfs ls -R /k8s\n/k8s:\ndefault-dynnfs-testpvc-pvc-e685a9d2-8a6f-11e8-9025-0242ac110010\n \n/k8s/default-dynnfs-testpvc-pvc-e685a9d2-8a6f-11e8-9025-0242ac110010:\nbar.txt\n")])])]),s("p",[e._v("Examine the contents of the file to ensure that the string "),s("code",[e._v("hello")]),e._v(" has been persisted in the file "),s("code",[e._v("bar.txt")]),e._v(".")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("# ssh hpe2-nfs cat /k8s/default-dynnfs-testpvc-pvc-e685a9d2-8a6f-11e8-9025-0242ac110010/bar.txt\nhello\n")])])])])}],!1,null,null,null);a.options.__file="nfs-provisioner.md";t.default=a.exports}}]);
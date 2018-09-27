BINARY=$1
${BINARY} apply -f - <<EOF
kind: Deployment
apiVersion: extensions/v1beta1
metadata:
  name: nfs-provisioner
  namespace: {{ nfs_provisioner_namespace }}
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: nfs-provisioner
    spec:
      nodeSelector:
#        kubernetes.io/hostname: "{{ groups.ucp[0] }}.{{ domain_name }}"
        node-role.kubernetes.io/master: ""
      serviceAccountName: nfs-provisioner
      containers:
        - name: nfs-client-provisioner
          image: quay.io/external_storage/nfs-client-provisioner:latest
          volumeMounts:
            - name: nfs-client-root
              mountPath: /persistentvolumes
          env:
            - name: PROVISIONER_NAME
              value: '{{ nfs_provisioner_name }}'
            - name: NFS_SERVER
              value: '{{ nfs_provisioner_server_ip }}'
            - name: NFS_PATH
              value:  '{{ nfs_provisioner_server_share }}'
      volumes:
        - name: nfs-client-root
          nfs:
            server: '{{ nfs_provisioner_server_ip }}'
            path: '{{ nfs_provisioner_server_share }}'

EOF


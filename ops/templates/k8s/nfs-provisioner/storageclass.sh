BINARY=$1
${BINARY} apply -f - <<EOF
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: '{{ nfs_provisioner_storage_class_name }}'
provisioner: '{{ nfs_provisioner_name }}'
EOF

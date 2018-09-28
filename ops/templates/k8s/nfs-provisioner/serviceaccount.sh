BINARY=$1
${BINARY} get serviceaccount --namespace {{ nfs_provisioner_namespace }} nfs-provisioner >/dev/null 2>&1
if [ $? != 0 ]
then
  ${BINARY} apply -f - <<EOF
---
  apiVersion: v1
  kind: Namespace
  metadata:
    name: {{ nfs_provisioner_namespace }}
---
  apiVersion: v1
  kind: ServiceAccount
  metadata:
    name: nfs-provisioner
    namespace: {{ nfs_provisioner_namespace }}
EOF
else
  echo "Service Account nfs-provisioner already created"
fi
unlink $0

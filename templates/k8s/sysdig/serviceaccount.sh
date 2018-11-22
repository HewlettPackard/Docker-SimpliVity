BINARY=$1
${BINARY} get serviceaccount sysdig >/dev/null 2>&1 
if [ $? != 0 ]
then
  ${BINARY} apply -f - <<EOF
  apiVersion: v1
  kind: ServiceAccount
  metadata:
    name: sysdig
    namespace: sysdig
EOF
else
  echo "Service Account sysdig already created"
fi
unlink $0

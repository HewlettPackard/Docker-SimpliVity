BINARY=$1
${BINARY} get serviceaccount sysdig >/dev/null 2>&1 
if [ $? != 0 ]
then
  ${BINARY} apply -f - <<EOF
  apiVersion: v1
  kind: Namespace
  metadata:
    name: sysdig
EOF
else
  echo "Namespace sysdig already created"
fi
unlink $0

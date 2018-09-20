#!/bin/bash
set -e
set -o pipefail
while getopts 'v:' OPTION; do
  case "$OPTION" in
    v)
      vault_switch="--vault-password-file=$OPTARG" 
      ;;
    ?)
      echo "script usage: $(basename $0) [-v VaultPasswordfile]" >&2
      exit 1
      ;;
  esac
done
shift "$(($OPTIND -1))"

tag="$1"
if [ "$tag" != "" ]
then
  backup_swarm="-e backup_name=${tag}_swarm"
  backup_ucp="-e backup_name=${tag}_ucp"
  backup_dtr_meta="-e backup_name=${tag}_dtr_meta"
  backup_dtr_data="-e backup_name=${tag}_dtr_data"
else
  backup_swarm=""
  backup_ucp=""
  backup_dtr_meta=""
  backup_dtr_data=""
fi

vswitch=${vault_switch:-}
ansible-playbook -i vm_hosts playbooks/backup_swarm.yml        ${vswitch} $backup_swarm
sleep 20
ansible-playbook -i vm_hosts playbooks/backup_ucp.yml          ${vswitch} $backup_ucp
sleep 20
ansible-playbook -i vm_hosts playbooks/backup_dtr_metadata.yml ${vswitch} $backup_dtr_meta
sleep 20
ansible-playbook -i vm_hosts playbooks/backup_dtr_images.yml   ${vswitch} $backup_dtr_data

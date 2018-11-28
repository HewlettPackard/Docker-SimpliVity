###
# Copyright (2017) Hewlett Packard Enterprise Development LP
#
# Licensed under the Apache License, Version 2.0 (the "License");
# You may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
###
#
# This script will scale the resource plan (worker nodes)
#
set -e
set -o pipefail
while getopts 'lv:' OPTION; do
  case "$OPTION" in
    v)
      vault_switch="--vault-password-file=$OPTARG"
      ;;
    l)
      loadbalancer="worker_lb"
      ;;
    ?)
      echo "script usage: $(basename $0) [-l] [-v VaultPasswordfile]" >&2
      echo "  purpose: scale the resource plane ( Red Hat/Linux worker nodes only)"
      echo "  -v: specifies the path to your vault password file if your vault is encrypted"
      echo "  -l: tells the playbook to scope the legacy load balancer, aka [worker_lb]"
      echo "      without this option, the [loadbalancer] group is scoped"
      exit 1
      ;;
  esac
done

vswitch=${vault_switch:-}
loadbalancer=${loadbalancer:-"loadbalancer"}
scope="worker,${loadbalancer}"
ansible-playbook -i vm_hosts --limit=${scope}  ${vswitch}  site.yml

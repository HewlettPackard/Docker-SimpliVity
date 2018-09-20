# This script will scale the resource plan (worker nodes)
scope="worker,worker_lb"
ansible-playbook -i vm_hosts --limit=${scope} site.yml

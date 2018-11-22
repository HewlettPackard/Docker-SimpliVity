# This playbook will Restore DTR

ansible-playbook  -i vm_hosts --limit=dtr,nfs,worker_lb restore.yml

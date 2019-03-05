# Inventory group variables

Additional configuration files for each group in the inventory are available, including `group_vars/vms.yml`, `group_vars/ucp.yml`, `group_vars/dtr.yml`, `group_vars/worker.yml` and `group_vars/nfs.yml`.

These group files facilitate more sophisticated settings, such as additional drives and additional network interfaces. For example, here is the `group_vars/nfs.yml` file.

```
networks:
  - name:  '{{ vm_portgroup }}'
    ip:  "{{ ip_addr | ipaddr('address') }}"
    netmask: "{{ ip_addr | ipaddr('netmask') }}"
    gateway: "{{ gateway }}"
 
disks_specs:
  - size_gb:  '{{ disk1_size }}'
    type: thin
    datastore: "{{ datastores | random }}"
  - size_gb: '{{ disk2_size }}'
    type: thin
    datastore: "{{ datastores | random }}"
  - size_gb: 10
    type: thin
    datastore: "{{ datastores | random }}"
```

In this example, the size of the first two drives is specified using the values of the variables `disk1_size` and `disk2_size` that are declared in the `group_vars/vars` file. This maintains compatibility with `vm_hosts` inventories from earlier releases of the playbooks. However, it is possible to provide explicit values, depending on your requirements, for the individual UCP, DTR, worker or NFS VMs. For example, you may want to increase the size of the second disk for the NFS VM as this is used to store the DTR images, so the default value of 500GB may not be sufficient to meet your needs.

In this release, support has been added for configuring a third drive that can be used to hold Kubernetes persistent volume data. The default size (10GB) is set low as the use of the NFS VM for storing persistent volume data is only considered suitable for demo purposes and should not be used in a production environment.

In the following example, the `group_vars/nfs.yml` has been modified to configure the NFS VM with a 50GB boot disk, a 500GB drive for DTR images and an 800GB drive for Kubernetes persistent volumes data.

```

networks:
  - name:  '{{ vm_portgroup }}'
    ip:  "{{ ip_addr | ipaddr('address') }}"
    netmask: "{{ ip_addr | ipaddr('netmask') }}"
    gateway: "{{ gateway }}"
 
disks_specs:
  - size_gb: 50
    type: thin
    datastore: "{{ datastores | random }}"
  - size_gb: 500
    type: thin
    datastore: "{{ datastores | random }}"
  - size_gb: 800
    type: thin
    datastore: "{{ datastores | random }}"
```

Note: The number of drives and the purpose of each drive is determined by the role of the VM and the specific playbooks that uses the information. The first disk is always used as the boot disk, irrespective of VM role, while the purpose of the second or third disk is specific to the role.

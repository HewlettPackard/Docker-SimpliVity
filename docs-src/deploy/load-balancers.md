# Provisioning load balancers for UCP and DTR

The playbook `playbooks/loadbalancer.yml` is used to deploy load balancers in an `active-active` configuration to provide highly-available access to UCP and DTR.

At least two nodes are specified in the `[loadbalancer]` group in the inventory, along with group variables defining CPU and RAM requirements. These nodes run `keepalived` and `HAproxy`.

```

[loadbalancer]
hpe-lb1 ip_addr='10.10.174.248/22' esxi_host='simply04.am2.cloudra.local' ucp=true
hpe-lb2 ip_addr='10.10.174.249/22' esxi_host='simply05.am2.cloudra.local' dtr=true

[loadbalancer:vars]
cpus='2'
ram='4096'
node_policy='hpe-bronze'

```

The virtual IP for UCP will be handled by `hpe-lb1` by default, which will split the traffic across the three UCP VMs `hpe-ucp01`, `hpe-ucp02` and `hpe-ucp03`. In the case of a failure of `hpe-lb1`, the virtual IP for UCP will automatically move to the second load balancer node `hpe-lb2` which will again distribute the traffic to the UCP VMs.

Similarly, the virtual IP for DTR will be handled by default by the load balancer `hpe-lb2`, splitting the traffic across the three DTR VMs `hpe-dtr01`, `hpe-dtr02` and `hpe-dtr03`. In the case of a failure of `hpe-lb2`, the virtual IP for DTR will automatically move to the first load balancer node `hpe-lb1` which will again distribute the traffic to the DTR VMs.

To configure the virtual IPs for UCP and DTR, you need to add a `loadbalancers` dictionary to your `group_vars/vars` file as shown in the excerpt below:

```

loadbalancers:
  ucp:
    public_interface: 'ens192'
    public_vip: '10.60.59.251'
    public_fqdn: hpe-ucpvip.cloudra.local
    virtual_router_id: 54
  dtr:
    public_interface: 'ens192'
    public_vip: '10.60.59.252'
    public_fqdn: hpe-dtrvip.cloudra.local
    virtual_router_id: 55


```

**Warning:** If you re-run `playbooks/loadbalancer.yml` after a configuration change, you may need to subsequently run `playbooks/reconfigure_dtr.yml` as the latter playbook configures the virtual IP address for accessing the UCP Single-Sign-On (SSO) page. If there is no virtual IP or FQDN defined for UCP in the variables file, the playbook will choose the address of the first UCP node in the `[ucp]` group. This scenario introduces a single point of failure and should be avoided.

**Note:** By default, the playbook supports ports `433` and `6443` for UCP and port `433` for DTR. If you deploy Prometheus and Grafana on Docker Swarm, the Grafana port `3000` will be handled as well.

**Note:** The playbook `playbooks/loadbalancer.yml` can be used to create one or more load balancers for applications running on your worker nodes. However, it is impossible for the playbooks to know what ports to support, so manual configuration of HAproxy and `keepalived` may be required. By default, the playbooks support ports `80` and `443` for worker nodes.

### Legacy stand-alone load balancers

The playbook `playbooks/install_haproxy.yml` is used to deploy three separate load balancers, for the UCP, DTR and worker nodes. It is recommended that you use the HAproxy/`keepalived` solution documented above instead of this option.

### Deploying without load balancers

If you do not want to deploy load balancers when running `site.yml`, you should comment out any declarations in the inventory and variables files. This includes any legacy stand-alone load balancers.

### Deploying with your own load balancers

If you are using external load balancers for UCP and DTR, you can configure UCP and DTR to use these external load balancers by specifying FQDNs in the `loadbalancers` dictionary in `group_vars/vars`:

```

loadbalancers:
  ucp:
    public_fqdn: external-ucpvip.am2.cloudra.local
  dtr:
    public_fqdn: external-dtrvip.am2.cloudra.local

```

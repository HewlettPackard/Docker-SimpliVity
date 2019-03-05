# Create the Red Hat Linux template

To create the Red Hat Linux VM template that you will use as the base for all your nodes, you first create a Virtual Machine with the OS installed and then convert the Virtual Machine to a VM Template. The VM Template is created as lean as possible, with any additional software installs and/or system configuration performed subsequently using Ansible.

As the creation of the template is a one-off task, this procedure has not been automated. The steps required to manually create a VM template are outlined below.

Log in to vCenter and create a new Virtual Machine with the following characteristics:

-   Guest OS Family: Linux, Guest OS Version: Red Hat Enterprise Linux (64-bit)
-   Hard Disk size: 50GB, (Thin provisioning)
-   A single network controller connected to the network or VLAN of your choice. All VMs will connect to this same network.
-   Optionally you can remove the floppy drive

Install Red Hat Enterprise 7:

1.  Select a language which is supported by Docker
2.  For the software selection, choose **Infrastructure Server** as the base environment and add the **Guest Agents** from the lists of add-ons available for this environment. The Infrastructure Server environment is selected here versus the Minimal Install because customization of Linux guest operating systems requires that Perl is installed in the Linux guest operating system.
3.  Configure the network settings so that you can later access the VM using SSH. Specify an IP address for the network interface, a default gateway, DNS settings and possibly any HTTP/HTTPS proxies that apply in your environment.
4.  Specify a password for the root account and optionally created an admin user.
5.  Wait for the installation to finish and for the VM to reboot.

## Finalize the template

Log in to the `root` account on the Ansible box and copy the SSH public key to the VM Template. This will allow your Ansible node to SSH to all the Virtual Machines created from the VM Template without the need for a password.

```
ssh-copy-id root@<IP of your VM_Template>
```

Perform the following steps on the VM Template to finalize its creation:

1.  Clean up the template by running the following commands from the **Virtual Machine Console:** 

    ```
    
    # rm /etc/ssh/ssh_host_*
    # nmcli con del ens192
    # logrotate -f /etc/logrotate.conf
    # rm /var/log/*-201?*
    # history -c		
    
    ```

2.  Shutdown the VM

    ```
    # shutdown -h now
    ```

3.  Turn the VM into a template by right-clicking on your VM and selecting `Template -> Convert to Template`. This will create a new template visible under VM Templates in Folders, ready for future use.

**Note:** In both the Ansible node and the VM Template, you might need to configure the network so one node can reach the other. Instructions for this step have been omitted since it is a basic step and could vary depending on the user’s environment.

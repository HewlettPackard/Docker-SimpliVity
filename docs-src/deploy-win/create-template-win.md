# Create the Windows Template

To create the Windows VM Template that you will use as the base for all your Windows worker nodes, you will first create a Virtual Machine with the OS installed and then convert the Virtual Machine to a VM Template. The VM Template is created as lean as possible, with any additional software installs and/or system configuration performed subsequently using Ansible.

As the creation of the template is a one-off task, this procedure has not been automated. The steps to create a VM template manually are outlined below.

Log in to vCenter and create a new Virtual Machine with the following characteristics:

-   Guest OS Family: Windows, Guest OS Version: Microsoft Windows Server 2016 (64-bit).
-   Hard Disk size: 100GB (Thin provisioning), 1 vCPU and 4 GB of RAM. Both vCPU and memory can be altered later after you deploy from this template.
-   A single network controller connected to the network or VLAN of your choice. All VMs will connect to this same network.
-   Change the network type to VMXNET3, and attach the Windows Server 2016 ISO image from a datastore ensuring you connect the CD/DVD drive on boot.
-   Click on the `VM Options` tab, and in the `Boot Options` section, select `Force BIOS setup(*)` to ensure that the machine enters the BIOS setup screen on next boot of this VM. This will allow you to adjust the boot order, placing the virtual CD-ROM in front of your hard drive.
-   Optionally you can remove the floppy drive.

Install Windows Server 2016:

-   Power on the selected VM and then `Open Console`.
-   Once connected to the console, you will be placed in the BIOS setup screen. Select the `Boot` tab, click on CD-ROM Drive and move up the CD-ROM drive above the hard drive. This allows your Windows Server 2016 ISO image to be loaded first on boot. Save your changes and exit.
-   Enter your choices for Language, Time/Currency Format, Keyboard and then select `Install Now`.
-   Select the OS you want to install, and then select `Custom: Install Windows Only`.
-   Select drive 0, the 100 GB drive you specified earlier, as the location for installing windows.
-   Add a password for the Administrator user.
-   Install VMware Tools and reboot.

Once the VM has re-booted:

-   Add a temporary network IP address and configure any proxy settings required to download Windows Updates.
-   Use the `sconfig` utility from (MS-DOS) command line to install Windows Updates and enable Remote Desktop.
-   Perform any other customizations you require at this point.

Prior to converting the VM to Template, run Sysprep: `C:\Windows\System32\Sysprep\Sysprep.exe`.

-   Ensure ‘System Out-of-Box Experience (OOBE)’ is selected.
-   Select the ‘Generalize’ option.
-   Select ‘Shutdown’ from the Shutdown Options.

Shutdown the VM, and untick `Connect CD/DVD` so that the Windows Server 2016 ISO is no longer mounted. Boot the Windows VM one final time and enter regional settings applicable to your location and keyboard mapping, enter an Administrator user password then Shutdown VM.

**Note:** The `vmware_guest` module used by the playbooks will generate a new SID.

Turn the VM into a template by right-clicking on your VM and selecting `Template -> Convert to Template`. This will create a new template visible under VM Templates in Folders, ready for future use.
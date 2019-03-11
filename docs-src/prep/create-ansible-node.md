# Create the Ansible node

The Ansible node will act as the driver to automate the provisioning of the environment and it is essential that it is properly installed.

1.  Create a Virtual Machine and install your preferred OS (in this example, and for the sake of simplicity, RHEL 7 will be used). The rest of the instructions assume that, if you use a different OS, you understand the possible differences in syntax for the provided commands. If you use RHEL 7, select `Infrastructure Server` as the base environment and the `Guests Agents` add-on during the installation.

2.  Log in to the `root` account and create an SSH key pair. Do not protect the key with a passphrase (unless you want to use `ssh-agent`).

    ```
    # ssh-keygen
    ```

3.  Configure the following yum repositories, `rhel-7-server-rpms` and `rhel-7-server-extras-rpms` as explained in TODO LINK. The "extras" repo can be enabled as follows:

    ```
    # subscription-manager repos --enable=rhel-7-server-extras-rpms
    ```

4.  Configure the EPEL repository. For more information, see: [http://fedoraproject.org/wiki/EPEL](http://fedoraproject.org/wiki/EPEL). Note that `yum-config-manager` comes with the Infrastructure Server base environment. If you did not select this environment, you will have to install the `yum-utils` package.

    ```
    # rpm -ivh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm 
    # yum-config-manager --enable rhel-7-server-extras-rpms
    ```

5.  Install Ansible 2.7 or higher.

    ```
    # yum install ansible
    ```

6.  Install the following packages which are a mandatory requirement for the playbooks to function as expected. (Update `pip` if requested).

    ```
    # yum install python-pyvmomi python-netaddr python2-jmespath python-pip gcc python-devel openssl-devel git 
    # pip install --upgrade pip 
    # pip install cryptography 
    # pip install pysphere 
    # pip install --ignore-installed "pywinrm>=0.2.2"
    ```


## Configure the yum repositories

The Red Hat packages required during the deployment of the solution come from two repositories: `rhel-7-server-rpms`and `rhel-7-server-extras-rpms`. The first repository is on the Red Hat DVD but the second is not. There are two options, with both options requiring a Red Hat Network account. Logon to your VM template using SSH with the credentials you configured for the root account and then implement one of the two options below:

**Option 1:** Use Red Hat subscription manager to register your system. This is the easiest way and will automatically give you access to the official Red Hat repositories. Use the `subscription-manager register` command as follows.

```
# subscription-manager register --auto-attach
```

If you are behind a proxy, you must configure this before running the above command to register.

```
# subscription-manager config --server.proxy_hostname=<proxy IP> --server.proxy_port=<proxy port>
```

 Verify that you don't have the issue described here: [https://access.redhat.com/solutions/3317671](https://access.redhat.com/solutions/3317671) by entering the following command. 

```
# yum repolist
```

If you have the issue, fix it with the following command

```
# subscription-manager repos --disable=rhel-7-server-rt-beta-rpms
```

The playbooks will later automatically enable the `extras` repository on the VMs that need it.

**Option 2:** Use an internal repository. Instead of pulling the packages from Red Hat, you can create copies of the required repositories on a dedicated node. You can then configure the package manager to pull the packages from the dedicated node. Your `/etc/yum.repos.d/redhat.repo` could look as follows.

```

[RHEL7-Server]
name=Red Hat Enterprise Linux $releasever - $basearch
baseurl=http://yourserver.example.com/rhel-7-server-rpms/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release

[RHEL7-Server-extras]
name=Red Hat Enterprise Linux Extra pkg $releasever - $basearch
baseurl=http://yourserver.example.com/rhel-7-server-extras-rpms/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release

```

To see how you can create a local mirror of the Red Hat repositories and how to share them, check the Red Hat documentation at [https://access.redhat.com/solutions/23016](https://access.redhat.com/solutions/23016) and at [https://access.redhat.com/solutions/7227](https://access.redhat.com/solutions/7227).
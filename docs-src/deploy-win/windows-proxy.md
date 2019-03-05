# Deploying Windows workers behind a proxy

## Configuring the `winrm` remoting script

The playbooks for deploying Windows workers rely on a Powershell script for remote access from the Ansible machine. The script `ConfigureRemotingForAnsible.ps1` is available online on GitHub and you can configure the playbooks to use the script directly as follows:

```
windows_winrm_script: 'https://raw.githubusercontent.com/ansible/ansible/devel/examples/scripts/ConfigureRemotingForAnsible.ps1'
```

However, if the deployment is running behind a proxy, you may need to make this script available locally.

1.  Download the script:

    ```
    wget https://raw.githubusercontent.com/ansible/ansible/devel/examples/scripts/ConfigureRemotingForAnsible.ps1
    
    ```

2.  Deploy a local HTTP server, enabling port 80, for example:

    ```
    yum install httpd
    systemctl enable httpd
    systemctl start httpd
    firewall-cmd --permanent --add-port 80/tcp --zone=pubpic
    firewall-cmd --reload
    
    ```

3.  Copy the downloaded script to the web server:

    ```
    cp ConfigureRemotingForAnsible.ps1 /var/www/html
    
    ```

4.  Configure the variable to point at the local web server, for example,

    ```
    windows_winrm_script: 'http://10.10.174.230/ConfigureRemotingForAnsible.ps1'
    ```


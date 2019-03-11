# Appendix C: Enabling SSL between the universal forwarders and the Splunk indexers using your certificates

The procedure for enabling SSL between the universal forwarders and the Splunk indexers using your certificates is described below. In summary, the following steps are required:

1.  Set the variable `splunk_ssl` to `yes` in `group_vars/vars`
2.  Put your root CA certificate and your server certificate files in

    ```
    /root/Docker-SimpliVity/ops/files/splunk/linux/SPLUNK_HOME/etc/mycerts
    ```

3.  Uncomment the `[sslConfig]` stanza in the file `/files/splunk/linux/SPLUNK_HOME/etc/system/local/server.conf` 

## Limitations

SSL only works with Linux worker nodes. The Universal Forwarders verify that the indexers they connect to have a certificate signed by the configured root CA and that the Common Name in the certificate presented by the indexer matches its FQDN as listed by the variable

 `splunk_architecture_forward_servers`.

## Prerequisites

Configure your indexers to use SSL on port 9998. The following is an example `inputs.conf` file located in `$SPLUNK_HOME/etc/system/local` that enables SSL on port 9998 and configures the certificate file for use by the indexer itself, in this instance `/opt/splunk/etc/mycerts/indexer.pem`.

```
[splunktcp-ssl://9998]
disabled=0
connection_host = ip

[SSL]
serverCert=/opt/splunk/etc/mycerts/indexer.pem
#requireClientCert = true
#sslAltNameToCheck = forwarder,forwarder.cloudra.local

[tcp://1514]
connection_host = dns
sourcetype = ucp

```

For more information, see the documentation at [https://docs.splunk.com/Documentation/Splunk/7.1.2/Security/ConfigureSplunkforwardingtousesignedcertificates](https://docs.splunk.com/Documentation/Splunk/7.1.2/Security/ConfigureSplunkforwardingtousesignedcertificates). In addition, you can see how to create your own certificates and the content of the file designated with `serverCert` at [http://docs.splunk.com/Documentation/Splunk/7.1.2/Security/Howtoself-signcertificates](http://docs.splunk.com/Documentation/Splunk/7.1.2/Security/Howtoself-signcertificates).

In this instance, the folder `mycerts` was created under `/opt/splunk/etc` and the file `indexer.pem` was copied to this folder.

Indexers are configured with the Root CA cert used to sign all certificates. This can be achieved by editing the file `server.conf` in `$SPLUNK_HOME/etc/system/local` on your indexer(s). The following code block shows the relevant portion of this file where `sssRootCaPath` is pointing to the root CA certificate.

```
[sslConfig]
sslRootCAPath = /opt/splunk/etc/mycerts/ca.pem
```

**Note:** In order to be able to download and install additional applications, you may want to append the file `$SPLUNK_HOME/auth/appsCA.pem` to your `ca.pem` file. If you don't do this, the Splunk UI will make this suggestion when you attempt to `Find more apps`.

Splunk should be restarted on the indexers if you had to make these changes (see the Splunk documentation for more information).

## Before you deploy

Generate the forwarder certificate and name it `forwarder.pem`. Make sure that you copy the root CA certificate to `ca.pem`

Copy both the `ca.pem` and the `forwarder.pem` files to `files/splunk/linux/SPLUNK_HOME/etc/mycerts/` (overwriting any existing files).

Edit the file `server.conf` in the folder `files/splunk/linux/SPLUNK_HOME/etc/system/local` and uncomment the last two lines as suggested in the file itself. Your file should look like this:

```
#
# uncomment the section below if you want to enable SSL
#
[sslConfig]
sslRootCAPath = /opt/splunkforwarder/etc/mycerts/ca.pem
```

Set `splunk_ssl` to `yes` in the file `group_vars/vars`, uncommenting the line if required. Make sure that the `splunk_architecture_forward_servers` list specifies all your indexers together with the port that was configured to accept SSL:

```
monitoring_stack: splunk
splunk_ssl: yes
splunk_architecture_forward_servers:
- indexer1.cloudra.local:9998
- indexer2.cloudra.local:9998
```

## Hybrid environment Linux / Windows

Currently, you cannot deploy your own certificates for use by the Universal Forwarders deployed on Windows machines. If you want to have your Linux machines in a hybrid deployment to use SSL, proceed as follows.

Comment out the `splunk_architecture_forward_servers` variable (and its values) from `group_vars/vars`

```
monitoring_stack: splunk
splunk_ssl: yes
#splunk_architecture_forward_servers:
#  - hpe2-ansible.cloudra.local:9998
```

Create a file named `vms.yml` in the folder `group_vars` and specify the list of forward servers to use by the Linux servers. This list is typically the same as the one used for Windows servers but specifies a TCP port that enables SSL.

```
splunk_architecture_forward_servers:
- hpe2-ansible.cloudra.local:9998
```

Edit the `group_vars/win_worker.yml` file and specify the list of forward servers to be used by the Windows servers. This list is typically the same as the one used for Linux servers but specifies a TCP port that does not enable SSL.

```
splunk_architecture_forward_servers:
- hpe2-ansible.cloudra.local:9997
```
# Appendix B: Using customer supplied certificates for UCP and DTR

Table 32 lists the variables used when configuring customer supplied certificates for UCP and DTR.

**Table 32.** Customer certs variables

|Variable|File|Description|
|:-------|:---|:----------|
|ucp_certs_dir|group_vars/vars| -   If **ucp_certs_dir** is not defined, UCP is installed with self-signed certificates and DTR is installed with the `--ucp-insecure-tls` switch<br>- If **ucp_certs_dir** is defined, this is a folder on the Ansible machine that must contain 3 files:<br>  * `ca.pem`, the root CA certificate in PEM format<br>  *   `cert.pem`, the server certificate optionally followed by intermediate CAs<br>    *   `key.pem`, the private key that comes with the `cert.pem` certificates |
|dtr_certs_dir|group_vars/vars| -   If **dtr_certs_dir** is not defined, DTR is installed with self-signed certificates<br>-   If **dtr_certs_dir** is defined, this is a folder on the Ansible machine that must contain 3 files:<br>    *   `ca.pem`, the root CA certificate in PEM format<br>    *   `cert.pem`, the server certificate optionally followed by intermediate CAs<br>    *   `key.pem`, the private key that comes with the `cert.pem` certificates |

**Note:** 

The installation will fail if the `ca.pem`, `cert.pem` and `key.pem` files cannot be found in the folders designated by `dtr_certs_dir` and `ucp_certs_dir` or if they don't constitute valid certificates.

The certificates should specify the names of the FQDNs of the load balancer and the FQDNs of the VMs themselves. This applies to both the UCP server certificate and the DTR server certificate.

## Generating and testing certificates

In the example described here we have a root CA named `Example root CA` and an intermediate CA named `Intermediate CA valid 3 years`. The intermediate CA signs the server certificates for UCP and DTR.

Below is the start of the output displayed by running the `openssl x509` utility against the `ca.pem` file (the root CA certificate).

```

[root@ansible ucp_certs]# openssl x509 -text -noout -in ca.pem|head -14
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            0d:07:ca:ea:00:37:77:6e:25:e0:18:3e:0e:db:80:0f:11:cb:1b:3f
    Signature Algorithm: sha256WithRSAEncryption
        Issuer: CN=Example Root CA
        Validity
            Not Before: Apr 24 20:12:01 2018 GMT
            Not After : Apr 21 20:12:30 2028 GMT
        Subject: CN=Example Root CA
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (4096 bit)
```

Here is an excerpt from the example `ca.pem` file:

```
-----BEGIN CERTIFICATE-----
MIIFJTCCAw2gAwIBAgIUDQfK6gA3d24l4Bg+DtuADxHLGz8wDQYJKoZIhvcNAQEL
BQAwGjEYMBYGA1UEAxMPRXhhbXBsZSBSb290IENBMB4XDTE4MDQyNDIwMTIwMVoX
...
...
uXzYbCtU6Jt9B3fayAeWWswQv+jQSzuuA3re0M1x838iIZWDx93f4yLJWLJl7xsY
btvKBmqKDCsAqsQLFLnNj/JyYq4e9a6Xxcyn9FXNpzuEsfjfNGHn+csY+w3f987T
MNviy376xZbyAc1CV5kgmnZzjU5bDkgT8Q==
-----END CERTIFICATE-----
```

The `cert.pem` file should contain the server certificate itself, followed by your intermediate CA's certificate. The following example shows how to extract the intermediate CA certificate from `cert.pem` and to save it to a file named `intca.pem`. Using the `openssl x509` utility, you can display the content of the `intca.pem` file in human readable form. This certificate was signed by the example CA above (`Issuer = 'Example Root CA'`).

```
[root@ansible ucp_certs]# openssl x509 -text -noout -in intca.pem|head -14
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            6b:1e:0c:86:20:cf:f0:88:d2:52:0d:5d:b9:56:fa:91:87:a0:49:18
    Signature Algorithm: sha256WithRSAEncryption
        Issuer: CN=Example Root CA
        Validity
            Not Before: Apr 24 20:12:09 2018 GMT
            Not After : Apr 23 20:12:39 2021 GMT
        Subject: CN=Intermediate CA valid 3 years
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (4096 bit)
```

Here is an excerpt from the `incta.pem` file showing the example Intermediate CA certificate:

```
-----BEGIN CERTIFICATE-----
MIIFcjCCA1qgAwIBAgIUax4MhiDP8IjSUg1duVb6kYegSRgwDQYJKoZIhvcNAQEL
BQAwGjEYMBYGA1UEAxMPRXhhbXBsZSBSb290IENBMB4XDTE4MDQyNDIwMTIwOVoX
...
...
o2tL5nwR7ROiAr/kk9MIRzWrLNbc4cYth7jEjspU9dBqsXgsTozzWlwqI9ybZwvL
Ni1JnZandVlyQdoOaB2M/1DNFfKvwW3JeArKvDA9j95n/BWFTjoZ+YOz9pYit6T7
1GCGu3be
-----END CERTIFICATE-----
```

The `openssl x509` utility will only decrypt the first certificate found in `cert.pem`, so you don't need to extract the server certificate from `cert.pem`. In this example, the server certificate is signed by the intermediate CA above. Note the `Subject Alternate Names: hpe-ucp.cloudra.local` is the FQDN of the UCP load balancer, and the other names are those of the UCP instances (`hpe-ucp01.cloudra.local`, `hpe-ucp02.clodura.local`, `hpe-ucp03.cloudra.local`).

```
[root@ansible ucp_certs]# openssl x509 -text -noout -in server.pem
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            25:d9:f8:1d:9b:1d:23:f1:21:56:54:f2:43:cc:4f:0e:73:22:be:ec
    Signature Algorithm: sha256WithRSAEncryption
        Issuer: CN=Intermediate CA valid 3 years
        Validity
            Not Before: Apr 24 20:17:30 2018 GMT
            Not After : Apr 24 20:18:00 2019 GMT
        Subject: O=HPE, OU=CloudRA Team, CN=hpe-ucp.cloudra.local
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                CA Issuers - URI:http://localhost:8200/v1/intca
      ( portions removed )
 
            X509v3 Subject Alternative Name:
                DNS:hpe-ucp.cloudra.local, DNS:hpe-ucp01.cloudra.local, DNS:hpe-ucp02.cloudra.local, DNS:hpe-ucp03.cloudra.local
```

The following excerpts from `cert.pem` show the first certificate which is the server certificate itself and the second certificate which is the intermediate CA's certificate.

```
-----BEGIN CERTIFICATE-----
MIIFGTCCAwGgAwIBAgIUJdn4HZsdI/EhVlTyQ8xPDnMivuwwDQYJKoZIhvcNAQEL
BQAwKDEmMCQGA1UEAxMdSW50ZXJtZWRpYXRlIENBIHZhbGlkIDMgeWVhcnMwHhcN
...
...
s0R4I3Qnc50oNISng5l7wW1d4RMMwmXQhG1H5QKAUjHfJXH4bNtIzKxw/zGTVr4Z
llYKbEwJcgAvvfkn+w==
-----END CERTIFICATE-----
```

```
-----BEGIN CERTIFICATE-----
MIIFcjCCA1qgAwIBAgIUax4MhiDP8IjSUg1duVb6kYegSRgwDQYJKoZIhvcNAQEL
BQAwGjEYMBYGA1UEAxMPRXhhbXBsZSBSb290IENBMB4XDTE4MDQyNDIwMTIwOVoX
...
...
Ni1JnZandVlyQdoOaB2M/1DNFfKvwW3JeArKvDA9j95n/BWFTjoZ+YOz9pYit6T7
1GCGu3be
-----END CERTIFICATE-----
```

Finally, here is an excerpt from `key.pem`, the private key that goes with the server certificate.

```
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA5rmmb52ufE80a3cXhY2HSRZNazb7/fipXY1rZ+U5+rJv9BN5
d/X3NTroSE8/PvoS/maGkHCnURGNqbu/G2umKN/tm/eSpDY861YnGWxj+bc0gtiU
...
...
A0SGidSMk3hFX1Iaftgx4EUGbrzZO7I8M5RO64U1aMFNFyj4XghJ2mZTdNelwNBw
pr/fYulyi5lYPalQHYH3OyvNqQQ3arEbTbZp8hEyY0gxtZRXmmaoqOY=
-----END RSA PRIVATE KEY-----
```

## Verify your certificates

The playbooks do not verify the validity of the certificate files you supply so you should verify them manually before you start your deployment.

### Verify that the private and the server cert match

On the Ansible box, run the following commands:

```
ckcert=$(openssl x509 -noout -modulus -in cert.pem | openssl md5)
ckkey=$(openssl rsa -noout -modulus -in key.pem| openssl md5)
if [ "$ckkey" == "$ckcert" ] ; then echo "Private key and Certificate match" ; else echo "STOP! Private Key and Certificate don't match" ; fi

```

### Verify that the server certificate was signed by the CA

Extract all but the first certificate from `cert.pem` ( i.e. extract the certs for the intermediate CA authorities) into the file `int.pem`

```
sed -e '1,/-----END CERTIFICATE-----/d' cert.pem >intca.pem
```

Combine `intca.pem` and `ca.pem` to form `cachain.pem`:

```
cat intca.pem ca.pem > cachain.pem
```

Finally, verify that `cert.pem` was signed by the CA or by an intermediate CA:

```
openssl verify -verbose -CAfile cachain.pem  cert.pem
```

A successful check will generate output similar to:

```
[root@ansible ucp_certs]# cat intca.pem ca.pem > cachain.pem
[root@ansible ucp_certs]# openssl verify -verbose -CAfile cachain.pem  cert.pem
cert.pem: OK
```

An unsuccessful check will generate output similar to:

```
[root@ansible ucp_certs]# openssl verify -verbose -CAfile cachain.pem  certsignedbyanotherca.pem
certsignedbyanotherca.pem: O = HPE, OU = CloudRA Team, CN = hpe-ucp.cloudra.local
error 20 at 0 depth lookup:unable to get local issuer certificate
```

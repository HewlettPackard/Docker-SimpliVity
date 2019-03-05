# Appendix D: How to check that certs were deployed correctly

The following commands should return the CA certificates used by UCP / DTR. This certificate is the same as the one pointed to by the `--cacert` switch.

```
# curl --cacert <ucp_certs_dir>/ca.pem https://<your ucp fqdn>/ca 
# curl --cacert <dtr_certs_dir>/ca.pem https://<your dtr fqdn>/ca

```

**Output 1**: certificates successfully deployed (content will depend on your own CA certificate)

```
-----BEGIN CERTIFICATE-----
MIIDyTCCArGgAwIBAgIUUeo+H6xGSB7/9gqq9T2SUwJPLggwDQYJKoZIhvcNAQEL
BQAwbDELMAkGA1UEBhMCRlIxFTATBgNVBAcTDFRoZSBJbnRlcm5ldDETMBEGA1UE
ChMKQ2hyaXN0b3BoZTEUMBIGA1UECxMLQ0EgU2VydmljZXMxGzAZBgNVBAMTEkNo
...
XkJ8WcsHocJO8J9J3RaWsM2BQc7wRntJc0kA7ooTH13OtQTP1jFcQp5xNdI4J3Mz
j9BAYERjkGqu7v9tfOem99oVGUal20pu4r73eWUm1mL948xuw6PgiRSLZrXhn/RS
uvFVnS/vPYJozOXIZA==
-----END CERTIFICATE-----
```

If the deployment was not successful, `curl` will output something like **Output 2.**

**Output 2**: certificates were not successfully deployed

```

curl: (60) Peer's Certificate issuer is not recognized.
More details here: http://curl.haxx.se/docs/sslcerts.html
...

```

## Enable certs for browser (Windows 2016 example)

Choose `Manage computer certificates` in the control panel as shown in Figure 33. 

![ "Manage computer certificates"][media-manage-computer-certificates-png]

**Figure 33.** Manage computer certificates

Import the `ca.pem` for UCP into the Trusted Root Certification Authorities, as shown in Figure 34.

![ "Import the ca.pem"][media-import-ca-pem-png]

**Figure 34.** Import the ca.pem

It should now show up in the list of certificates. You may need to restart your browser to see the green, secure lock symbol as shown in Figure 35.

![ "Secure HTTPS"][media-green-https-png]

**Figure 35.** Secure HTTPS


[media-manage-computer-certificates-png]:<../media/manage-computer-certificates.png> "Figure 33. Manage computer certificates"
[media-import-ca-pem-png]:<../media/import-ca-pem.png> "Figure 34. Import the ca.pem"
[media-green-https-png]:<../media/green-https.png> "Figure 35. Secure HTTPS"


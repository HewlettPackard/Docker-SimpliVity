# Environment configuration

All Environment-related variables are described in the table below.

|Variable|File|Description|
|--------|----|:----------|
|env|group_vars/vars|Dictionary containing all environment variables. It contains three entries described below. Please leave the proxy related settings empty if not required.|

-   `http_proxy`: HTTP proxy URL, such as `'http://15.184.4.2:8080'`. This variable defines the HTTP proxy URL if your environment is behind a proxy.
-   `https_proxy`: HTTPS proxy URL, such as `'http://15.184.4.2:8080'`. This variable defines the HTTPS proxy URL if your environment is behind a proxy.
-   `no_proxy`: List of hostnames or IPs that don't require proxy, such as `'localhost,127.0.0.1,.cloudra.local,10.10.174.'`



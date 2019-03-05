# Windows operating system and Docker EE

Docker Enterprise Edition for Windows Server (Docker EE) enables native Docker containers on Windows Server. This solution has been tested with Windows worker nodes running Windows Server 2016 and with Docker EE 17.06. More recent versions of Windows Server may work but have not been tested.

**Note:** 

Docker Universal Control Plane is not currently supported on Windows Server 1709 due to image incompatibility issues. For more information, see the Docker documentation [Install Docker Enterprise Edition for Windows Server](https://docs.docker.com/install/windows/docker-ee/)

This solution recommends that you only run Windows Server 2016 on your Windows worker nodes and that you install any required updates to your Windows nodes in a timely manner.

For information on how to update Docker EE on Windows Server 2016, see the Docker documentation [Update Docker EE](https://docs.docker.com/install/windows/docker-ee/#update-docker-ee)
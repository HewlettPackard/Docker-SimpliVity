# Introduction to deploying Windows workers

The `site.yml` playbook will automatically deploy any Windows workers declared in the inventory. The playbooks should run for approximately 70-80 minutes with 3 Windows workers added to the default deployment (depending on your server specifications and the size of your environment). The increase in running time is primarily due to the need to update Windows after creating the VMs.

This section described the functionality and configuration of the Windows-specific playbooks. It also details how to create the initial Windows template and how to manage deploying Windows worker nodes behind a proxy.
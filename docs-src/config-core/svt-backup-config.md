# HPE SimpliVity backup configuration

Variables related to configuring HPE SimpliVity backups are described in the following table.

|Variable|File|Description|
|:-------|:---|:----------|
|dummy_vm_prefix|group_vars/vars|In order to be able to backup the Docker volumes, a number of "dummy" VMs need to spin up. This variable will set a recognizable prefix for them.|
|docker_volumes_policy|group_vars/vars|Backup policy to use for the Docker volumes.|
|backup_policies|group_vars/vars|List of dictionaries containing the different backup policies to be used along with the scheduling information. Any number of backup policies can be created and they need to match the node_policy variables defined in the inventory. Times are indicated in minutes. All month calculations use a 30-day month. All year calculations use a 365-day year. The format is as follows:  |

```
backup_policies:
 - name: daily'   
   days: 'All'   
   start_time: '11:30'   
   frequency: '1440'   
   retention: '10080' 
 - name: 'hourly'   
   days: 'All'   
   start_time: '00:00'   
   frequency: '60'   
   retention: '2880'
```





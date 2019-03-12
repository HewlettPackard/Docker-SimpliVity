(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{153:function(e,t,a){e.exports=a.p+"assets/img/backup-virtual-machine.d51b96e0.png"},154:function(e,t,a){e.exports=a.p+"assets/img/backup-vm-details.59a68073.png"},155:function(e,t,a){e.exports=a.p+"assets/img/search-backups.bf40882a.png"},156:function(e,t,a){e.exports=a.p+"assets/img/restore-vm.a853d9e8.png"},157:function(e,t,a){e.exports=a.p+"assets/img/restore-vm-details.37f6aeef.png"},158:function(e,t,a){e.exports=a.p+"assets/img/browse-restored-vm.1d0eee08.png"},159:function(e,t,a){e.exports=a.p+"assets/img/vmdk-files.d1fceacf.png"},160:function(e,t,a){e.exports=a.p+"assets/img/move-to.fb63a90f.png"},161:function(e,t,a){e.exports=a.p+"assets/img/destination.56248a70.png"},162:function(e,t,a){e.exports=a.p+"assets/img/moved.f9625e3f.png"},307:function(e,t,a){"use strict";a.r(t);var s=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"hpe-simplivity-backups"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hpe-simplivity-backups","aria-hidden":"true"}},[e._v("#")]),e._v(" HPE SimpliVity backups")]),e._v(" "),s("h2",{attrs:{id:"backup-and-restore-docker-persistent-volumes-with-hpe-simplivity"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#backup-and-restore-docker-persistent-volumes-with-hpe-simplivity","aria-hidden":"true"}},[e._v("#")]),e._v(" Backup and restore Docker persistent volumes with HPE SimpliVity")]),e._v(" "),s("p",[e._v("In order to restore a Docker volume, you need to restore a special VM that has been deployed for the sole purpose of backing up Docker volumes. There is one such VM for each datastore defined in the datastores array in the "),s("code",[e._v("group_vars/vars")]),e._v(" file. By default, a single datastore is specified in the playbooks:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("datastores: ['Docker_HPE']\n")])])]),s("p",[s("strong",[e._v("Note:")]),e._v(" The use of a single datastore is recommended. If you have configured multiple datastores, you need to understand and keep track of how your Docker volumes are distributed across the datastores.")]),e._v(" "),s("p",[e._v("The name of the special VM follows the pattern <prefix>-in-dockervols-<Datastore> where:")]),e._v(" "),s("ul",[s("li",[e._v("<prefix> is the value of the variable "),s("code",[e._v("dummy_vm_prefix")]),e._v(" from the file "),s("code",[e._v("group_vars/vars")])]),e._v(" "),s("li",[e._v("<Datastore> is the name of the datastore")])]),e._v(" "),s("p",[e._v("For example, based on the default values in the scripts, the VM name would be "),s("code",[e._v("hpe-VM-in-dockervols-Docker_HPE")])]),e._v(" "),s("h2",{attrs:{id:"create-a-docker-volume"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#create-a-docker-volume","aria-hidden":"true"}},[e._v("#")]),e._v(" Create a Docker volume")]),e._v(" "),s("p",[e._v("To see any existing Docker volumes created using the vSphere driver, use the "),s("code",[e._v("docker volume ls")]),e._v(" command and limit the results to those volumes created using the vSphere driver. If you have already used the playbooks to install Prometheus for example, you may see a listing as follows:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("\n# docker volume ls | grep vsphere\nvsphere:latest      prom_hpe-db-data@Docker_HPE\n\n")])])]),s("p",[e._v("To create a Docker volume named "),s("code",[e._v("test_01")]),e._v(", you can use the "),s("code",[e._v("docker volume create")]),e._v(" command specifying the vSphere driver:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("\n# docker volume create -d vsphere test_01\ntest_01\n\n")])])]),s("p",[e._v("You can check that the volume exists using the "),s("code",[e._v("docker volume ls")]),e._v(" command:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("\n# docker volume ls | grep vsphere\nvsphere:latest      prom_hpe-db-data@Docker_HPE\nvsphere:latest      test_01@Docker_HPE\n\n")])])]),s("p",[e._v("You can attach a container to the volume and then add data to it by creating a text file with some arbitrary content:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('\n# docker run -it --rm -v test_01:/tmp alpine sh -c "echo some test data here > /tmp/foo.txt"\n\n')])])]),s("p",[e._v("If this is the first time you have used the "),s("code",[e._v("alpine")]),e._v(" image, you may see additional output relating to download of image layers:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("\nUnable to find image 'alpine:latest' locally\nlatest: Pulling from library/alpine\n88286f41530e: Already exists\nDigest: sha256:f006ecbb824d87947d0b51ab8488634bf69fe4094959d935c0c103f4820a417d\nStatus: Downloaded newer image for alpine:latest\n\n")])])]),s("p",[e._v("The container will exit once the shell command has run and any unnamed volumes will be removed. However, the named volume "),s("code",[e._v("test_01:/tmp")]),e._v(" will persist. To check that the data is still available after the container exited, spin up a new container and try to retrieve the data:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('\n# docker run -it --rm -v test_01:/tmp alpine sh -c "cat /tmp/foo.txt"\t\n\nsome test data here\n')])])]),s("h2",{attrs:{id:"automated-backup"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#automated-backup","aria-hidden":"true"}},[e._v("#")]),e._v(" Automated backup")]),e._v(" "),s("p",[e._v("By default, the special VM and any Docker volume in the "),s("code",[e._v("dockvols")]),e._v(" folder are backed up every hour. This is controlled by the following settings in the "),s("code",[e._v("group_vars/vars")]),e._v(" file.")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("\nbackup_policies:\n - name: 'hpe-gold'\n   days: 'All'\n   start_time: '00:00'\n   frequency: '60'\n   retention: '43200'\n\ndummy_vm_prefix: 'hpe-VM'\n\ndocker_volumes_policy: 'hpe-gold'\n\n")])])]),s("p",[e._v("The backup policy "),s("code",[e._v("hpe-gold")]),e._v(" is assigned to the special VM that is used to back up the Docker volumes. This policy specifies that a backup is taken every hour ("),s("code",[e._v("frequency: '60'")]),e._v(" means sixty minutes) while the backup is retained for one month ("),s("code",[e._v("retention: '43200'")]),e._v(" means 43200 minutes or thirty days).")]),e._v(" "),s("h2",{attrs:{id:"manual-backup"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#manual-backup","aria-hidden":"true"}},[e._v("#")]),e._v(" Manual backup")]),e._v(" "),s("p",[e._v("Rather than waiting for an automated backup to take place, you can create a backup immediately. Right-click on the special VM, in this case "),s("code",[e._v("hpe-VM-in-dockervols-Docker_HPE")]),e._v(", select "),s("code",[e._v("All HPE SimpliVity Actions")]),e._v(" and choose "),s("code",[e._v("Backup Virtual Machine")]),e._v(" as shown in Figure 22.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(153),alt:' "Backup virtual machine"',title:"Figure 22. Backup virtual machine"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure 22.")]),e._v(" Backup virtual machine")]),e._v(" "),s("p",[e._v("You can specify a backup name, in this case "),s("code",[e._v("manual_backup_test_01")]),e._v(", as shown in Figure 23.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(154),alt:' "Backup virtual machine details"',title:"Figure 23. Backup virtual machine details"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure 23.")]),e._v(" Backup virtual machine details")]),e._v(" "),s("h2",{attrs:{id:"restore"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#restore","aria-hidden":"true"}},[e._v("#")]),e._v(" Restore")]),e._v(" "),s("p",[e._v("Right-click on the special VM, in this case "),s("code",[e._v("hpe-VM-in-dockervols-Docker_HPE")]),e._v(". On the "),s("code",[e._v("Configure")]),e._v(" tab, select "),s("code",[e._v("HPE SimpliVity Search Backups")]),e._v(" as shown in Figure 24.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(155),alt:' "Search backups"',title:"Figure 24. Search backups"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure 24.")]),e._v(" Search backups")]),e._v(" "),s("p",[e._v("You can narrow the search based on the time of the backup. If you are restoring from an automatic backup, the name will be the timestamp of the backup. If you are restoring from a manual backup, the name will be the one you specified earlier when creating the backup, in this case "),s("code",[e._v("manual_backup_test_01")]),e._v(".")]),e._v(" "),s("p",[e._v("Right-click on the backup you wish to restore, as shown in Figure 25, and select "),s("code",[e._v("Restore Virtual Machine")]),e._v(".")]),e._v(" "),s("p",[s("img",{attrs:{src:a(156),alt:' "Restore virtual machine"',title:"Figure 25. Restore virtual machine"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure 25.")]),e._v(" Restore virtual machine")]),e._v(" "),s("p",[e._v("In the details screen, shown in Figure 26, you can choose a name for the new virtual machine and specify the datastore.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(157),alt:' "Restore virtual machine details"',title:"Figure 26. Restore virtual machine details"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure 26.")]),e._v(" Restore virtual machine details")]),e._v(" "),s("p",[e._v("The name of the new virtual machine will default to a combination of the special VM name and a timestamp, in this instance "),s("code",[e._v("hpe-VM-in-dockervols-Docker_HPE-2018-11-26-20h47m01s")]),e._v(". The datastore should be the one specified in the datastores array from the "),s("code",[e._v("group_vars/vars")]),e._v(" file. Click OK to restore the virtual machine.")]),e._v(" "),s("p",[e._v("Once the virtual machine has been restored, navigate to the datastore and locate the new VM in the file browser, as shown in Figure 27.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(158),alt:' "Browse for restored virtual machine"',title:"Figure 27. Browse for restored virtual machine"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure 27.")]),e._v(" Browse for restored virtual machine")]),e._v(" "),s("p",[e._v("Navigate to the folder named "),s("code",[e._v("1111111-1111-1111-1111-...")]),e._v(" as shown in Figure 28. You will see files with names based on the Docker volume name that you used at the start, in this instance "),s("code",[e._v("test_01.vmdk")]),e._v(" and "),s("code",[e._v("test_01-478...f1f.vmfd")])]),e._v(" "),s("p",[s("img",{attrs:{src:a(159),alt:' "Locate vmdk and vmfd files"',title:"Figure 28. Locate vmdk and vmfd files"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure 28.")]),e._v(" Locate vmdk and vmfd files")]),e._v(" "),s("p",[e._v("You need to move these two files to the "),s("code",[e._v("dockvols")]),e._v(" sub-directory named "),s("code",[e._v("1111111-1111-1111-1111-...")]),e._v(" in the same datastore. Right click on the "),s("code",[e._v(".vmdk")]),e._v(" file and choose "),s("code",[e._v("Move to...")]),e._v(" as shown in Figure 29.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(160),alt:' "Move files"',title:"Figure 29. Move files"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure 29.")]),e._v(" Move files")]),e._v(" "),s("p",[e._v("Set the destination folder to the "),s("code",[e._v("dockvols")]),e._v(" sub-directory named "),s("code",[e._v("1111111-1111-1111-1111-...")]),e._v(" as shown in Figure 30.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(161),alt:' "Move to destination"',title:"Figure 30. Move to destination"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure 30.")]),e._v(" Move to destination")]),e._v(" "),s("p",[e._v("It is only necessary to move the "),s("code",[e._v(".vmdk")]),e._v(" file as the "),s("code",[e._v(".vmfd")]),e._v(" file will automatically follow. The "),s("code",[e._v("dockvols")]),e._v(" sub-directory named "),s("code",[e._v("1111111-1111-1111-1111-...")]),e._v(" should now contain both files as shown in Figure 31.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(162),alt:' "Files moved to destination"',title:"Figure 31. Files moved to destination"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure 31.")]),e._v(" Files moved to destination")]),e._v(" "),s("h3",{attrs:{id:"test-the-restore"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#test-the-restore","aria-hidden":"true"}},[e._v("#")]),e._v(" Test the restore")]),e._v(" "),s("p",[e._v("You can check that the volume "),s("code",[e._v("test_01")]),e._v(" has been restored by using the "),s("code",[e._v("docker volume ls")]),e._v(" command again.")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("# docker volume ls | grep vsphere\n\nvsphere:latest      prom_hpe-db-data@Docker_HPE\nvsphere:latest      test_01@Docker_HPE\n")])])]),s("p",[e._v("You can verify that the volume contains the correct data by spinning up a container and running a shell command:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('# docker run -it --rm -v test_01:/tmp alpine sh -c "cat /tmp/foo.txt"\n\nsome test data here\n')])])]),s("p",[e._v("The data you entered in the text file before performing the backup and deleting the volume is available once again after restoring the volume.")])])}],o=a(0),r=Object(o.a)({},function(){this.$createElement;this._self._c;return this._m(0)},s,!1,null,null,null);r.options.__file="simplivity-backups.md";t.default=r.exports}}]);
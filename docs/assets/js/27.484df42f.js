(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{286:function(t,e,a){"use strict";a.r(e);var s=a(0),i=Object(s.a)({},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),a("p",[t._v("The playbooks support backing up the swarm, UCP, DTR metadata and DTR images.")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._m(8),t._v(" "),t._m(9),t._m(10),t._v(" "),t._m(11),t._v(" "),t._m(12),t._m(13),t._v(" "),t._m(14),a("p",[a("strong",[t._v("Warning: Online versus offline backups:")]),t._v(" By default, the playbook performs online backups. You can take offline backups by setting the variable "),a("code",[t._v("swarm_backup_offline")]),t._v(" to "),a("code",[t._v('"true"')]),t._v(". The playbook will then stop the Docker daemon on the machine used to take the backup (a manager or UCP node). Before it does so, the playbook will verify that enough managers are running in the cluster to maintain the quorum. If this is not the case, the playbook will exit with an error. For more information, see the Docker documentation at "),a("a",{attrs:{href:"https://docs.docker.com/engine/swarm/admin_guide/#recover-from-disasterv",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://docs.docker.com/engine/swarm/admin_guide/#recover-from-disasterv"),a("OutboundLink")],1)]),t._v(" "),t._m(15),t._v(" "),a("p",[t._v("When you backup UCP, you save the data/metadata outlined in Table 22:")]),t._v(" "),t._m(16),t._v(" "),a("table",[t._m(17),t._v(" "),a("tbody",[t._m(18),t._v(" "),t._m(19),t._v(" "),t._m(20),t._v(" "),t._m(21),t._v(" "),t._m(22),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Volumes")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("All "),a("a",{attrs:{href:"https://docs.docker.com/datacenter/ucp/2.2/guides/architecture/#volumes-used-by-ucp",target:"_blank",rel:"noopener noreferrer"}},[t._v("UCP named volumes"),a("OutboundLink")],1),t._v(", which include all UCP component certs and data")])])])]),t._v(" "),t._m(23),t._v(" "),t._m(24),t._m(25),t._v(" "),t._m(26),t._m(27),t._v(" "),t._m(28),t._v(" "),t._m(29),t._m(30),t._v(" "),t._m(31),t._m(32),t._v(" "),a("p",[t._v("For more information on UCP backup, see the Docker documentation at "),a("a",{attrs:{href:"https://docs.docker.com/ee/ucp/admin/backups-and-disaster-recovery/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://docs.docker.com/ee/ucp/admin/backups-and-disaster-recovery/"),a("OutboundLink")],1)]),t._v(" "),t._m(33),t._v(" "),a("p",[t._v("When you backup DTR, you save the data/metadata outlined in Table 23:")]),t._v(" "),t._m(34),t._v(" "),t._m(35),t._v(" "),t._m(36),t._v(" "),t._m(37),t._m(38),t._v(" "),t._m(39),t._m(40),t._v(" "),t._m(41),t._v(" "),t._m(42),t._m(43),t._v(" "),t._m(44),a("p",[t._v("For more information on DTR backups, see the Docker documentation at "),a("a",{attrs:{href:"https://docs.docker.com/ee/dtr/admin/disaster-recovery/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://docs.docker.com/ee/dtr/admin/disaster-recovery/"),a("OutboundLink")],1)]),t._v(" "),t._m(45),t._v(" "),t._m(46),t._v(" "),t._m(47),t._m(48),t._v(" "),t._m(49),t._m(50),t._v(" "),t._m(51),t._v(" "),t._m(52),t._m(53),t._v(" "),t._m(54),a("p",[t._v("For more information on DTR backups, see the Docker documentation at "),a("a",{attrs:{href:"https://docs.docker.com/ee/dtr/admin/disaster-recovery/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://docs.docker.com/ee/dtr/admin/disaster-recovery/"),a("OutboundLink")],1)]),t._v(" "),t._m(55),t._v(" "),t._m(56),t._v(" "),t._m(57),t._v(" "),t._m(58),t._v(" "),t._m(59),t._m(60),t._v(" "),t._m(61),t._v(" "),t._m(62),t._v(" "),t._m(63),t._v(" "),t._m(64),t._v(" "),t._m(65),t._m(66),t._v(" "),t._m(67)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"backup-ucp-and-dtr"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#backup-ucp-and-dtr","aria-hidden":"true"}},[this._v("#")]),this._v(" Backup UCP and DTR")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"backup-configuration-variables"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#backup-configuration-variables","aria-hidden":"true"}},[this._v("#")]),this._v(" Backup configuration variables")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The following table shows the variables related to backing up UCP and DTR. All these variables are defined in the file "),e("strong",[this._v("group_vars/backups")]),this._v(". All the data that is backed up is streamed over an SSH connection to the backup server. Currently, the playbooks only support the use of the Ansible box as the backup server.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("Table 21.")]),this._v(" Backup variables")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("Variable")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("File")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("backup_server")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("strong",[t._v("group_vars/backups")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Currently, the playbooks only support the use of the Ansible box as the backup server.")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("backup_dest")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("strong",[t._v("group_vars/backups")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("This variable should point to an existing folder on your Ansible box where the "),a("code",[t._v("root")]),t._v(" user has write access. All the backups will be stored in this folder. For example, "),a("code",[t._v("/root/backup")])])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("backup_passphrase")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("strong",[t._v("group_vars/vault")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("This variable is used to encrypt the tar file with a passphrase that must be at least 12 characters long.")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("#swarm_offline_backups")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("strong",[t._v("group_vars/backups")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("This variable is commented out by default. More information on this variable is provided below.")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"backing-up-the-swarm"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#backing-up-the-swarm","aria-hidden":"true"}},[this._v("#")]),this._v(" Backing up the Swarm")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("When you backup the swarm, your services and stack definitions are backed up together with the networks definitions. However, Docker volumes or their contents will not be backed up. (If Docker volumes are defined in stacks, they will be re-created when you restore the stacks, but their content will be lost). You can backup the swarm using the playbook named "),e("code",[this._v("backup_swarm.yml")]),this._v(" which is located in the "),e("code",[this._v("playbooks")]),this._v(" folder on your Ansible server. The playbook is invoked as follows:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("# ansible-playbook -i vm_hosts playbooks/backup_swarm.yml\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("This playbook creates two archives in the folder specified by the variable "),e("code",[this._v("backup_dest")]),this._v(" in "),e("code",[this._v("group_vars/backups")]),this._v(". By default, the file is named using the following pattern:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("<backup_dest>/backup_swarm_<vmname>_<timestamp>.tgz\n<backup_dest>/backup_swarm_<vmname>_<timestamp>.vars.tgz\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("<vmname>")]),this._v(" is the name of the host (in the inventory) that was used to take the backup, and "),e("code",[this._v("<timestamp>")]),this._v(" is the time at which the backup was taken. The file with the extension "),e("code",[this._v(".vars.tgz")]),this._v(" contains information regarding the system that was backed up.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("You can override the generated file name by defining the variable "),e("strong",[this._v("backup_name")]),this._v(" on the command line when running the playbook. In the example below:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("# ansible-playbook -i vm_hosts playbooks/backup_swarm.yml -e backup_name=my_swarm_backup\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The generated files won't have "),e("code",[this._v("<vmname>")]),this._v(" or "),e("code",[this._v("<timestamp>")]),this._v(" appended:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("<backup_dest>/my_swarm_backup.tgz\n<backup_dest>/my_swarm_backup.vars.tgz\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"backing-up-the-universal-control-plane-ucp"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#backing-up-the-universal-control-plane-ucp","aria-hidden":"true"}},[this._v("#")]),this._v(" Backing up the Universal Control Plane (UCP)")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("Table 22.")]),this._v(" UCP data backed up")])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[this._v("Data")]),this._v(" "),e("th",{staticStyle:{"text-align":"left"}},[this._v("Description")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{staticStyle:{"text-align":"left"}},[this._v("Configurations")]),this._v(" "),e("td",{staticStyle:{"text-align":"left"}},[this._v("The UCP cluster configurations, as shown by "),e("code",[this._v("docker config ls")]),this._v(", including Docker EE license and swarm and client CAs")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{staticStyle:{"text-align":"left"}},[this._v("Access control")]),this._v(" "),e("td",{staticStyle:{"text-align":"left"}},[this._v("Permissions for team access to swarm resources, including collections, grants, and roles")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{staticStyle:{"text-align":"left"}},[this._v("Certificates and keys")]),this._v(" "),e("td",{staticStyle:{"text-align":"left"}},[this._v("The certificates, public keys, and private keys that are used for authentication and mutual TLS communication")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{staticStyle:{"text-align":"left"}},[this._v("Metrics data")]),this._v(" "),e("td",{staticStyle:{"text-align":"left"}},[this._v("Monitoring data gathered by UCP")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{staticStyle:{"text-align":"left"}},[this._v("Organizations")]),this._v(" "),e("td",{staticStyle:{"text-align":"left"}},[this._v("Your users, teams, and orgs")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("To make a backup of UCP, use "),e("code",[this._v("playbook/backup_ucp.yml")]),this._v(" as follows:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("# ansible-playbook -i vm_host playbooks/backup_ucp.yml\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("This playbook creates two archives in the folder specified by the variable "),e("code",[this._v("backup_dest")]),this._v(" in "),e("code",[this._v("group_vars/backups")]),this._v(". By default, the files are named using the following pattern:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("<backup_dest>/backup_ucp_<ucpid>_<vmname>_<timestamp>.tgz\n<backup_dest>/backup_ucp_<ucpid>_<vmname>_<timestamp>.vars.tgz\n")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[a("code",[t._v("<ucpid>")]),t._v(" is the ID of the UCP instance, "),a("code",[t._v("<vmname>")]),t._v(" is the name of the host (in the inventory) that was used to take the backup, and "),a("code",[t._v("<timestamp>")]),t._v(" is the time at which the backup was taken. The file with the extension "),a("code",[t._v(".vars.tgz")]),t._v(" contains information regarding the system which was backed up.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("You can override the generated file name by defining the variable "),e("strong",[this._v("backup_name")]),this._v(" on the command line when running the playbook. In the example below:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("# ansible-playbook -i vm_hosts playbooks/backup_ucp.yml -e backup_name=my_ucp_backup\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The generated files won't have "),e("code",[this._v("<vmname>")]),this._v(" or "),e("code",[this._v("<timestamp>")]),this._v(" appended:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("<backup_dest>/my_ucp_backup.tgz\n<backup_dest>/my_ucp_backup.vars.tgz\n")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[a("strong",[t._v("Warning:")]),t._v(" To create a consistent backup, the backup command "),a("strong",[t._v("temporarily stops the UCP containers running on the node where the backup is being performed")]),t._v(". User resources, such as services, containers, and stacks are not affected by this operation and will continue to operate as expected. Any long-lasting "),a("code",[t._v("docker exec")]),t._v(", "),a("code",[t._v("docker logs")]),t._v(", "),a("code",[t._v("docker events")]),t._v(", or "),a("code",[t._v("docker attach")]),t._v(" operations on the affected manager node will be disconnected.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"backing-up-the-docker-trusted-registry-dtr"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#backing-up-the-docker-trusted-registry-dtr","aria-hidden":"true"}},[this._v("#")]),this._v(" Backing up the Docker Trusted Registry (DTR)")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("Table 23.")]),this._v(" DTR data backed up")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("Data")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Backed up?")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Configurations")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("DTR settings")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Repository metadata")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Metadata like image architecture and size")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Access control to repos and images")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Data about who has access to which images")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Notary data")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Signatures and digests for images that are signed")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Scan results")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Information about vulnerabilities in your images")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Certificates and keys")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("TLS certificates and keys used by DTR")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Image content")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("no")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Needs to be backed up separately, depends on DTR configuration")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Users, orgs, teams")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("no")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Create a UCP backup to backup this data")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Vulnerability database")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("no")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Can be re-downloaded after a restore")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("To make a backup of DTR metadata, use "),e("code",[this._v("playbook/backup_dtr_metadata.yml")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("# ansible-playbook -i vm_host playbooks/backup_dtr_metadata.yml\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("This playbook creates two archives in the folder specified by the variable "),e("code",[this._v("backup_dest")]),this._v(" in "),e("code",[this._v("group_vars/backups")]),this._v(". By default, the file is named using the following pattern:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("<backup_dest>/backup_dtr_meta_<replica_id>_<vmname>_<timestamp>.tgz\n<backup_dest>/backup_dtr_meta_<replica_id>_<vmname>_<timestamp>.vars.tgz\n")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[a("code",[t._v("<replica_id>")]),t._v(" is the ID of the DTR replica that was backed up, "),a("code",[t._v("<vmname>")]),t._v(" is the name of the host (in the inventory) that was used to take the backup, and "),a("code",[t._v("<timestamp>")]),t._v(" is the time at which the backup was taken. The file with the extension "),a("code",[t._v(".vars.tgz")]),t._v(" contains information regarding the system that was backed up.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("You can override the generated file name by defining the variable "),e("strong",[this._v("backup_name")]),this._v(" on the command line when running the playbook. In the example below:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("# ansible-playbook -i vm_hosts playbooks/backup_dtr_metadata.yml -e backup_name=my_dtr_metadata_backup\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The generated files won't have "),e("code",[this._v("<vmname>")]),this._v(" or "),e("code",[this._v("<timestamp>")]),this._v(" appended:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("<backup_dest>/my_dtr_metadata_backup.tgz\n<backup_dest>/my_dtr_metadata_backup.vars.tgz\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"backing-up-dtr-data-images"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#backing-up-dtr-data-images","aria-hidden":"true"}},[this._v("#")]),this._v(" Backing up DTR data (images)")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("To make a backup of the images that are inventoried in DTR and stored on the NFS server, use "),e("code",[this._v("playbooks/backup_dtr_images.yml")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("# ansible-playbook -i vm_host playbooks/backup_dtr_images.yml\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("This playbook creates two archives in the folder specified by the variable "),e("code",[this._v("backup_dest")]),this._v(" in "),e("code",[this._v("group_vars/backups")]),this._v(". By default, the files are named using the following pattern:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("<backup_dest>/backup_dtr_data_<replica_id>_<vmname>_<timestamp>.tgz\n<backup_dest>/backup_dtr_data_<replica_id>_<vmname>_<timestamp>.vars.tgz\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("<replica_id>")]),this._v(" is the ID of the DTR replica that was backed up, "),e("code",[this._v("<vmname>")]),this._v(" is the name of the host (in the inventory) that was used to take the backup, and "),e("code",[this._v("<timestamp>")]),this._v(" is the time at which the backup was taken.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("You can override the generated file names by defining the variable "),e("strong",[this._v("backup_name")]),this._v(" on the command line when running the playbook, as shown in the example below:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("# ansible-playbook -i vm_hosts playbooks/backup_dtr_images.yml -e backup_name=my_dtr_data_backup\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The generated files won't have "),e("code",[this._v("<vmname>")]),this._v(" or "),e("code",[this._v("<timestamp>")]),this._v(" appended:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("<backup_dest>/my_dtr_data_backup.tgz\n<backup_dest>/my_dtr_data_backup.vars.tgz\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"backing-up-other-metadata-including-passwords"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#backing-up-other-metadata-including-passwords","aria-hidden":"true"}},[this._v("#")]),this._v(" Backing up other metadata, including passwords")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The backup playbooks do not backup the sensitive data in your "),e("code",[this._v("group_vars/vault")]),this._v(" file. The information stored in the "),e("code",[this._v(".vars.tgz")]),this._v(" files includes backups of the following files:")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("strong",[t._v("vm_hosts")]),t._v(", a copy of the "),a("code",[t._v("vm_hosts")]),t._v(" file at the time the backup was taken")]),t._v(" "),a("li",[a("strong",[t._v("vars")]),t._v(", a copy of your "),a("code",[t._v("group_vars/vars")]),t._v(" file at the time the backup was taken")]),t._v(" "),a("li",[a("strong",[t._v("meta.yml")]),t._v(", a generated file containing information pertaining to the backup")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The "),e("strong",[this._v("meta.yml")]),this._v(" file contains the following information:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v('backup_node="<node that took the backup>"\nreplica_id="<ID of DTR replica if DTR backup>"\nbackup_source=""\nucp_version="<UCP version if UCP backup>"\ndtr_version="<DTR version of DTR backup>"\n')])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"backup-utility"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#backup-utility","aria-hidden":"true"}},[this._v("#")]),this._v(" Backup Utility")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The script "),e("code",[this._v("backup.sh")]),this._v(" can be used to take a backup of the swarm, UCP, DTR metadata and the DTR images in one go. You can pass this script an argument (tag) that will be used to prefix the backup filenames, thereby overriding the default naming. Table 24 shows the file names produced by "),e("code",[this._v("backup.sh")]),this._v(" based on the argument passed in the command line.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("Table 24.")]),this._v(" Backup utility")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("Example")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Command line")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Generated filenames")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Default")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("./backup.sh")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("backup_swarm_<vmname>"),a("em",[t._v("<timestamp>.tgz, backup_ucp")]),t._v("<ucpid>"),a("em",[t._v("<vmname>")]),t._v("<timestamp>.tgz, backup_dtr_meta_<replica_id>"),a("em",[t._v("<vmname>")]),t._v("<timestamp>.tgz, backup_dtr_data_<replica_id>"),a("em",[t._v("<vmname>")]),t._v("<timestamp>.tgz and the corresponding "),a("code",[t._v(".vars.tgz")]),t._v(" files")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Custom")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("./backup.sh my_backup")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("my_backup_swarm.tgz, my_backup_ucp.tgz, my_backup_dtr_meta.tgz, my_backup_dtr_data.tgz, and the corresponding "),a("code",[t._v(".vars.tgz")]),t._v(" files")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Date")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("./backup.sh $(date '+%Y_%m_%d_%H%M%S')")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("<date>_swarm.tgz, <date>_ucp.tgz, <date>_dtr_meta.tgz, <date>_dtr_data.tgz, and the corresponding "),a("code",[t._v(".vars.tgz")]),t._v(" files")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("In addition, the "),e("code",[this._v("backup.sh")]),this._v(" script accepts an optional switch that will let you specify the location of the password file that will be passed to the "),e("code",[this._v("ansible-playbook")]),this._v(" commands in the script. This is required if you have encrypted the "),e("code",[this._v("group_vars/vault")]),this._v(" file. The general syntax for this script is as follows:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("./backup.sh [ -v <Vault Password File> ] [ tag ]\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"related-playbooks"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#related-playbooks","aria-hidden":"true"}},[this._v("#")]),this._v(" Related playbooks")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("code",[t._v("playbooks/backup_swarm.yml")]),t._v(" is used to back up the swarm data")]),t._v(" "),a("li",[a("code",[t._v("playbooks/backup_ucp.yml")]),t._v(" is used to back up UCP")]),t._v(" "),a("li",[a("code",[t._v("playbooks/backup_dtr_meta.yml")]),t._v(" is used to back up DTR metadata")]),t._v(" "),a("li",[a("code",[t._v("playbooks/backup_dtr_images.yml")]),t._v(" is used to back up DTR images")])])}],!1,null,null,null);i.options.__file="backup-ucp-dtr.md";e.default=i.exports}}]);
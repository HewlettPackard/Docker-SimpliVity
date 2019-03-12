(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{179:function(e,t,n){e.exports=n.p+"assets/img/ucp-config-syslog.a311c9d8.png"},180:function(e,t,n){e.exports=n.p+"assets/img/esx-config-syslog.08a7d66f.png"},211:function(e,t,n){"use strict";n.r(t);var s=[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"splunk-configuration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#splunk-configuration","aria-hidden":"true"}},[this._v("#")]),this._v(" Splunk configuration")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("In the standalone deployment, you can enable SSL authentication between the universal forwarders and the indexers, by setting the "),n("code",[e._v("splunk_ssl")]),e._v(" variable to "),n("code",[e._v("yes")]),e._v(" in the file "),n("code",[e._v("group_vars/vars")]),e._v(". The built-in deployment does not support SSL and so, in this instance, the value of the "),n("code",[e._v("splunk_ssl")]),e._v(" variable is ignored. For more information on enabling SSL, see "),n("a",{attrs:{href:"#"}},[e._v("Appendix C")]),e._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"splunk-prerequisites"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#splunk-prerequisites","aria-hidden":"true"}},[this._v("#")]),this._v(" Splunk prerequisites")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("You should select the Splunk deployment type that you require by setting the variable "),n("code",[e._v("monitoring_stack")]),e._v(" in the "),n("code",[e._v("group_vars/vars")]),e._v(" file to either "),n("strong",[e._v("splunk")]),e._v(", for a standalone Splunk deployment, or "),n("strong",[e._v("splunk_demo")]),e._v(" for the built-in version. If you omit this variable, or if it has an invalid value, no Splunk deployment will be configured.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("files/splunk/windows/splunkforwarder-7.1.2.msi")]),this._v(" "),t("li",[this._v("files/splunk/linux/splunkforwarder-7.1.2.rpm")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("You need to set the variable "),t("code",[this._v("splunk_architecture_universal_forwarder_package")]),this._v(" to the name you selected for the package(s), not including the file extension. Depending on the Splunk deployment you have chosen, edit the file "),t("code",[this._v("templates/splunk/splunk/vars.yml")]),this._v(" or the file "),t("code",[this._v("templates/splunk/splunk_demo/vars.yml")]),this._v(" and set the variable, for example:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("splunk_architecture_universal_forwarder_package: 'splunkforwarder-7.1.2'\n\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("As of Splunk version 7.1, the Splunk universal forwarder must be deployed with a password. This password is specified using the variable "),t("code",[this._v("splunk_uf_password")]),this._v(" which is configured in "),t("code",[this._v("group_vars/vault")]),this._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("If you are using a standalone Splunk deployment, you must specify the list of indexers using the variable "),t("code",[this._v("splunk_architecture_forward_servers")]),this._v(" in "),t("code",[this._v("group_vars/vars")]),this._v(", for example:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("splunk_architecture_forward_servers:\n- splunk-indexer1.cloudra.local:9997\n- splunk-indexer2.cloudra.local:9997\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("To monitor the "),t("strong",[this._v("Windows worker nodes")]),this._v(", install the "),t("strong",[this._v("Splunk App for Windows Infrastructure")]),this._v(" on central Splunk along with its dependencies:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("If you want to use your own certificates in your standalone Splunk deployment to secure the communications between the indexers and the universal forwarders, see the subsequent section "),t("a",{attrs:{href:"#"}},[this._v("Enabling SSL")]),this._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("files/splunk/linux/SPLUNK_HOME")]),this._v(" "),t("li",[this._v("files/splunk/linux/DOCKER_TAS")]),this._v(" "),t("li",[this._v("files/splunk/windows/SPLUNK_HOME")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"configuring-syslog-in-ucp"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#configuring-syslog-in-ucp","aria-hidden":"true"}},[this._v("#")]),this._v(" Configuring syslog in UCP")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("In order to see some data in the UCP operational dashboard, you need to have UCP send its logs to the VM configured in the [logger] group. For example, for the following "),t("code",[this._v("vm_host")]),this._v(" file:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("[logger]\nhpe-logger ip_addr='10.60.59.24/16' esxi_host='esxi-hpe-2.cloudra.local'\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("This will configure UCP to send its logs to "),t("code",[this._v("hpe-logger.cloudra.local:1514")]),this._v(". You need to select the TCP protocol as shown in the following diagram.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("img",{attrs:{src:n(179),alt:' "Configure Remote Syslog Server in UCP"',title:"Figure 13. Configure Remote Syslog Server in UCP"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("strong",[this._v("Figure 13.")]),this._v(" Configure Remote Syslog Server in UCP")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"configuring-syslog-in-esx"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#configuring-syslog-in-esx","aria-hidden":"true"}},[this._v("#")]),this._v(" Configuring syslog in ESX")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("This configuration must be done manually for each ESX server. The syslog server should be the server configured in the [logger] group in your "),t("code",[this._v("vm_hosts")]),this._v(" inventory. The protocol should be "),t("code",[this._v("tcp")]),this._v(" and the port "),t("code",[this._v("514")]),this._v(" as shown in Figure 14.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("img",{attrs:{src:n(180),alt:' "Configure Syslog on ESXi Hosts"',title:"Figure 14. Configure Syslog on ESXi Hosts"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("strong",[this._v("Figure 14.")]),this._v(" Configure Syslog on ESXi Hosts")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"limitations"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#limitations","aria-hidden":"true"}},[this._v("#")]),this._v(" Limitations")])}],r=n(0),o=Object(r.a)({},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[e._m(0),e._v(" "),n("p",[e._v('This solution supports two types of Splunk deployment. Firstly, there is a built-in deployment useful for demos and for getting up to speed with Splunk. Alternatively, the solution can be configured to interact with a standalone, production Splunk deployment that you set up independently. In this case, you must explicitly configure the universal forwarders with external "forward servers" (Splunk indexers), whereas this happens automatically with the built-in option.')]),e._v(" "),e._m(1),e._v(" "),e._m(2),e._v(" "),e._m(3),e._v(" "),n("p",[e._v("For both types of deployment, you need to download the Splunk Universal forwarder images/packages from "),n("a",{attrs:{href:"https://www.splunk.com/en_us/download/universal-forwarder.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://www.splunk.com/en_us/download/universal-forwarder.html"),n("OutboundLink")],1),e._v(". Packages are available for 64-bit Linux and 64-bit Windows 8.1/Windows 10. Download the RPM package for Linux 64-bit (2.6+ kernel Linux distributions) to "),n("code",[e._v("./files/splunk/linux")]),e._v(". If you are deploying Windows nodes, download the MSI package for Windows 64 bit to "),n("code",[e._v("./files/splunk/windows")]),e._v(". For a dual Linux/Windows deployment, the images and packages must have same name and version, along with the appropriate extensions, for example:")]),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),e._m(6),e._m(7),e._v(" "),e._m(8),e._v(" "),e._m(9),n("p",[e._v("By default, the indexers are configured in a single load balancing group. This can be changed by editing the file "),n("code",[e._v("outputs.conf.j2")]),e._v(" in the folder "),n("code",[e._v("templates/splunk/splunk/")]),e._v(". For more information on forwarding using Universal Forwarder, see the Splunk documentation at "),n("a",{attrs:{href:"http://docs.splunk.com/Documentation/Forwarder/7.1.2/Forwarder/Configureforwardingwithoutputs.conf",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://docs.splunk.com/Documentation/Forwarder/7.1.2/Forwarder/Configureforwardingwithoutputs.conf"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("p",[e._v("On your standalone Splunk installation, you need to install the following add-ons and apps.")]),e._v(" "),n("p",[e._v("To monitor "),n("strong",[e._v("Linux worker nodes")]),e._v(", the "),n("strong",[e._v("Docker app")]),e._v(" should be installed on central Splunk. More information on this Docker app can be found at "),n("a",{attrs:{href:"https://github.com/splunk/docker-itmonitoring",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/splunk/docker-itmonitoring"),n("OutboundLink")],1),e._v(" and at "),n("a",{attrs:{href:"https://hub.docker.com/r/splunk/universalforwarder/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/r/splunk/universalforwarder/"),n("OutboundLink")],1),e._v(".")]),e._v(" "),e._m(10),e._v(" "),n("ul",[n("li",[e._v("Splunk App for Windows Infrastructure version 1.4.4. The Splunk App for Windows Infrastructure is not compatible with the Splunk Add-on for Windows 5.0 at this time. See "),n("a",{attrs:{href:"https://splunkbase.splunk.com/app/1680/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://splunkbase.splunk.com/app/1680/"),n("OutboundLink")],1)]),e._v(" "),n("li",[e._v("Splunk Add-on for Microsoft Windows version 4.8.4 - see "),n("a",{attrs:{href:"https://splunkbase.splunk.com/app/742/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://splunkbase.splunk.com/app/742/"),n("OutboundLink")],1)]),e._v(" "),n("li",[e._v("Splunk Add-On for Microsoft Active Directory version 1.0.0 - see "),n("a",{attrs:{href:"https://splunkbase.splunk.com/app/3207/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://splunkbase.splunk.com/app/3207/"),n("OutboundLink")],1)]),e._v(" "),n("li",[e._v("Splunk Add-on for Microsoft Windows DNS version 1.0.1 (if this is not installed on central Splunk, you will see yellow icons on some dashboards with the message "),n("code",[e._v("eventtype wineventlog-dns does not exist or is disabled")]),e._v(") - see "),n("a",{attrs:{href:"https://splunkbase.splunk.com/app/3208/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://splunkbase.splunk.com/app/3208/"),n("OutboundLink")],1)]),e._v(" "),n("li",[e._v("Splunk Supporting Add-on for Active Directory version 2.1.7 (if this is not installed on central Splunk, you will see yellow icons on some dashboards with the message "),n("code",[e._v("eventtype wineventlog-ds does not exist or is disabled")]),e._v(") - see "),n("a",{attrs:{href:"https://splunkbase.splunk.com/app/1151/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://splunkbase.splunk.com/app/1151/"),n("OutboundLink")],1)])]),e._v(" "),e._m(11),e._v(" "),n("p",[e._v("You can specify advanced Splunk configuration in the following files:")]),e._v(" "),e._m(12),e._v(" "),n("p",[e._v("These files will be copied as-is to the systems running the universal forwarder.")]),e._v(" "),e._m(13),e._v(" "),e._m(14),e._v(" "),e._m(15),e._m(16),e._v(" "),e._m(17),e._v(" "),e._m(18),e._v(" "),e._m(19),e._v(" "),e._m(20),e._v(" "),e._m(21),e._v(" "),e._m(22),e._v(" "),n("p",[e._v("For more information, see the VMware documentation at "),n("a",{attrs:{href:"https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.security.doc/GUID-9F67DB52-F469-451F-B6C8-DAE8D95976E7.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.security.doc/GUID-9F67DB52-F469-451F-B6C8-DAE8D95976E7.html"),n("OutboundLink")],1),e._v(".")]),e._v(" "),e._m(23),e._v(" "),n("ul",[n("li",[e._v("The Dockerized Splunk App has a number of open issues\n"),n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/splunk/docker-itmonitoring/issues/19",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/splunk/docker-itmonitoring/issues/19"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/splunk/docker-itmonitoring/issues/20",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/splunk/docker-itmonitoring/issues/20"),n("OutboundLink")],1)])])]),e._v(" "),n("li",[e._v("The Docker events tab is not working")])])])},s,!1,null,null,null);o.options.__file="monitoring-config-splunk.md";t.default=o.exports}}]);
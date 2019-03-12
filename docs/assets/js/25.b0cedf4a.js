(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{300:function(e,t,s){"use strict";s.r(t);var r=s(0),i=Object(r.a)({},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[e._m(0),e._v(" "),s("p",[e._v("The procedure for enabling SSL between the universal forwarders and the Splunk indexers using your certificates is described below. In summary, the following steps are required:")]),e._v(" "),e._m(1),e._v(" "),e._m(2),e._v(" "),s("p",[e._v("SSL only works with Linux worker nodes. The Universal Forwarders verify that the indexers they connect to have a certificate signed by the configured root CA and that the Common Name in the certificate presented by the indexer matches its FQDN as listed by the variable")]),e._v(" "),e._m(3),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),e._m(6),s("p",[e._v("For more information, see the documentation at "),s("a",{attrs:{href:"https://docs.splunk.com/Documentation/Splunk/7.1.2/Security/ConfigureSplunkforwardingtousesignedcertificates",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://docs.splunk.com/Documentation/Splunk/7.1.2/Security/ConfigureSplunkforwardingtousesignedcertificates"),s("OutboundLink")],1),e._v(". In addition, you can see how to create your own certificates and the content of the file designated with "),s("code",[e._v("serverCert")]),e._v(" at "),s("a",{attrs:{href:"http://docs.splunk.com/Documentation/Splunk/7.1.2/Security/Howtoself-signcertificates",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://docs.splunk.com/Documentation/Splunk/7.1.2/Security/Howtoself-signcertificates"),s("OutboundLink")],1),e._v(".")]),e._v(" "),e._m(7),e._v(" "),e._m(8),e._v(" "),e._m(9),e._m(10),e._v(" "),s("p",[e._v("Splunk should be restarted on the indexers if you had to make these changes (see the Splunk documentation for more information).")]),e._v(" "),e._m(11),e._v(" "),e._m(12),e._v(" "),e._m(13),e._v(" "),e._m(14),e._v(" "),e._m(15),e._m(16),e._v(" "),e._m(17),e._m(18),e._v(" "),s("p",[e._v("Currently, you cannot deploy your own certificates for use by the Universal Forwarders deployed on Windows machines. If you want to have your Linux machines in a hybrid deployment to use SSL, proceed as follows.")]),e._v(" "),e._m(19),e._v(" "),e._m(20),e._m(21),e._v(" "),e._m(22),e._m(23),e._v(" "),e._m(24)])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"appendix-c-enabling-ssl-between-the-universal-forwarders-and-the-splunk-indexers-using-your-certificates"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#appendix-c-enabling-ssl-between-the-universal-forwarders-and-the-splunk-indexers-using-your-certificates","aria-hidden":"true"}},[this._v("#")]),this._v(" Appendix C: Enabling SSL between the universal forwarders and the Splunk indexers using your certificates")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ol",[s("li",[s("p",[e._v("Set the variable "),s("code",[e._v("splunk_ssl")]),e._v(" to "),s("code",[e._v("yes")]),e._v(" in "),s("code",[e._v("group_vars/vars")])])]),e._v(" "),s("li",[s("p",[e._v("Put your root CA certificate and your server certificate files in")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("/root/Docker-SimpliVity/ops/files/splunk/linux/SPLUNK_HOME/etc/mycerts\n")])])])]),e._v(" "),s("li",[s("p",[e._v("Uncomment the "),s("code",[e._v("[sslConfig]")]),e._v(" stanza in the file "),s("code",[e._v("/files/splunk/linux/SPLUNK_HOME/etc/system/local/server.conf")])])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"limitations"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#limitations","aria-hidden":"true"}},[this._v("#")]),this._v(" Limitations")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("code",[this._v("splunk_architecture_forward_servers")]),this._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"prerequisites"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites","aria-hidden":"true"}},[this._v("#")]),this._v(" Prerequisites")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Configure your indexers to use SSL on port 9998. The following is an example "),t("code",[this._v("inputs.conf")]),this._v(" file located in "),t("code",[this._v("$SPLUNK_HOME/etc/system/local")]),this._v(" that enables SSL on port 9998 and configures the certificate file for use by the indexer itself, in this instance "),t("code",[this._v("/opt/splunk/etc/mycerts/indexer.pem")]),this._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("[splunktcp-ssl://9998]\ndisabled=0\nconnection_host = ip\n\n[SSL]\nserverCert=/opt/splunk/etc/mycerts/indexer.pem\n#requireClientCert = true\n#sslAltNameToCheck = forwarder,forwarder.cloudra.local\n\n[tcp://1514]\nconnection_host = dns\nsourcetype = ucp\n\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("In this instance, the folder "),t("code",[this._v("mycerts")]),this._v(" was created under "),t("code",[this._v("/opt/splunk/etc")]),this._v(" and the file "),t("code",[this._v("indexer.pem")]),this._v(" was copied to this folder.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Indexers are configured with the Root CA cert used to sign all certificates. This can be achieved by editing the file "),t("code",[this._v("server.conf")]),this._v(" in "),t("code",[this._v("$SPLUNK_HOME/etc/system/local")]),this._v(" on your indexer(s). The following code block shows the relevant portion of this file where "),t("code",[this._v("sssRootCaPath")]),this._v(" is pointing to the root CA certificate.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("[sslConfig]\nsslRootCAPath = /opt/splunk/etc/mycerts/ca.pem\n")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[s("strong",[e._v("Note:")]),e._v(" In order to be able to download and install additional applications, you may want to append the file "),s("code",[e._v("$SPLUNK_HOME/auth/appsCA.pem")]),e._v(" to your "),s("code",[e._v("ca.pem")]),e._v(" file. If you don't do this, the Splunk UI will make this suggestion when you attempt to "),s("code",[e._v("Find more apps")]),e._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"before-you-deploy"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#before-you-deploy","aria-hidden":"true"}},[this._v("#")]),this._v(" Before you deploy")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Generate the forwarder certificate and name it "),t("code",[this._v("forwarder.pem")]),this._v(". Make sure that you copy the root CA certificate to "),t("code",[this._v("ca.pem")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Copy both the "),t("code",[this._v("ca.pem")]),this._v(" and the "),t("code",[this._v("forwarder.pem")]),this._v(" files to "),t("code",[this._v("files/splunk/linux/SPLUNK_HOME/etc/mycerts/")]),this._v(" (overwriting any existing files).")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Edit the file "),t("code",[this._v("server.conf")]),this._v(" in the folder "),t("code",[this._v("files/splunk/linux/SPLUNK_HOME/etc/system/local")]),this._v(" and uncomment the last two lines as suggested in the file itself. Your file should look like this:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("#\n# uncomment the section below if you want to enable SSL\n#\n[sslConfig]\nsslRootCAPath = /opt/splunkforwarder/etc/mycerts/ca.pem\n")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[e._v("Set "),s("code",[e._v("splunk_ssl")]),e._v(" to "),s("code",[e._v("yes")]),e._v(" in the file "),s("code",[e._v("group_vars/vars")]),e._v(", uncommenting the line if required. Make sure that the "),s("code",[e._v("splunk_architecture_forward_servers")]),e._v(" list specifies all your indexers together with the port that was configured to accept SSL:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("monitoring_stack: splunk\nsplunk_ssl: yes\nsplunk_architecture_forward_servers:\n- indexer1.cloudra.local:9998\n- indexer2.cloudra.local:9998\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"hybrid-environment-linux-windows"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#hybrid-environment-linux-windows","aria-hidden":"true"}},[this._v("#")]),this._v(" Hybrid environment Linux / Windows")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Comment out the "),t("code",[this._v("splunk_architecture_forward_servers")]),this._v(" variable (and its values) from "),t("code",[this._v("group_vars/vars")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("monitoring_stack: splunk\nsplunk_ssl: yes\n#splunk_architecture_forward_servers:\n#  - hpe2-ansible.cloudra.local:9998\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Create a file named "),t("code",[this._v("vms.yml")]),this._v(" in the folder "),t("code",[this._v("group_vars")]),this._v(" and specify the list of forward servers to use by the Linux servers. This list is typically the same as the one used for Windows servers but specifies a TCP port that enables SSL.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("splunk_architecture_forward_servers:\n- hpe2-ansible.cloudra.local:9998\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Edit the "),t("code",[this._v("group_vars/win_worker.yml")]),this._v(" file and specify the list of forward servers to be used by the Windows servers. This list is typically the same as the one used for Linux servers but specifies a TCP port that does not enable SSL.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("splunk_architecture_forward_servers:\n- hpe2-ansible.cloudra.local:9997\n")])])])}],!1,null,null,null);i.options.__file="appendix-c.md";t.default=i.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{245:function(e,t,s){"use strict";s.r(t);var n=s(0),i=Object(n.a)({},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[e._m(0),e._v(" "),e._m(1),e._v(" "),s("p",[e._v("To run the playbook:")]),e._v(" "),e._m(2),e._m(3),e._v(" "),e._m(4),e._m(5),e._v(" "),e._m(6),e._v(" "),s("p",[e._v("You can find the version number for the current stable version of "),s("code",[e._v("kubectl")]),e._v(" at "),s("a",{attrs:{href:"https://kubernetes.io/docs/tasks/tools/install-kubectl/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://kubernetes.io/docs/tasks/tools/install-kubectl/"),s("OutboundLink")],1),e._v(". At the time of writing, the stable version is "),s("code",[e._v("1.13")]),e._v(".")]),e._v(" "),e._m(7),e._v(" "),e._m(8),s("p",[e._v("More details on installing "),s("code",[e._v("kubectl")]),e._v(" are available at "),s("a",{attrs:{href:"https://kubernetes.io/docs/tasks/tools/install-kubectl/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://kubernetes.io/docs/tasks/tools/install-kubectl/"),s("OutboundLink")],1)])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"installing-kubectl"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#installing-kubectl","aria-hidden":"true"}},[this._v("#")]),this._v(" Installing kubectl")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[e._v("A convenience playbook is provided to make it easy to install "),s("code",[e._v("kubectl")]),e._v(". This playbook uses variables in "),s("code",[e._v("group_vars/vars")]),e._v(" to determine which version to download. The default version specified by the variable "),s("code",[e._v("kubectl_version")]),e._v(" in the sample variables file is "),s("code",[e._v("1.11.5")]),e._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("# cd ~/Docker-SimpliVity\n# ansible-playbook -i vm_hosts playbooks/install_kubectl.yml --vault-password-file .vault_pass\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Test the installation by running the "),t("code",[this._v("kubectl version")]),this._v(" command:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v('# kubectl version\n\nClient Version: version.Info{Major:"1", Minor:"11", GitVersion:"v1.11.5", GitCommit:"753b2dbc622f5cc417845f0ff8a77f539a4213ea", GitTreeState:"clean", BuildDate:"2018-11-26T14:41:50Z", GoVersion:"go1.10.3", Compiler:"gc", Platform:"linux/amd64"}\nThe connection to the server localhost:8080 was refused - did you specify the right host or port?\n')])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("The client version is reported correctly. However, "),t("code",[this._v("kubectl")]),this._v(" cannot connect to the server until you set up\na client bundle - this is described in the section titled "),t("code",[this._v("Installing the client bundle")]),this._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"manually-installing-kubectl"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#manually-installing-kubectl","aria-hidden":"true"}},[this._v("#")]),this._v(" Manually installing kubectl")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("The following is an example of manually downloading and installing a specific version of "),t("code",[this._v("kubectl")]),this._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v('# version=v1.10.4\n# wget -O kubectl https://storage.googleapis.com/kubernetes-release/release/${version}/bin/linux/amd64/kubectl\n# chmod +x ./kubectl\n# sudo mv ./kubectl /usr/local/bin/kubectl\n\n# kubectl version\nClient Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.4", GitCommit:"5ca598b4ba5abb89bb773071ce452e33fb66339d", GitTreeState:"clean", BuildDate:"2018-06-06T08:13:03Z", GoVersion:"go1.9.3", Compiler:"gc", Platform:"linux/amd64"}\n')])])])}],!1,null,null,null);i.options.__file="install-kubectl.md";t.default=i.exports}}]);
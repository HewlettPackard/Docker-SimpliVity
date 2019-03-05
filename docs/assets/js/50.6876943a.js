(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{286:function(e,o,t){"use strict";t.r(o);var r=t(0),n=Object(r.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"content"},[t("h1",{attrs:{id:"deploying-rhel-workers"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#deploying-rhel-workers","aria-hidden":"true"}},[e._v("#")]),e._v(" Deploying RHEL workers")]),e._v(" "),t("p",[e._v("By default, "),t("code",[e._v("site.yml")]),e._v(" will automatically deploy any RHEL (and / or Windows) worker nodes that are declared in the inventory.")]),e._v(" "),t("p",[e._v("If you subsequently want additional RHEL worker nodes, add them to the inventory as appropriate and then run the playbooks for Provisioning RHEL VMs, followed by the specific playbooks for RHEL worker nodes outlined below:")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("playbooks/scale_workers.yml")]),e._v(" installs and configures additional Linux workers on the target nodes defined by the group "),t("code",[e._v("worker")]),e._v(" in the "),t("code",[e._v("vm_hosts")]),e._v(" inventory.")])]),e._v(" "),t("p",[e._v("A utility script "),t("code",[e._v("scale_worker.sh")]),e._v(" is provided to assist you in adding worker nodes after the initial deployment.")])])}],!1,null,null,null);n.options.__file="add-rhel-workers.md";o.default=n.exports}}]);
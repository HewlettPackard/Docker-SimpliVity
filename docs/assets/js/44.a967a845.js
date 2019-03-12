(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{280:function(e,t,o){"use strict";o.r(t);var r=o(0),s=Object(r.a)({},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"content"},[e._m(0),e._v(" "),e._m(1),e._v(" "),e._m(2),e._v(" "),o("p",[e._v("The following example shows how to set Kubernetes as the default orchestrator for worker nodes, and how to over-ride the default to use Swarm on one specific node instead.")]),e._v(" "),e._m(3),o("p",[o("strong",[e._v("Note:")]),e._v(" The playbooks do not change Docker's default orchestrator type which is "),o("code",[e._v("swarm")]),e._v(". Instead, the inventory is used to configure worker nodes for Kubernetes workloads or swarm workloads as explained above. If you want to change the default orchestrator type, use the method explained in the Docker documentation at "),o("a",{attrs:{href:"https://docs.docker.com/ee/ucp/admin/configure/set-orchestrator-type/#set-the-default-orchestrator-type-for-new-nodes",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://docs.docker.com/ee/ucp/admin/configure/set-orchestrator-type/#set-the-default-orchestrator-type-for-new-nodes"),o("OutboundLink")],1),e._v(". It is possible to manually change the orchestrator type for a node. When you do this, existing workloads are evicted and they are not migrated automatically to the new orchestrator. If you want the workloads to be scheduled by the new orchestrator, you must migrate them manually. More information is available in the Docker documentation at "),o("a",{attrs:{href:"https://docs.docker.com/ee/ucp/admin/configure/set-orchestrator-type/#what-happens-when-you-change-a-nodes-orchestrator",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://docs.docker.com/ee/ucp/admin/configure/set-orchestrator-type/#what-happens-when-you-change-a-nodes-orchestrator"),o("OutboundLink")],1),e._v(".")])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"orchestrator-configuration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#orchestrator-configuration","aria-hidden":"true"}},[this._v("#")]),this._v(" Orchestrator configuration")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("The variable "),o("code",[e._v("orchestrator")]),e._v(" in the "),o("code",[e._v("[worker]")]),e._v(" group is used to specify if a worker node should be assigned to the Kubernetes orchestrator ("),o("code",[e._v("orchestrator: 'kubernetes'")]),e._v(") or to the Swarm orchestrator ("),o("code",[e._v("orchestrator: 'swarm'")]),e._v("). In general, you should only change the orchestrator for worker nodes.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("strong",[this._v("Note:")]),this._v(" Docker supports a third type, "),t("code",[this._v("mixed")]),this._v(", that enables workloads to be scheduled by both Kubernetes and Swarm on the same node. Mixing orchestrator types on the same node is not recommended for production deployments because of the likelihood of resource contention and so, these playbooks do not support the "),t("code",[this._v("mixed")]),this._v(" type.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("\n## WORKER\n[worker]\nhpe-worker01 ip_addr='10.60.59.21/16' esxi_host='esxi-hpe-1.cloudra.local'\nhpe-worker02 ip_addr='10.60.59.22/16' esxi_host='esxi-hpe-2.cloudra.local'\nhpe-worker03 ip_addr='10.60.59.23/16' esxi_host='esxi-hpe-3.cloudra.local' orchestrator=swarm\n \n[worker:vars]\ncpus='4'\nram='65536'\ndisk2_size='500'\norchestrator=kubernetes\n\n")])])])}],!1,null,null,null);s.options.__file="orchestrator-config.md";t.default=s.exports}}]);
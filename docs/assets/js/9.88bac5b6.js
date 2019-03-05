(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{163:function(e,t,a){e.exports=a.p+"assets/img/ucp-prometheus.f636fd0f.png"},164:function(e,t,a){e.exports=a.p+"assets/img/ucp-grafana.f07deadc.png"},233:function(e,t,a){"use strict";a.r(t);var s=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"ucp-metrics-in-prometheus"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ucp-metrics-in-prometheus","aria-hidden":"true"}},[e._v("#")]),e._v(" UCP metrics in Prometheus")]),e._v(" "),s("h2",{attrs:{id:"introduction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#introduction","aria-hidden":"true"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),s("p",[e._v("Docker EE 2.1 uses a built-in deployment of Prometheus to power the performance graphs in the web UI for UCP. The metrics that UCP generates can be routed to a separate Prometheus, if required. A convenience playbook has been provided to configure a minimal Prometheus and Grafana deployment that can help vizualize all of the metrics that UCP generates.")]),e._v(" "),s("p",[e._v("For more information on UCP cluster metrics, see the article at https://docs.docker.com/ee/ucp/admin/configure/collect-cluster-metrics/.")]),e._v(" "),s("h2",{attrs:{id:"prerequisites"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites","aria-hidden":"true"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),s("ul",[s("li",[e._v("Install the "),s("code",[e._v("kubectl")]),e._v(" binary on your Ansible box")]),e._v(" "),s("li",[e._v("Install the UCP Client bundle for the "),s("code",[e._v("admin")]),e._v(" user")]),e._v(" "),s("li",[e._v("Confirm that you can connect to the cluster by running a test command, for example, "),s("code",[e._v("kubectl get nodes")])])]),e._v(" "),s("h2",{attrs:{id:"deploy-prometheus-and-grafana"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#deploy-prometheus-and-grafana","aria-hidden":"true"}},[e._v("#")]),e._v(" Deploy Prometheus and Grafana")]),e._v(" "),s("p",[e._v("The playbook "),s("code",[e._v("playbooks/ucp-metrics-prometheus.yml")]),e._v(" deploys pods for Prometheus and Grafana and configures them\nto use the client bundle to access the UCP metrics. To run the playbook:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("# cd ~/Docker-SimpliVity\n# ansible-playbook -i vm_hosts playbooks/ucp-metrics-prometheus.yml --vault-password-file .vault_pass\n")])])]),s("h2",{attrs:{id:"prometheus-ui"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prometheus-ui","aria-hidden":"true"}},[e._v("#")]),e._v(" Prometheus UI")]),e._v(" "),s("p",[e._v("The playbook exposes a port to access the user interface for Prometheus - to find the port, get the details of the "),s("code",[e._v("prometheus")]),e._v(" service:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("# kubectl get svc prometheus\n\nNAME         TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE\nprometheus   NodePort   10.96.216.220   <none>        9090:34713/TCP   6d\n")])])]),s("p",[e._v("The Prometheus UI can be accessed on any node in your cluster, using the port returned by "),s("code",[e._v("kubectl get svc")]),e._v(". In this instance, it is accessed at "),s("code",[e._v("http://hpe2-ucp01.am2.cloudra.local:34713")]),e._v(".")]),e._v(" "),s("p",[s("img",{attrs:{src:a(163),alt:' "UCP metrics in Prometheus"',title:"Figure: UCP metrics in Prometheus"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure.")]),e._v(" UCP metrics in Prometheus")]),e._v(" "),s("h2",{attrs:{id:"using-grafana-to-vizualize-ucp-metrics"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#using-grafana-to-vizualize-ucp-metrics","aria-hidden":"true"}},[e._v("#")]),e._v(" Using Grafana to vizualize UCP metrics")]),e._v(" "),s("p",[e._v("The playbook also exposes a port to access the Grafana UI - to find the port, get the details of the "),s("code",[e._v("grafana")]),e._v(" service:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("# kubectl get svc grafana\n\nNAME      TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE\ngrafana   NodePort   10.96.177.108   <none>        3000:33118/TCP   6d\n")])])]),s("p",[e._v("The Grafana UI can be accessed on any node in your cluster, using the port returned by "),s("code",[e._v("kubectl get svc")]),e._v(". In this\ninstance, it is accessed at "),s("code",[e._v("http://hpe2-ucp01.am2.cloudra.local:33118")]),e._v(". The example UCP Dashboard is taken from\nhttps://grafana.com/dashboards/9309.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(164),alt:' "UCP Dashboard in Grafana"',title:"Figure: UCP Dashboard in Grafana"}})]),e._v(" "),s("p",[s("strong",[e._v("Figure.")]),e._v(" UCP Dashboard in Grafana")])])}],r=a(0),o=Object(r.a)({},function(){this.$createElement;this._self._c;return this._m(0)},s,!1,null,null,null);o.options.__file="ucp-metrics.md";t.default=o.exports}}]);
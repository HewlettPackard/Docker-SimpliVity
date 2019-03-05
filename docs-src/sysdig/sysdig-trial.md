# Registering for Sysdig trial

Hewlett Packard Enterprise has teamed up with Sysdig to offer a fully featured 90-day trial version of Sysdig Monitor and Secure as part of the HPE Express Containers with Docker Enterprise Edition on HPE SimpliVity. For more details on how to sign up, see the GitHub repository at [https://github.com/HewlettPackard/Docker-SimpliVity](https://github.com/HewlettPackard/Docker-SimpliVity).

Browse to the registration page at [https://sysdig.com/partner-hpe/](https://sysdig.com/partner-hpe/) as shown in Figure 4.

![ "Sysdig and HPE"][media-sysdig-hpe-png]

**Figure 4.** Sysdig and HPE

Scroll to the registration form at the bottom of the page, as shown in Figure 5.

![ "Sysdig trial registration"][media-sysdig-registration-png]

**Figure 5.** Sysdig trial registration

After completing and submitting the form, you will receive an email containing an activation link, as shown in Figure 6.

![ "Sysdig email"][media-sysdig-email-png]

**Figure 6.** Sysdig email

Clicking on the activation link will bring you to the Sysdig Monitor welcome page, as shown in Figure 7.

![ "Sysdig Monitor welcome page"][media-sysdig-monitor-welcome-png]

**Figure 7.** Sysdig Monitor welcome page

Click the `Next` button to set up you environment, as shown in Figure 8.

![ "Sysdig Monitor set up environment"][media-sysdig-setup-env-png]

**Figure 8.** Sysdig Monitor set up environment

### Sysdig Monitoring for Kubernetes

If you are deploying Sysdig monitoring on Kubernetes, select the `Kubernetes | GKE | OpenShift` option. You will be presented with an access code, as shown in Figure 9.

![ "Sysdig Monitor access code for Kubernetes"][media-sysdig-k8s-png]

**Figure 9.** Sysdig Monitor access code for Kubernetes

Use the `sysdig_access_key` field in your `group_vars/vault`, as described in the section `Sysdig configuration for Kubernetes`. Once you deploy your environment and your Kubernetes nodes connect to the Sysdig SaaS platform, Sysdig will automatically display information regarding your setup, as shown in Figure 10.

![ "Sysdig Monitor Spotlight for Kubernetes"][media-sysdig-k8s-spotlight-png]

**Figure 10.** Sysdig Monitor Spotlight for Kubernetes

Select `View Dashboard` for an entry point to accessing all your monitoring data. Alternatively, you can browse to [https://app.sysdigcloud.com](https://app.sysdigcloud.com) at any time to access your dashboards.

### Sysdig Monitor for Docker swarm

If you are deploying Sysdig monitoring on Docker swarm, select the `Non-Orchestrated: **Native Linux**` option. You will be presented with a screen containing details for the URL to download the Sysdig agent, along with your access code embedded in the command, as shown in Figure 11.

![ "Sysdig Monitor download location and access code for Docker"][media-sysdig-docker-png]

**Figure 11.** Sysdig Monitor download location and access code for Docker

The download URL is used in the `sysdig_agent` field in `group_vars/vars` while the access code is stored in the `sysdig_access_key` field in your `group_vars/vault`, as described in the section `Sysdig configuration for Docker swarm`.

Once you deploy your environment and your Docker swarm nodes connect to the Sysdig SaaS platform, Sysdig will automatically display information regarding your setup. Alternatively, you can browse to [https://app.sysdigcloud.com](https://app.sysdigcloud.com) at any time to access your dashboards.



[media-sysdig-hpe-png]:<../media/sysdig-hpe.png> "Figure 4. Sysdig and HPE"
[media-sysdig-registration-png]:<../media/sysdig-registration.png> "Figure 5. Sysdig trial registration"
[media-sysdig-email-png]:<../media/sysdig-email.png> "Figure 6. Sysdig email"
[media-sysdig-monitor-welcome-png]:<../media/sysdig-monitor-welcome.png> "Figure 7. Sysdig Monitor welcome page"
[media-sysdig-setup-env-png]:<../media/sysdig-setup-env.png> "Figure 8. Sysdig Monitor set up environment"
[media-sysdig-k8s-png]:<../media/sysdig-k8s.png> "Figure 9. Sysdig Monitor access code for Kubernetes"
[media-sysdig-k8s-spotlight-png]:<../media/sysdig-k8s-spotlight.png> "Figure 10. Sysdig Monitor Spotlight for Kubernetes"
[media-sysdig-docker-png]:<../media/sysdig-docker.png> "Figure 11. Sysdig Monitor download location and access code for Docker"





# kaholo-trigger-appoptics
Kaholo integration with SolarWinds AppOptics Webhooks

## How to use:
After installing the trigger on Kaholo, make sure to add Webhhok to the Kaholo Webhook URL as a service, and to connect all wanted alerts to the service. You can see how to configure webhooks [here](https://documentation.solarwinds.com/en/success_center/appoptics/content/kb/alert/notification_services/webhook.htm?cshid=appoptics_kb/alert/notification_services/webhook/).

## Method: Alert
Triggers whenever there is a an alert sent from AppOptics.

### Webhook URL:
**{KAHOLO_URL}/webhook/appoptics**

### Parameters:
1. Alert Name (String) **Optional** - Alert name or it's [minimatch pattern](https://github.com/isaacs/minimatch#readme). If not specified accept any.
2. State (Options) **Optional** - Whether to accept active\cleared alerts or both of them. default is both.
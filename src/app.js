const minimatch = require("minimatch");

async function alertWebhook(req, res, settings, triggerControllers) {
  if (!triggerControllers) {
    return res.status(400).send("triggers cannot be nil");
  }
  try {
    const payload = JSON.parse(req.body.payload);
    const alertName = payload.alert.name;
    if (!alertName){
      return res.status(400).send("Bad AppOptics Webhook format");
    }
    const isCleared = payload.clear === "normal";
    triggerControllers.forEach(trigger => {
      const {alertNamePat, state} = trigger.params;

      if (alertNamePat && !minimatch(alertName, alertNamePat)) return;
      if (state === (isCleared ? "Active" : "Cleared")) return;

      const msg = `${alertName} ${isCleared ? "Cleared" : "Active"}`;
      trigger.execute(msg, payload);
    });
    res.status(200).send("OK");
  }
  catch (err){
    res.status(422).send(err.message);
  }
}

module.exports = { 
  alertWebhook
};
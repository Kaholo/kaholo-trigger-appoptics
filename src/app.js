const { findTriggers, parseLabels } = require(`./helpers`);
const minimatch = require("minimatch");

async function alertWebhook(req, res) {
  const payload = JSON.parse(req.body.payload);
  const alertName = payload.alert.name;
  if (!alertName){
    res.send("Bad AppOptics Webhook format");
    console.error("Bad AppOptics Webhook format");
    return;
  }
  const isCleared = payload.clear === "normal";
  findTriggers(
    validateTrigger,
    [alertName, isCleared],
    payload, req.io, 
    res,
    "alertWebhook",
    alertName
  );
}

function validateTrigger(trigger, [alertName, isCleared]) {
  const alertNamePat = (trigger.params.find((o) => o.name === `alertNamePat`).value || "").trim();
  const trigState = (trigger.params.find((o) => o.name === `state`).value || "All");

  // Check if the alert name pattern was provided, and if so check it matches request
  if (alertNamePat && !minimatch(alertName, alertNamePat)) {
    throw `Not matching alert name`;
  }
  // Check if status was provided, and if so check it matches request
  if (trigState !== "All" && isCleared == (trigState === "Cleared")) {
    throw `Not matching state`;
  }
}

module.exports = { 
  alertWebhook
};
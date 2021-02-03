// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const multipleDevicesControl = require('./control_multiple/multipleDevicesControl');
const specificDevicesControl = require('./control_specific/specificDeviceControl');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  let conv = agent.conv();
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  const turnEveryThings = async agent => {
    await multipleDevicesControl.turnMultipleDevices(agent, conv);
  };

  const turnSpecific = async agent => {
    await specificDevicesControl.turnSpecificDevices(agent, conv);
  };

  const turnSpecificProvidedDeviceName = async agent => {
    await specificDevicesControl.provideDeviceName(agent, conv);
  };

  const turnSpecificProvidedSwitch = async agent => {
    await specificDevicesControl.provideSwitch(agent, conv);
  };

  const turnWhenBedTime = async agent => {
    await multipleDevicesControl.turnWhenBedTime(agent, conv);
  };

  const turnWhenEatingTime = async agent => {
    await multipleDevicesControl.turnWhenEatingTime(agent, conv);
  };

  const turnWhenGuestComming = async agent => {
    await multipleDevicesControl.turnWhenGuestComming(agent, conv);
  };

  const turnWhenNightSky = async agent => {
    await multipleDevicesControl.turnWhenNightSky(agent, conv);
  };
  
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('turn every things', turnEveryThings);
  intentMap.set('turn specific device', turnSpecific);
  intentMap.set('turn specific device - missing device name - provided', turnSpecificProvidedDeviceName);
  intentMap.set('turn specific device - missing switch - provided', turnSpecificProvidedSwitch);
  intentMap.set('bed time', turnWhenBedTime);
  intentMap.set('eating time', turnWhenEatingTime);
  intentMap.set('guest comming', turnWhenGuestComming);
  intentMap.set('night sky', turnWhenNightSky);
  agent.handleRequest(intentMap);
});

const utils = require('../utils/utilities');
const config = require("../config/api_config");
const deviceControlingApi = require("../api/devicesControllingApis");


const turnMultipleDevices = async (agent, conv) => {

    if(!utils.isGoogleInstance(agent, conv)) return;

    if(isMissingParameter(agent, conv)){
        agent.add(conv);
        return;
    }
    else{
        //calling API for turn on/off everythings
        await callingApiToSwitch(agent, conv);
    }

    agent.add(conv);
};

const isMissingParameter = (agent, conv) => {

    if(agent.parameters['switch']) return false;

    if(reachFrustration(conv))
    {
        let textResponse = `I'm confusing when you talk about that. Try again later`;
        conv.close(textResponse);
    }
    else{
        let textResponse = `Please tell me what you want to do. Would you like to switch on or off`;
        conv.ask(textResponse); 
    }
    return true;
};

const reachFrustration = conv => {

    if(!conv.data.misspellCount) conv.data.misspellCount = 0;
    conv.data.misspellCount++;

    return conv.data.misspellCount > 2;
};

const callingApiToSwitch = async (agent, conv) => {

    switch(agent.parameters['switch']){
        case 'on':
            deviceControlingApi.switchDeviceStatus(config.devices_home_config.LED, 1);
            deviceControlingApi.switchDeviceStatus(config.devices_home_config.FAN, 1);
            deviceControlingApi.switchDeviceStatus(config.devices_home_config.NIGHT_LED, 1);
            deviceControlingApi.switchDeviceStatus(config.devices_home_config.TV, 1);
            break;
        case 'off':
            deviceControlingApi.switchDeviceStatus(config.devices_home_config.LED, 0);
            deviceControlingApi.switchDeviceStatus(config.devices_home_config.FAN, 0);
            deviceControlingApi.switchDeviceStatus(config.devices_home_config.NIGHT_LED, 0);
            deviceControlingApi.switchDeviceStatus(config.devices_home_config.TV, 0);
            break;
        default:
            break;
    }

    conv.ask("Every things has been setup");
};

const turnWhenBedTime = async (agent, conv) => {

    if(!utils.isGoogleInstance(agent, conv)) return;

    deviceControlingApi.switchDeviceStatus(config.devices_home_config.LED, 0);
    deviceControlingApi.switchDeviceStatus(config.devices_home_config.FAN, 0);
    deviceControlingApi.switchDeviceStatus(config.devices_home_config.NIGHT_LED, 1);
    deviceControlingApi.switchDeviceStatus(config.devices_home_config.TV, 0);

    conv.ask("Every things has been setup");
    agent.add(conv);
};

const turnWhenEatingTime = async (agent, conv) => {

    if(!utils.isGoogleInstance(agent, conv)) return;

    deviceControlingApi.switchDeviceStatus(config.devices_home_config.TV, 0);

    conv.ask("Every things has been setup");
    agent.add(conv);
};

const turnWhenGuestComming = async (agent, conv) => {

    if(!utils.isGoogleInstance(agent, conv)) return;

    deviceControlingApi.switchDeviceStatus(config.devices_home_config.TV, 0);

    conv.ask("Every things has been setup");
    agent.add(conv);
};

const turnWhenNightSky = async (agent, conv) => {

    if(!utils.isGoogleInstance(agent, conv)) return;

    deviceControlingApi.switchDeviceStatus(config.devices_home_config.LED, 1);

    conv.ask("Every things has been setup");
    agent.add(conv);
};


exports.turnMultipleDevices = turnMultipleDevices;
exports.turnWhenBedTime = turnWhenBedTime;
exports.turnWhenEatingTime = turnWhenEatingTime;
exports.turnWhenGuestComming = turnWhenGuestComming;
exports.turnWhenNightSky = turnWhenNightSky;



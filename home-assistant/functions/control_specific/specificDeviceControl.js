const utils = require('../utils/utilities');
const config = require("../config/api_config");
const deviceControlingApi = require("../api/devicesControllingApis");


const turnSpecificDevices = async (agent, conv) => {

    if(!utils.isGoogleInstance(agent, conv)) return;

    //saving position of device in the first call - otherwise default is all device
    if(agent.parameters['number']) conv.data.number = agent.parameters['number'];

    findMissingParameters(agent, conv);

    if(isExistingMissingContex(agent, conv)) return;

    callingApiToSwitch(conv);
    agent.add(conv);
};

const findMissingParameters = (agent, conv) => {
    
    conv.data.missingParameters = [];

    if(!agent.parameters['devices']) conv.data.missingParameters.push('devices');
    else conv.data.devices = agent.parameters['devices'];

    if(!agent.parameters['switch']) conv.data.missingParameters.push('switch');
    else conv.data.switch = agent.parameters['switch'];
};

const isExistingMissingContex = (agent, conv) => {

    if(conv.data.missingParameters.length <= 0) return false;

    switch(conv.data.missingParameters[0]){
        case 'devices':
            agent.setFollowupEvent('turn-specific-device-missing-device-name');
            break;
        
        case 'switch':
            agent.setFollowupEvent('turn-specific-device-missing-switch');
            break;
    }

    conv.ask('going to follow up intent');
    agent.context.set('turnspecificdevice-followup', 1, null);
    agent.add(conv);

    return true;
};

const provideDeviceName = (agent, conv) => {

    if(!utils.isGoogleInstance(agent, conv)) return;

    //remove mising parameter flag from conv
    conv.data.missingParameters.shift();
    conv.data.devices = agent.parameters['devices'];

    if(isExistingMissingContex(agent, conv)) return;

    callingApiToSwitch(conv);
    agent.add(conv);
};

const provideSwitch = (agent, conv) => {

    if(!utils.isGoogleInstance(agent, conv)) return;

    //remove mising parameter flag from conv
    conv.data.missingParameters.shift();
    conv.data.switch = agent.parameters['switch'];

    if(isExistingMissingContex(agent, conv)) return;

    callingApiToSwitch(conv);
    agent.add(conv);
};

const callingApiToSwitch = conv => {

    let device = determineDevice(conv.data.devices);
    switch(conv.data.switch){
        case 'on':
            if(conv.data.number) deviceControlingApi.switchSpecificDeviceStatus(device, conv.data.number, 1);
            else deviceControlingApi.switchDeviceStatus(device, 1);
            break;
        case 'off':
            if(conv.data.number) deviceControlingApi.switchSpecificDeviceStatus(device, conv.data.number, 0);
            else deviceControlingApi.switchDeviceStatus(device, 0);
            break;
        default:
            break;
    }
    conv.ask("Every things has been setup");
}

const determineDevice = name => {

    switch(name){
        case 'led':
            return config.devices_home_config.LED;
        case 'fan':
            return config.devices_home_config.FAN;
        case 'tv':
            return config.devices_home_config.TV;
        case 'night_led':
            return config.devices_home_config.NIGHT_LED;
    }
};


exports.turnSpecificDevices = turnSpecificDevices;
exports.provideDeviceName = provideDeviceName;
exports.provideSwitch = provideSwitch;
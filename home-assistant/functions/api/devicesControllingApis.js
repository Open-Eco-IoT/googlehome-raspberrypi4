let config = require("../config/api_config");
let apiBuider = require("./apiBuider");

const switchDeviceStatus = async (device, status) => {

    let body = {
        device: device,
        status: status
    };
    await apiBuider.post(config.devices_home_config.host, config.devices_home_config.path, body);
};

const switchSpecificDeviceStatus = async (device, number, status) => {

    let body = {
        device: device,
        number: number,
        status: status
    };
    await apiBuider.post(config.devices_home_config.host, config.devices_home_config.path, body);
};


exports.switchDeviceStatus = switchDeviceStatus;
exports.switchSpecificDeviceStatus = switchSpecificDeviceStatus;

const requestAPI = require('request-promise');

const get = async (host, path, queryString) => requestAPI(`${host}/${path}?${queryString}`);

const post = async (host, path, body) => {

    let options = {
        method: 'POST',
        uri: `${host}/${path}`,
        body: body,
        json: true, // Automatically stringifies the body to JSON
        headers: {
            'content-type': 'application/json',
        }
    };
    return requestAPI(options);
}

exports.get = get;
exports.post = post;

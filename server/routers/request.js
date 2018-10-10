const asyncRequest = require('async-request');
const querystring = require('querystring');
module.exports = async (url, opts) => {
    if (opts && (!opts.method || opts.method === 'GET') && opts.data) {
        url = url + '?' + querystring.stringify(opts.data);
        delete opts.data;
    }
    const res = await asyncRequest(url, opts);
    if (+res.statusCode === 200) {
        return res.body;
    } else {
        throw res;
    }
}
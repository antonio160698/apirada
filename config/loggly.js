let winston = require('winston');
require('winston-loggly-bulk');

winston.add(winston.transports.Loggly, {
    token: "95bcf968-6680-401b-8061-d4d95d0dfce9",
    subdomain: "fswcodo",
    tags: ["Winston-NodeJS"],
    json: true
})

winston.add(winston.transports.File, { filename: 'somefile.log' });

module.exports = {

    loggly: winston

}
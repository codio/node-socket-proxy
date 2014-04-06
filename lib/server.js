

var util = require('util');
var net = require('net');
var _ = require('lodash');
var Listener = require('./listener');

function createServer(ports, host, connectionCallback) {
    if (!(ports instanceof Array)) {
        ports = [ports];
    }
    _.each(ports, function(port) {
        new Listener(port, host, connectionCallback.bind(null, host, port));
    });
}

function onConnect(connectionCallback, masterSocket) {
    console.log(arguments);
}

exports.start = function (ports, host, connectionCallback) {
    createServer(ports, host, connectionCallback);
};
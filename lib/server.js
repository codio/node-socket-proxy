

var util = require('util');
var net = require('net');
var _ = require('lodash');
var Listener = require('./listener');

function createServer(ports, host, connectionCallback) {
    if (!(ports instanceof Array)) {
        ports = [ports];
    }
    _.each(ports, function(port){
        new Listener(port, host, connectionCallback);
    });
}

function bind(host, port, connectionCallback) {
    net.createServer(onConnect.bind(connectionCallback)).listen(port);
}

function onConnect(connectionCallback, masterSocket) {
    console.log(arguments);
}

exports.start = function (ports, host, connectionCallback) {
    createServer(ports, host, connectionCallback);
};
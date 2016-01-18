var net = require('net');
var Connection = require('./connection');

var Listener = function(port, host, callback) {

    var server = net.createServer(onConnectProxy);
    server.listen(parseInt(port), host);

    function onConnectProxy(proxySocket) {
        new Connection(callback, proxySocket);
    }
};

module.exports = Listener;
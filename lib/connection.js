var net = require('net');
var Q = require('q');

var Connection = function(connectionDataCallback, proxySocket) {
    var connected = false;
    var buffers = [];
    var serviceSocket = new net.Socket();
    var address = proxySocket.address();
    console.log('client connected to ' + address.address + ' port ' + address.port);

    getData(address.address, address.port , connectionDataCallback)
    .then(function(data){
        var servicePort = data.port;
        var serviceHost = data.host;
        console.log("serviceSocket connect", servicePort, serviceHost);
        serviceSocket.connect(parseInt(servicePort), serviceHost, function () {
            connected = true;
            console.log('connected: ' + serviceHost + ' port:' + servicePort);
            if (buffers.length > 0) {
                for (i = 0; i < buffers.length; i++) {
                    serviceSocket.write(buffers[i]);
                }
            }
        });
    })
    .fail(function(){
        serviceSocket.end();
        proxySocket.end();
    });

    proxySocket.on('error', function (e) {
        serviceSocket.end();
    });

    serviceSocket.on('error', function (e) {
        console.log('Could not connect to service at host', e);
        proxySocket.end();
    });

    proxySocket.on('data', function (data) {
        if (connected) {
            serviceSocket.write(data);
        } else {
            buffers[buffers.length] = data;
        }
    });
    serviceSocket.on('data', function (data) {
        proxySocket.write(data);
    });
    proxySocket.on('close', function (had_error) {
        serviceSocket.end();
    });
    serviceSocket.on('close', function (had_error) {
        proxySocket.end();
    });
};

function getData(proxyHost, proxyPort, callback) {
    var deferred = Q.defer();

    callback(function(err, data) {
        if (err) {
            deferred.reject(err);
            return;
        }
        deferred.resolve(data);
    });

    return deferred.promise;
}

module.exports = Connection;
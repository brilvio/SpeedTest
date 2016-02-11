var speedTest = require('speedtest-net');
var dados = new Object();

//var express = require('express');
//var app = express();
//var http = require('http').createServer(app);
//var io = require('socket.io').listen(http);

var express = require('express')
  , http = require('http');
//make sure you keep this order
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/public'));
server.listen(3000, function () { console.log('listening') });

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('teste', function () {
    console.log('testando');
    dados = new Object();
    dados.download = 0;
    dados.upload = 0;
    dados.ping = 0;
    socket.emit('teste', dados);
    test = speedTest({ maxTime: 5000, serverId: 1157 });

    test.on('data', function (data) {
      dados.download = data.speeds.download;
      dados.upload = data.speeds.upload;
      dados.ping = data.server.ping;
      console.dir(dados);
      socket.emit('teste', dados);
    });

    test.on('downloadspeedprogress', function (speed) {
      dados.download = speed.toFixed(2); //(speed / 1000).toFixed(2);
      socket.emit('teste', dados);
   
      // console.log('Download speed (in progress):', (speed / 1000).toFixed(2), 'KB/s');
    });

    test.on('uploadspeedprogress', function (speed) {
      dados.upload = speed.toFixed(2); //(speed / 1000).toFixed(2);
      socket.emit('teste', dados);

    });

    test.on('error', function (err) {
      console.error(err);
    });
  });
});


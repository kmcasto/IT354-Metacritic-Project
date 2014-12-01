'use strict';

var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();


var serverPort = 1337;

/**
 * Send a file to the client.
 */
function sendFile(filename, request, response) {
	var options = {
		root: __dirname + '/dist/',
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	response.sendFile(filename, options, function(error) {
		if(error) {
			//console.log(error);
			response.status(error.status).end();
		} else {
			//console.log('Sent:', filename);
		}
	});
}

/**
 * Send /index.html
 */
app.get('/', function(request, response) {
	sendFile("/index.html", request, response);
});

app.get('*', function(request, response) {
	sendFile(request.url, request, response);
});

var server = app.listen(serverPort, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server running at http://%s:%s', host, port);
});



/*
var http = require('http');
var https = require('https');
var fs = require('fs');
var internalIP = require('internal-ip');
var user = require('user');

var serverBacklog = 511;
var serverPort = 1337;
var serverIP = internalIP();

var options = {
	key: fs.readFileSync('server-key.pem'), 
	cert: fs.readFileSync('server-cert.pem')
};

var https_server = https.createServer(options, function(req, res) {
	console.log("URL = " + req.url);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write("<html><body><h3>It Works</h3></body></html>");
	res.end();
});

https_server.listen(serverPort, function() {
	console.log("Server running on " + "https://" + serverIP + ":" + serverPort + "/");
});
*/


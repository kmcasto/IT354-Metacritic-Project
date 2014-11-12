var http = require('http');
var https = require('https');
var fs = require('fs');
var internalIP = require('internal-ip');

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


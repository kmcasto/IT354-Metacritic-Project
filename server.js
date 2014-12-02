'use strict';

var path = require('path');
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');

var app = express();

var serverPort = 1337;

/** URL of the MongoDB database server. */
var mongoURL = "mongodb://127.0.0.1/IT354-Metacritic-Project";

// Hardcoded for now, will be replaced with the actual ID of user when login is working.
var userID = 210;

var mongooseOptions = { safe: true };

/**
 * Database Schema for storing a users platforms and games.
 */
var Schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	platforms: [String], 
	games: [{ 
		title: String, 
		link: String, 
		platform: String 
	}]
});


var User = mongoose.model("Model", Schema);


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
			response.status(error.status).end();
		}
	});
}

/**
 * @brief Serve '/index.html' whenever URL is '/'.
 */
app.get('/', function(request, response) {
	sendFile("/index.html", request, response);
});

/**
 * @brief Serve any file that exists in 'dist/' (Compressed version of 'public/')
 */
app.get('*', function(request, response) {
	sendFile(request.url, request, response);
});

/**
 * @brief Process a request to create a new user.
 * @todo app.post('/register') is just a stub for right now.
 */
app.post('/register', function(request, response) { 
});

/**
 * @brief Process a login request.
 * @todo app.post('/login') is just a stub for right now.
 */
app.post('/login', function(request, response) { 
});

/**
 * @brief Add a platform to the users list of platforms.
 * @todo app.post('/add') is just a stub for right now.
 */
app.post('/add', function(request, response) { 
	var platform = request.body.platform;


	Model.findByIdAndUpdate(userID, { $push: { platforms: platform } }, function(error, userdata) {
		if(error) {
			response.send(error);
			// console.log(error);
			throw error;
		}

		console.log("  User Data: ");
		console.log(userdata);

		userdata.save(function(error) {
			if(error) {
				response.send(error);
				// console.log(error);
				throw error;
			}

			response.send(userdata.platforms);
		});

	});
});

mongoose.connect(mongoURL, mongooseOptions, function(error, res) {
	if(error) {
		throw error;
	} else {
		var server = app.listen(serverPort, function() {
			var host = server.address().address;
			var port = server.address().port;

			console.log('Server running at http://%s:%s', host, port);
		});
	}
});


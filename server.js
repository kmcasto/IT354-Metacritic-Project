"use strict";

var path = require("path");
var fs = require("fs");
var express = require("express");
var mongoose = require("mongoose");
var http = require("http");
var winston = require("winston");

var Limiter = require("express-rate-limiter");
var MemoryStore = require("express-rate-limiter/lib/memoryStore");
var limiter = new Limiter({ db : new MemoryStore() });


var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.File)({ filename: "server.log" })
	]
});

var app = express();

var serverPort = 1337;
logger.info("Server will be running on port: " + serverPort);

/** URL of the MongoDB database server. */
var mongoURL = "mongodb://127.0.0.1/IT354-Metacritic-Project";
logger.info("Mongo Database URL is " + mongoURL);

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
		root: __dirname + "/dist/",
		dotfiles: "deny",
		headers: {
			"x-timestamp": Date.now(),
			"x-sent": true
		}
	};

	logger.info("Sending " + filename + " to client");

	response.sendFile(filename, options, function(error) {
		if(error) {
			logger.error("Error sending " + filename + " to client: " + error);
			response.status(error.status).end();
		}
	});
}

/**
 * @brief Process a request to create a new user.
 * @todo app.post('/register') is just a stub for right now.
 */
app.post("/register", limiter.middleware(), function(request, response) { 
});

/**
 * @brief Process a login request.
 * @todo app.post('/login') is just a stub for right now.
 */
app.post("/login", limiter.middleware(), function(request, response) { 
});

/**
 * @brief Add a platform to the users list of platforms.
 */
app.post("/add/platform/:platform_id", limiter.middleware(), function(request, response) { 
	var platform = request.params.platform;

	logger.info("Adding " + platform + " to users list of platform");

	User.findByIdAndUpdate(userID, { $push: { platforms: platform } }, function(error, userdata) {
		if(error) {
			logger.error("Error adding " + platform + " to users list of platform");
			response.send(error);
			throw error;
		}

		console.log("  User Data: ");
		console.log(userdata);

		userdata.save(function(error) {
			if(error) {
				logger.error("Error saving changes to MongoDB: " + error);
				response.send(error);
				throw error;
			}

			response.send(userdata.platforms);
		});

	});
});

/**
 * @brief Add a Game to the list of games the user likes
 */
app.post("/add/games/:game_id", limiter.middleware(), function(request, response) { 

});

/**
 * @brief Add a Game to the list of games the user likes
 */
app.get("/get/platforms/:platform_id", limiter.middleware(), function(request, response) { 

	User.findById(userID , function(error, userdata) {
		if(error) {
			logger.error("Error finding user by ID: " + error);
			response.send(error);
		} else {
			return response.json(userdata.platforms);
		}
	});


});

/**
 * @brief Delete a platform from the users list of platforms.
 */
app.post("/delete/platform/:platform_id", limiter.middleware(), function(request, response) { 
	var platform = request.params.platform;

	logger.info("Removing " + platform + " from users list of platform");

	User.findByIdAndUpdate(userID, { $pull: { platforms: platform } }, function(error, userdata) {
		if(error) {
			logger.error("Error removing " + platform + " from users list of platform: " + error);
			response.send(error);
			throw error;
		}

		console.log("  User Data: ");
		console.log(userdata);

		userdata.save(function(error) {
			if(error) {
				logger.error("Error saving changes to MongoDB: " + error);
				response.send(error);
				throw error;
			}

			response.send(userdata.platforms);
		});

	});

});





/**
 * @brief Serve '/index.html' whenever URL is '/'.
 */
app.get("/", function(request, response) {
	sendFile("/index.html", request, response);
});


/**
 * @brief Serve any file that exists in 'dist/' (Compressed version of 'public/')
 */
app.get("*", function(request, response) {
	sendFile(request.url, request, response);
});


mongoose.connect(mongoURL, mongooseOptions, function(error, res) {
	if(error) {
		throw error;
	} else {
		var server = app.listen(serverPort, function() {
			var host = server.address().address;
			var port = server.address().port;

			console.log("Server running at http://%s:%s", host, port);

			logger.info("Server running at http://" + host + ":" + port);
		});
	}
});


var mongoose = require('mongoose');

/* Database to connect to. */
var mongoURL = 'mongodb://127.0.0.1/IT354-Metacritic-Project';

var MongooseSchema = mongoose.Schema;

var UserSchema = new MongooseSchema({
	email: {
		type: String,
		required: true, 
		unique: true
	}, 
	password: {
		type: String, 
		required: true
	}, 
	items: [{ 
		title: String, 
		link: String, 
		platform: String 
	}]
});

var UserModel = mongoose.model('UserModel', UserSchema);

module.exports = {
	/**
	 * @brief Create a new user.
	 */
	addUser : function(request, response) {
		UserModel.findOne({ email: req.body.email }, function(err, user) {
			if(err) {
				console.log(err);
				// TODO: Send 401 response
			} else if(user) {
				console.log("User exists already");
				// TODO: Send 409 response
			} else if(user == undefined) {

				// User does not exist already
				var newUser = new UserModel({
					email: req.body.email,
					password: req.body.password
				});

				newUser.save(function(err) {
					if(err) {
						console.log(err);
						// TODO: Send 500 response
					} else {
						return res.status(200).send("New user created");
					}
				});	
			}
		});
	}, 

	/**
	 * @brief Try to login using a users email and password.
	 */
	findUser : function(request, response) {
	}, 

	/**
	 * @brief Logout.
	 */
	closeUser : function(request, response) {
	}
};


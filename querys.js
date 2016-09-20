var knex = require('./knex.js');

var Users = function() {
	return knex('users');
}


module.exports = {
	getAllUsers: Users,
	addUser: function(username, password_hash) {
		return Users().insert({
			username: username,
			password_hash: password_hash
		})
	},
	findUserByName: function(username){
		return Users().where('username', username);
	}
}

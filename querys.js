var knex = require('./knex.js');

var Users = function() {
	return knex('users');
};

var Posts = function() {
	return knex('posts');
};


module.exports = {
	getAllUsers: Users,
	addUser: function(username, password_hash) {
		return Users().insert({
			username: username.toLowerCase(),
			password_hash: password_hash
		})
	},
	findUserByName: function(username){
		return Users().where('username', username);
	},
	getAllPosts: Posts,
	addNewPost: function(user_id, title, body) {
		return Posts().insert({
			user_id: user_id,
			title: title,
			body: body
		});
	},
	getPostByID: function(id){
		return Posts().where('id', id);
	},
	getPostByTitle: function(title) {
		return Posts().where('title', title);
	}
}

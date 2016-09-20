var passport = require('passport');
var Local = require('passport-local').Strategy;
var query = require('./querys');
var bcrypt = require('bcrypt');

passport.use(new Local(
	function(username, password, done) {
		query.findUserByName(username.toLowerCase())
		.then(function(users) {

			let user = users[0];

			if(bcrypt.compareSync(password, user.password_hash)){

				done(null, user);

			} else {

				done(null, false);

			}
		})
		.catch(function(err) {
			done(null, false, {message: 'Incorrect username of password!'});
		})

	}
));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	query.findUserByName(username)
	.then(function(data){
		let user = data[0];
		done(null, user);
	})
	.catch(function(err) {
		return next(err);
	})



});

module.exports = passport;

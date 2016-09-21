var express = require('express');
var router = express.Router();
var query = require('../querys');
var bcrypt = require('bcrypt');

var passport = require('../passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {

	if(req.user) {
		res.redirect('/dashboard');
	}else {
		res.render('login', {flash: req.flash()});
	}



});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/dashboard',
	failureRedirect: '/login',
	failureFlash: "Incorrect username or password.",
	successFlash: "Welcome!"
}));

router.get('/register', function(req, res, next) {

	if(req.user) {
		res.redirect('/dashboard');
	}

	res.render('register');
})


router.post('/register', function(req, res, next) {
	let password_hash = bcrypt.hashSync(req.body.password, 10);

	query.addUser(req.body.username, password_hash)
	.then(function(data) {
		res.redirect('/');
	})
	.catch(function(err) {
		return next(err);
	})
})

router.get('/dashboard', function(req, res, next) {
	if(!req.user){
		res.redirect('/login');
	}

	res.render('dashboard', {user: req.user, flash: req.flash()});


})
module.exports = router;

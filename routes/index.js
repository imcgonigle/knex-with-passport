var express = require('express');
var router = express.Router();
var query = require('../querys');
var bcrypt = require('bcrypt');

var passport = require('../passport')

/* GET home page. */
router.get('/', function(req, res, next) {
	query.getAllPosts()
	.then(function(data) {
		res.render('index', {data: data, user: req.user});
	})
	.catch(function(err) {
		return next(err);
	})
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
	} else{
		res.render('dashboard', {user: req.user, flash: req.flash()});
	}

})

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
})

router.get('/posts/new', function(req, res, next){
	if(!req.user) {
		res.redirect('/login');
	}else {
		res.render('posts/new', {user: req.user});
	}
})

router.post('/posts/new', function(req, res, next) {
	if(!req.body.title || !req.body.body){
		res.redirect('/');
	} else {
		query.addNewPost(req.user.id, req.body.title, req.body.body)
		.then(function(data) {
			query.getPostByTitle(req.body.title)
			.then(function(data) {
				res.redirect('/post/' + data[0].id);
			})
			.catch(function(err) {
				return next(err);
			})
		})
		.catch(function(err) {
			return next(err);
		})
	}
})

router.get('/post/:id', function(req, res, next) {
	query.getPostByID(req.params.id)
	.then(function(data) {
		res.render('posts/post', {
			user: req.user,
			post: data[0]
		});
	})
	.catch(function(err) {
		return next(err);
	})
});


module.exports = router;

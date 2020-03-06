var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var propertyModel = require.main.require('./models/property-model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUsername(req.cookies['username'], function(result){
		res.render('home/index', {user: result});
	});
});

router.get('/view_users', function(req, res){
	
		userModel.getAllCustomer(function(results){
			if(results.length > 0){
				res.render('home/view_users', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/edit/:customer_id', function(req, res){
	userModel.getByCustomerId(req.params.customer_id, function(result){
		res.render('home/edit', {user: result});
	});
});

router.post('/edit/:customer_id', function(req, res){
	
		var user = {
			id: req.params.customer_id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type,
			phone: req.body.phone
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/edit/'+req.params.customer_id);
			}
		});
});

router.get('/addUser', function(req, res){
	userModel.getByUsername(req.cookies['username'], function(result){
		res.render('home/addUser', {user: result});
	});
});

router.post('/addUser', function(req, res){

	var user ={
		username: req.body.uname,
		name: req.body.name,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		type: req.body.type,
		phone: req.body.phone,
		email: req.body.email
	};

	if (!user.username) {
		res.send('Username cannot be empty');
	} else {
		if (!user.password) {
			res.send('Password cannot be empty');
		} else {
			if(user.email){
				if (user.phone) {
					userModel.validateUsername(user.username, function(status){
				 	if(!status){
						if (user.password == user.confirmPassword) {
							userModel.insertUser(user, function(status1){
								if (status1) {
									res.redirect('/registration/addUserSuccess');
								}else{
									res.send('Registration has not benn completed');
								}
							})
						}else{
							res.send('Confirm Password did not match');
						}
					}else{
						res.send('Username already exists');
					}
					});
				} else {
					res.send('Phone cannot be empty');
				}
			}else{
				res.send('Email cannot be empty');
			}
		}
	}
	
});

router.get('/delete/:customer_id', function(req, res){
	
	userModel.getByCustomerId(req.params.customer_id, function(result){
		res.render('home/delete', {user: result});
	});
})

router.post('/delete/:customer_id', function(req, res){
	
	userModel.delete(req.params.customer_id, function(status){
		if(status){
			res.redirect('/home/view_users');
		}else{
			res.redirect('/home/delete/'+req.params.customer_id);
		}
	});
});

router.get('/view_property', function(req, res){
	
		propertyModel.getAllProperty(function(results){
			if(results.length > 0){
				res.render('home/view_property', {propertylist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/view_property_detail/:property_id', function(req, res){
	propertyModel.getByPropertyId(req.params.property_id, function(result){
		res.render('home/view_property_detail', {property: result});
	});
});

router.get('/delete_property/:property_id', function(req, res){
	propertyModel.getByPropertyId(req.params.property_id, function(result){
		res.render('home/delete_property', {property: result});
	});
});

router.post('/delete_property/:property_id', function(req, res){
	
	propertyModel.delete(req.params.property_id, function(status){
		if(status){
			res.redirect('/home/view_property');
		}else{
			res.redirect('/home/delete/'+req.params.property_id);
		}
	});
});


module.exports = router;
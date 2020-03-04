var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();

router.get('/', function(req, res){
	res.render('registration/index');
});

router.post('/', function(req, res){

	var user ={
		username: req.body.uname,
		name: req.body.name,
		password: req.body.password,
		confirm: req.body.confirmPassword
	};

	if (!user.username) {
		res.send('Username cannot be empty');
	} else {
		if (!user.password) {
			res.send('Password cannot be empty');
		} else {
			if (!user.phone) {
				userModel.getByUsername(user.username, function(status){
			 	if(status){
					if (user.password == user.confirmPassword) {
						userModel.insert(user, function(status1){
							if (status1) {
								res.redirect('/registration/success');
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
			
		}
	}
	
});

module.exports = router;
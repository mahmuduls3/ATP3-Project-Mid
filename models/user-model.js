var db = require('./db');

module.exports= {
	getByCustomerId : function(id, callback){
		var sql = "select * from customer where customer_id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getAllCustomer : function(callback){
		var sql = "select * from customer where type='customer'";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	validateUser: function(user, callback){
		var sql ="SELECT * FROM customer where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getByUsername: function(username, callback){
		var sql = "select * from customer where username=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "insert into customer values(?,?,?,?,?,?,?,?,?,?)";
		var type = "customer";
		db.execute(sql, [null, user.username, user.name, user.password, type, user.phone, 0, 0, 0, 0], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update : function(user, callback){
		var sql = "update customer set password=?, phone=? where username=?";
		db.execute(sql, [user.password, user.phone, user.username], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from customer where username=?";
		db.execute(sql, [user.username], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
var db = require('./db');

module.exports= {
	getByPropertyId : function(id, callback){
		var sql = "select * from property where property_id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getAllProperty : function(callback){
		var sql = "select * from property order by property_id";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
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
	allow : function(id, callback){
		var sql = "update property set status=?, where property_id=?";
		var status = "allowed";
		db.execute(sql, [status, id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deny: function(id, callback){
		var sql = "update from property set status=? where property_id=?";
		var status = "denied";
		db.execute(sql, [status, id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

}
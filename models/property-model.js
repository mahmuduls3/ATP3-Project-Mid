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
		var sql = "select * from property where username=?";
		db.getResults(sql, [username], function(results){
			if(results.length >= 0){
				callback(results);
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
	delete: function(id, callback){
		var sql = "delete from property where property_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getActivePosts: function(username, callback){
		var sql = "select * from property where username=? and status=?";
		var status = "allowed";
		db.getResults(sql, [username, status], function(results){
			if(results.length >= 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getPendingPosts: function(username, callback){
		var sql = "select * from property where username=? and status=?";
		var status = "pending";
		db.getResults(sql, [username, status], function(results){
			if(results.length >= 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getSoldPosts: function(username, callback){
		var sql = "select * from property where username=? and status=?";
		var status = "sold";
		db.getResults(sql, [username, status], function(results){
			if(results.length >= 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	searchProperty: function(property, callback){
		var title = property.title;
		var location = property.location;
		var bed = property.bed;
		var bath = property.bath;
		var floor = property.floor;
		var price_from = property.price_from;
		var price_to = property.price_to;
		var purpose = property.purpose;
		var type = property.type;
		var status = property.status;
		var orderby = property.orderby;

		if(title){
			title = " title = '" + property.title + "' and ";
		}else{
			title = " ";
		}
		if(location){
			location = " property_area = '" + property.location + "' and ";
		}else{
			location = " ";
		}
		if(bed){
			bed = " bed = " + property.bed + " and ";
		}else{
			bed = " ";
		}
		if(bath){
			bath = " bath = " + property.bath + " and ";
		}else{
			bath = " ";
		}
		if(floor){
			floor = " floor = '" + property.floor + "' and ";
		}else{
			floor = " ";
		}
		if(purpose){
			purpose = " style = '" + property.purpose + "' and ";
		}else{
			purpose = " ";
		}
		if(type){
			type = " p_type = '" + property.type + "' and ";
		}else{
			type = " ";
		}
		if(price_from){
			price_from = " property_price  between " + property.price_from + " and ";
		}else{
			price_from = "  property_price  between 0 and  ";
		}
		if(price_to){
			price_to = " " + property.price_to;
		}else{
			price_to = " 99999999999999 ";
		}
		if(status){
			status = " status = '" + property.status + "' ";
		}else{
			status = " ";
		}
		if(orderby){
			orderby = " " + property.orderby + " ";
		}

		var sql ="SELECT * FROM property where " + title + location + bed + bath + floor + purpose + type + status + price_from + price_to + orderby;
		console.log(sql);
		db.getResults(sql, null, function(results){

			if(results.length >= 0){
				console.log("Results found");
				callback(results);
			}else{
				console.log("No Results");
				callback(false);
			}
		});
	}

}

//     [title, location, bed, bath, floor, purpose, type, price_from, price_to]
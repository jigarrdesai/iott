App.factory('Users', ['$db', function($db) {

	var tableName = 'users';
	var tableRows = {
		ID: tableName + '.id',
		NAME: tableName + '.name',
		PASSWORD: tableName + '.password',
		ROLE: tableName + '.role',
	};

	return {
		getCurrentUser: function(cb) {
			var userId = localStorage.userId;
			this.findOne({id: userId}, function(data) {
				cb(data);
			});
		},
		ifHasAdminRights: function(cb) {
			
			var token = localStorage.accessToken;
			var accessTokens = 'access_tokens';

			$db.select('role').where({token: accessToken}).join(tableName, accessTokens + '.user_id = ' + tableName + '.id', 'left').get(accessTokens, function(err, data) {
				if(err) {
					cb(false);

				} else if(data.length > 0) {
					
					if(data[0].role <= 2) {
						cb(true);
					} else {
						cbd(false);
					}
				} else {
					cb(false);
				}
			});
		},
		generateRandomCode: function(length) {
			var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

			var length = length || 128;
			var key = '';

			for(var i=0;i<length;i++) {
				var rnd = Math.floor(Math.random() * (chars.length + 1));
				key += chars.charAt(rnd);
			}

			return key;
		},
		checkAccessTokenExists: function(code, cb) {

			$db.select('id').where({token: code}).get('access_tokens', function(err, res){
				if(!err && res.length > 0) {
					cb(true);

				} else{
					cb(false);
				}
			})
		},
		createAccessToken: function(userId, cb) {
			var that = this;
			var code = that.generateRandomCode();
			var data = {};
			
			that.checkAccessTokenExists(code, function(exists){
				
				if(exists) {
					
					that.createAccessToken(userId, cb);
				} else {
					$db.insert('access_tokens', {
						'user_id': userId,
						'token': code
					}, function(err, info) {
						if(err) {
							data.status = 'error';
							data.errorMessage = err.message;
						} else {
							
							data.status = 'success';
							data.token = code;
						}

						cb(data);
					});
				}
			});
		},
		doLogin: function(where, cb){
			var that = this;
			that.findOne(where, function(data){
				var resData = {};
				resData.status = data.status;

				if(data.status == 'success') {
					
					that.createAccessToken(data.data.id, function(tokenData){
						resData.userId = data.data.id;
						resData.accessToken = tokenData.token;

						cb(resData);
					});
				} else{
					resData = data;
					cb(resData);
				}

			});
		},
		findOne: function(where, cb) {
			
			$db.select('*').where(where).get(tableName, function(err, response) {

				var data = {};
				if(err) {
					data.status = 'error';
					data.errorMessage = err.message;

				} else {
					if(response.length > 0) {
						data.status = 'success';
						// delete response[0].password;
						data.data = response[0];
					} else {
						data.status = 'error';
						data.errorText = 'No User Found';
					}
				}
				
				cb(data);

			});
		},
		findAll: function(where, cb) {

			$db.select('id, name').where(where).get(tableName, function(err, response) {

				var data = {};
				if(err) {
					data.status = 'error';
					data.errorMessage = err.message;

				} else {
					if(response.length > 0) {
						data.status = 'success';
						data.data = response;
					} else {
						data.status = 'error';
						data.errorMesage = 'No User Found';
					}
				}
				
				cb(data);

			});
		},
		create: function(create, cb) {
			var that = this;
			that.findOne({username: create.username}, function(data) {
				if(data.status == 'error') {

					$db.insert('users', create, function(err, res) {
						if(err) {
							cb({
								status: 'error',
								errorMessage: err.message
							});
						} else {
							console.log(res)
							cb({
								status: 'success',
								id: res.insertId
							});
						}
					});
				} else {
					cb({
						status: 'error',
						errorMessage: 'User already exists'
					});
				}
			});
		},
		updateOne: function(updateData, where, cb) {
			console.log(updateData, where)
			$db.where(where).update(tableName, updateData, function(err, response) {

				var data = {};
				if(err) {
					data.status = 'error';
					data.errorMessage = err.message;

				} else {
					
					data.status = 'success';
				}
				
				cb(data);

			});
		}
	};

}]);
App.factory('Devices', ['$db', function($db) {

	var tableName = 'devices';

	return {
		db: $db,
		findOne: function(where, cb) {
			
			$db.select('*').where(where).limit(1).get(tableName, function(err, response) {

				var data = {};
				console.log(response)
				if(err) {
					data.status = 'error';
					data.errorMessage = err.message;

				} else {
					if(response.length > 0) {
						data.status = 'success';
						data.data = response[0];
					} else {
						data.status = 'error';
						data.errorMesage = 'No Device Found';
					}
				}
				
				cb(data);

			});
		},
		findAll: function(where, cb) {

			$db.select('*').where(where).get(tableName, function(err, response) {

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
						data.errorMesage = 'No Device Found';
					}
				}
				
				cb(data);

			});
		},
		create: function(create, cb) {
			var that = this;
			that.findOne({device_code: create.device_code}, function(data) {
				if(data.status == 'error') {

					$db.insert('devices', create, function(err, res) {
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
						errorMessage: 'Device already exists'
					});
				}
			});
		},
		delete: function(where, cb) {
			$db.where(where)
				.delete('devices', function(err, data) {
					if(err) {
						cb({
							status: 'error',
							errorMessage: err.message
						});
					} else {
						cb({
							status: 'success'
						});
					}
				})
		},
		update: function(update, where, cb) {
			$db.where(where)
				.update('devices', update, function(err, data) {
					if(err) {
						cb({
							status: 'error',
							errorMessage: err.message
						});
					} else {
						cb({
							status: 'success'
						});
					}
				})
		}
	};

}]);
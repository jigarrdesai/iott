App.factory('Devices', ['$db', function($db) {

	var tableName = 'devices';

	return {
		findOne: function(where, cb) {
			
			$db.select('*').where(where).get(tableName, function(err, response) {

				var data = {};
				if(err) {
					data.status = 'error';
					data.errorMessage = err.message;

				} else {
					if(response.length > 0) {
						data.status = 'success';
						delete response[0].password;
						data.data = response[0];
					} else {
						data.status = 'error';
						data.errorMesage = 'No User Found';
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
		}
	};

}]);
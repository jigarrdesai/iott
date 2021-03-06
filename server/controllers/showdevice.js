App.controller('ShowDevice', ['$scope', '$state', '$http', '$stateParams', 'Devices', function($scope, $state, $http, $stateParams, Devices) {

	$scope.deviceId = $stateParams.id;

	var parseMessage = function(device) {
		var messageParts = device.message.split('\n');
		device.messageDetails = {};

		for(i=0;i<messageParts.length;i++) {
			var msg = messageParts[i];
			if(msg == '' || msg == null) {
				messageParts.splice(i, 1);
				i--;
			} else {
				var colonIndex = msg.indexOf(':');
				var key = msg.substring(0, colonIndex).trim();
				var value = msg.substring(colonIndex + 1, msg.length).trim();

				if(key.toUpperCase() == 'A' || key.toUpperCase() == 'V') {
					device.messageDetails[key] = value.split(',');
				} else if(key.toUpperCase() == 'D/T') {
					// var dt =  new Date
					var dd = value.substring(0, 2);
					var mm = value.substring(2, 4);
					var yy = value.substring(4, 6);
					var hour = value.substring(7, 9);
					var mins = value.substring(9, 11);

					device.messageDetails.date = new Date(Date.parse(mm+'/'+dd+'/'+yy+' '+hour+':'+mins));
				} else {
					device.messageDetails[key] = value;
				}
			}
		}
	};

	console.log($scope)

	$scope.getStatus = function(number) {
		var url = 'http://www.webpostservice.com/sendsms/sendsms.php?username=amond&password=RiO8fz&type=TEXT&sender=RSWTTW';
		url += '&mobile=' + encodeURIComponent(number) + '&message=*GET#';

		$http({
			method: 'GET',
			url: url
		}, function(response) {
			console.log(response)
		});
	};

	$scope.getOnOffClass = function(cmd) {
		console.log(cmd)
		if(cmd.toUpperCase() == 'OFF') {
			return 'bg-red';
		}
		return 'bg-green';
	};

	$scope.toggleOnOff = function(cmd) {

		if(cmd.toUpperCase() == 'OFF') {
			return 'ON';
		}
		return 'OFF';
	};

	$scope.onOffPump = function(device) {
		var url = 'http://www.webpostservice.com/sendsms/sendsms.php?username=amond&password=RiO8fz&type=TEXT&sender=RSWTTW';
		url += '&mobile=' + encodeURIComponent(device.mobile_number) + '&message=*' + device.messageDetails.cmd.toUpperCase() + '#';

		$http({
			method: 'GET',
			url: url
		}, function(response) {
			console.log(response)
			device.messageDetails.cmd = $scope.toggleOnOff(device.messageDetails.cmd);
		});
	};

	if(!$scope.deviceId || $scope.deviceId == 0) {
		$state.transitionTo('dashboard');
	} else {

		Devices.db.select('device_code, mobile_number, (SELECT message FROM servernumber_detail WHERE servernumber_detail.number = mobile_number ORDER BY id DESC LIMIT 1) as message, (SELECT longcode FROM servernumber_detail WHERE servernumber_detail.number = mobile_number ORDER BY id DESC LIMIT 1) as longcode').where({id: $scope.deviceId}).get('devices', function(err, data) {
			if(err) {
				$state.transitionTo('dashboard');
			} else {
				$scope.device = data[0];
				parseMessage($scope.device)
			}
		});

		// console.log(Devices.db._last_query());
		
		// Devices.findOne({id: $scope.deviceId}, function(data) {
		// 	console.log(data)
		// 	if(data.status == 'error') {
		// 		$state.transitionTo('dashboard');
		// 	} else {
		// 		// $scope.device = data.data;
		// 	}
		// });
	}
}]);
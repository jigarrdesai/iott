App.controller('ShowDeviceGridView', ['$scope', '$state', '$stateParams', 'Devices', function($scope, $state, $stateParams, Devices) {

	$scope.deviceId = $stateParams.id;
	$scope.items = [];

	if(!$scope.deviceId || $scope.deviceId == 0) {
		$state.transitionTo('dashboard');
	} else {

		Devices.findOne({id: $scope.deviceId}, function(device) {
			if(device.status == 'error') {
				$state.transitionTo('dashboard');
			} else {
				
				Devices.db.select('*').where({number: device.data.mobile_number}).get('servernumber_detail', function(err, data) {
					
					if(err) {
						$state.transitionTo('dashboard');
					} else {
						$scope.items = data;
					}
				});
			}
		});
	}
}]);
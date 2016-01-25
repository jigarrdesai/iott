App.controller('ShowDevice', ['$scope', '$state', '$stateParams', 'Devices', function($scope, $state, $stateParams, Devices) {

	$scope.deviceId = $stateParams.id;

	if(!$scope.deviceId || $scope.deviceId == 0) {
		$state.transitionTo('dashboard');
	} else {
		Devices.findOne({id: $scope.deviceId}, function(data) {
			console.log(data)
			if(data.status == 'error') {
				$state.transitionTo('dashboard');
			} else {
				$scope.device = data.data;
			}
		});
	}

}]);
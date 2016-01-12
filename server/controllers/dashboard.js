App.controller('Dashboard', ['$scope', '$rootScope', 'Devices', function($scope, $rootScope, Devices) {

	Devices.findAll({user_id: $rootScope.userData.userId}, function(data) {
		console.log(data)
		if(data.status == 'success') {
			$scope.tiles = data.data;
		}
	});

	$scope.tiles = [];

	$scope.getStatusClass = function(tile) {
		
		if(tile.status.toUpperCase() == 'OFF') {
			return 'bg-red';

		} else {
			return 'bg-green';

		}
	};

	$scope.getStatusText = function(tile) {

		if(tile.status.toUpperCase() == 'OFF') {
			return 'OFF';

		} else {
			return 'ON';

		}
	};
	
}]);
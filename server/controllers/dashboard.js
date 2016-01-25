App.controller('Dashboard', ['$scope', 'Devices', function($scope, Devices) {

	Devices.findAll({user: localStorage.userId}, function(data) {
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
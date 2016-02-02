App.controller('Dashboard', ['$scope', 'Devices', function($scope, Devices) {

	console.log($scope);
	// var dialog = $('#dialog').data('dialog');
	// console.log($('#dialog').data('dialog'))

	// dialog.open();

	$scope.tiles = [];
	Devices.findAll({user: localStorage.userId}, function(data) {
		console.log(data)
		if(data.status == 'success') {
			$scope.tiles = data.data;
		}
		// dialog.close();
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
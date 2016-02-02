App.controller('ShowDevices', ['$scope', '$state', 'Devices', function($scope, $state, Devices) {

	$scope.count = 0;
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = 5;
	$scope.items = [];
	$scope.isLoading = true;
	$scope.limit = 10;
	$scope.offset = 0;

	console.log($scope)
	var getDevicesList = function() {
		$scope.limit = angular.copy($scope.itemsPerPage);
		$scope.offset = ($scope.currentPage - 1) * $scope.itemsPerPage;

		$scope.isLoading = true;

		// Devices.findAll({user: localStorage.userId}, function(data) {
		// 	if(data.status == 'success') {
		// 		$scope.tiles = data.data;
		// 	}
		// 	// dialog.close();
		// });

		if(localStorage.role < 4) {
			where = {};
		} else {
			where = {user: localStorage.userId};
		}

		Devices.db.select('devices.*, cities.cityname, users.name as creator_name')
			.where(where)
			.join('cities', 'devices.city=cities.id', 'LEFT')
			.join('users', 'devices.user=users.id', 'LEFT')
			.get('devices', function(err, data) {
				console.log(data)
				if(!err) {
					$scope.items = data;
					$scope.count = data.length;
					$scope.totalItems = 10;
					$scope.isLoading = false;
				}
			});

		console.log(Devices.db._last_query());
	};

	$scope.editDevice = function(id) {
		$state.transitionTo('edit-device', {id: id});
	};
	
	$scope.startStopDevice = function(item) {
		var toggleStatus = function() {
			if(status == 'Off') {
				return 'On';
			} else {
				return 'Off';
			}
		};

		Devices.update({
			status: toggleStatus(item.status)
		}, {
			id: item.id
		}, function(data) {
			if(data.status == 'success') {

				item.status = toggleStatus(item.status);

				$.Notify({
				    caption: 'Notify',
				    content: 'Device Status Changed Succesfully.',
				    type: 'success'
				});
			} else {
				$.Notify({
				    caption: 'Error',
				    content: data.errorMessage,
				    type: 'error'
				});
			}
		})
	};
	
	$scope.deleteDevice = function(id) {
		Devices.deleteDevice({
			id: id
		}, function(data) {
			if(data.status == 'success')
				console.log('Deleted ' + id);
		});
	};

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.deviceOff = function(tile) {
		
		return tile.status.toUpperCase() == 'OFF';
	};

	$scope.$watch('currentPage', function() {
		getDevicesList();
	});

	$scope.pageChanged = function() {
		$scope.currentPage = ($scope.currentPage > Math.ceil($scope.totalItems/$scope.itemsPerPage)) ? Math.ceil($scope.totalItems/$scope.itemsPerPage) : $scope.currentPage;
	};

	$scope.maxSize = 5;
	$scope.bigTotalItems = 175;
	$scope.bigCurrentPage = 1;

}]);
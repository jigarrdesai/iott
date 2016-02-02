App.controller('ShowDevices', ['$scope', 'Devices', function($scope, Devices) {

	$scope.count = 0;
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = 5;
	$scope.items = [];
	$scope.isLoading = true;
	$scope.limit = 10;
	$scope.offset = 0;

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

		Devices.db.select('*')
			.where(where)
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

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
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
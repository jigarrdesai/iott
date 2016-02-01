App.controller('ShowUsers', ['$scope', 'Users', function($scope, Users) {

	$scope.count = 0;
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = 5;
	$scope.items = [];
	$scope.isLoading = true;
	$scope.limit = 10;
	$scope.offset = 0;

	var getUsersList = function() {
		$scope.limit = angular.copy($scope.itemsPerPage);
		$scope.offset = ($scope.currentPage - 1) * $scope.itemsPerPage;

		$scope.isLoading = true;
		Users.db.select('user.*, creator.name as creator_name')
			.where('user.role > ' + localStorage.role)
			.join('users` as `creator', 'creator.id=user.created_by', 'LEFT')
			.limit($scope.limit, $scope.offset)
			.get('users` as `user', function(err, data) {
				if(!err) {
					$scope.items = data;
					$scope.count = data.length;
					$scope.totalItems = 10;
					$scope.isLoading = false
				}
			});

		console.log(Users.db._last_query());
	};

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.$watch('currentPage', function() {
		getUsersList();
	});

	$scope.pageChanged = function() {
		$scope.currentPage = ($scope.currentPage > Math.ceil($scope.totalItems/$scope.itemsPerPage)) ? Math.ceil($scope.totalItems/$scope.itemsPerPage) : $scope.currentPage;
	};

	$scope.maxSize = 5;
	$scope.bigTotalItems = 175;
	$scope.bigCurrentPage = 1;

}]);
App.controller('AddDevice', ['$scope', 'Users', function($scope, Users) {

	var roles = ['Super Admin', 'Admin', 'Distributor', 'User'];
	$scope.userDetails = null;
	
	$scope.cities = [];
	$scope.tabIndex = 0;
	$scope.formData = {
		role: 4,
		user: 0
	};

	(reInitSelectBox = function() {
		$scope.selectBox = [{id: 'number:0', label: 'Select User'}];
	})();

	Users.getCurrentUser(function(data){
		$scope.userDetails = data.data;
		if($scope.userDetails.role < 4) {	
			prepareSelectBox();
		}
	});

	// Cities.findAll({}, function(data){
	// 	console.log(data)
	// 	if(data.status == 'success') {
	// 		$scope.cities = data.data;
	// 		$scope.city = data.data[0].id;
	// 	}
	// });

	var prepareSelectBox = function() {

		reInitSelectBox();
		
		var where = 'id <> ' + $scope.userDetails.id +
			' AND role > ' + $scope.userDetails.role;

		Users.findAll(where, function(data){

			angular.forEach(data.data, function(user){
				console.log(user)
				$scope.selectBox.push({
					value: user.id,
					label: user.name
				});
			});
		});
	};

	$scope.getTabIndex = function() {

		$scope.tabIndex = ($scope.tabIndex ? $scope.tabIndex + 1 : 1);
		return $scope.tabIndex;
	};

	$scope.submitForm = function() {
		console.log(addUserForm)
		if($scope.addUserForm.$valid) {

			// Users.creat
		}

		return false;
	};

	$scope.goBack = function() {
		$state.transitionTo('dashboard');
	};


}]);
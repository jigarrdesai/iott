App.controller('AddUser', ['$scope', '$rootScope', 'Cities', function($scope, $rootScope, Cities) {

	$scope.userDetails = $rootScope.userDetails;
	$scope.selectBox = [];
	$scope.cities = [];
	$scope.tabIndex = 0;
	$scope.formData = {
		role: 4
	};

	var prepareSelectBox = function() {

		$scope.selectBox = [];
		for(i = $scope.userDetails.role + 1; i <= 4; i++) {
			$scope.selectBox.push({
				value: i,
				label: roles[i - 1]
			});
		}
	};

	var getCitiesBox = function() {
		Cities.findAll({}, function(data){
			console.log(data)
			if(data.status == 'success') {
				$scope.cities = data.data;
				$scope.city = data.data[0].id;
			}
		});
	};

	$scope.getTabIndex = function() {
		return $scope.tabIndex++;
	};

	$scope.submitForm = function() {
		if($scope.addUserForm.$valid) {

			console.log($scope.formData)
		}
	};

	var roles = ['Super Admin', 'Admin', 'Distributor', 'User'];
	
	$scope.$watch('$scope.userDetails', function() {
		
		if($scope.userDetails && $scope.selectBox.length == 0 && $scope.cities.length == 0) {

			prepareSelectBox();
			getCitiesBox();

		}

	}, true);

}]);
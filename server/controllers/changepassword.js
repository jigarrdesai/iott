App.controller('ChangePassword', ['$scope', '$crypto', 'Users', function($scope, $crypto, Users) {

	var roles = ['Super Admin', 'Admin', 'Distributor', 'User'];
	$scope.userDetails = null;
	$scope.selectBox = [];
	$scope.cities = [];
	$scope.tabIndex = 0;
	$scope.formData = {
		role: 4
	};

	Users.getCurrentUser(function(data){
		console.log(data)
		$scope.userDetails = data.data;
	});

	$scope.submitForm = function() {

		if($scope.changePaaswordForm.$valid) {
			console.log($crypto.encrypt($scope.formData.password), $scope.userDetails.password);
			if($crypto.encrypt($scope.formData.password) == $scope.userDetails.password) {
				
				Users.updateOne({
					password: $crypto.encrypt($scope.formData.newPassword)
				}, {
					id: $scope.userDetails.id
				}, function(data){
					console.log(data)
				});
			}
		}

		return false;
	};

	$scope.goBack = function() {
		$state.transitionTo('dashboard');
	};
}]);
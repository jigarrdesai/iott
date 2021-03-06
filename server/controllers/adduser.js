App.controller('AddUser', ['$scope', '$rootScope', '$state', 'Cities', 'Users', function($scope, $rootScope, $state, Cities, Users) {

	var roles = ['Super Admin', 'Admin', 'Distributor', 'User'];
	$scope.userDetails = null;
	$scope.selectBox = [];
	$scope.cities = [];
	$scope.tabIndex = 0;
	$scope.formData = {
		role: 4
	};

	var resetFormData = function() {
		$scope.formData = {
			role: 4
		};
	};

	Users.getCurrentUser(function(data){
		$scope.userDetails = data.data;
		prepareSelectBox();
	});

	Cities.findAll({}, function(data){
		console.log(data)
		if(data.status == 'success') {
			$scope.cities = data.data;
			$scope.city = data.data[0].id;
		}
	});

	var prepareSelectBox = function() {

		$scope.selectBox = [];
		console.log($scope.userDetails)
		for(i = $scope.userDetails.role + 1; i <= 4; i++) {
			$scope.selectBox.push({
				value: i,
				label: roles[i - 1]
			});
		}
	};

	$scope.getTabIndex = function() {

		$scope.tabIndex = ($scope.tabIndex ? $scope.tabIndex + 1 : 1);
		return $scope.tabIndex;
	};

	$scope.submitForm = function() {
		console.log($scope.formData, $scope.addUser)
		if($scope.addUser.$valid) {
			console.log('Valid');
			Users.create($scope.formData, function(data) {

				if(data.status == 'success') {
					resetFormData();
					$.Notify({
					    caption: 'Notify',
					    content: 'User Added Succesfully.',
					    type: 'success'
					});
				} else {
					$.Notify({
					    caption: 'Error',
					    content: data.errorMessage,
					    type: 'error'
					});
				}
			});
		}

		return false;
	};

	$scope.goBack = function() {
		$state.transitionTo('dashboard');
	};

}]);
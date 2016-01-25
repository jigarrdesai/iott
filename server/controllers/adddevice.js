App.controller('AddDevice', ['$scope', 'Users', 'Cities', 'Devices', function($scope, Users, Cities, Devices) {

	var roles = ['Super Admin', 'Admin', 'Distributor', 'User'];
	$scope.userDetails = {};
	
	$scope.cities = [];
	$scope.tabIndex = 0;
	$scope.formData = {
		user: 0,
		device_type: 'OTHER'
	};

	var resetFormData = function() {
		$scope.formData = {
			user: 0,
			device_type: 'OTHER'
		};
	};

	(reInitSelectBox = function() {
		$scope.selectBox = [{id: 'number:0', label: 'Select User'}];
	})();

	Users.getCurrentUser(function(data){
		$scope.userDetails = data.data;
		console.log($scope.userDetails)
		if($scope.userDetails.role < 4) {	
			prepareSelectBox();
		}
	});

	Cities.findAll({}, function(data){
		console.log(data)
		if(data.status == 'success') {
			$scope.cities = data.data;
			$scope.city = data.data[0].id;
		}
	});

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

		if($scope.addDevice.$valid) {

			var formData = angular.copy($scope.formData);

			if(formData.user == 0) {
				formData.user = angular.copy($scope.userData.id);
			}

			Devices.create(formData, function(data) {
				if(data.status == 'success') {
					resetFormData();
					$.Notify({
					    caption: 'Notify',
					    content: 'Device Added Succesfully.',
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
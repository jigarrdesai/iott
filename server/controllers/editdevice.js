App.controller('EditDevice', ['$scope', '$stateParams', 'Users', 'Cities', 'Devices', function($scope, $stateParams, Users, Cities, Devices) {

	var roles = ['Super Admin', 'Admin', 'Distributor', 'User'];
	$scope.userDetails = {};
	
	$scope.cities = [];
	$scope.tabIndex = 0;
	$scope.dataLoaded = false;
	$scope.formData = {
		user: 0,
		device_type: 'OTHER'
	};
	$scope.deviceId = $stateParams.id;

	var resetFormData = function() {
		$scope.formData = {
			user: 0,
			device_type: 'OTHER'
		};
	};

	(reInitSelectBox = function() {
		$scope.selectBox = [{id: 'number:0', label: 'Select User'}];
	})();

	// Users.getCurrentUser(function(data){
	// 	$scope.userDetails = data.data;
	// 	console.log($scope.userDetails)
	// 	if($scope.userDetails.role < 4) {	
	// 		prepareSelectBox();
	// 	}
	// });

	console.log($scope)

	Devices.findOne({id: $scope.deviceId}, function(device) {
		console.log(device)
		if(device.status == 'error') {
			$state.transitionTo('dashboard');
		} else {
			$scope.formData = device.data;
			$scope.dataLoaded = true;
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

		console.log(this);

		if(this.addDevice.$valid) {

			var formData = angular.copy($scope.formData);

			if(formData.user == 0) {
				formData.user = angular.copy($scope.userData.id);
			}

			Devices.update({
				device_code: $scope.formData.device_code,
				mobile_number: $scope.formData.mobile_number,
				address: $scope.formData.address,
				city: $scope.formData.city,
				device_type: $scope.formData.device_type
			}, {
				id: $scope.formData.id
			}, function(data) {
				if(data.status == 'success') {
					// resetFormData();
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
		$state.transitionTo('show-devices');
	};
}]);
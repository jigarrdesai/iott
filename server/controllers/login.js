App.controller('Login', ['$scope', '$state', '$crypto', 'Users', function($scope, $state, $crypto, Users) {
	
	$scope.formData = {};

	$scope.formSubmit = function() {
		
		if($scope.login.$valid) {
			var submit = angular.extend({}, $scope.formData);

			submit.password = $crypto.encrypt(submit.password);

			console.log(submit)

			Users.doLogin(submit, function(data){

				console.log(data);
				
				if(data.status == 'success') {
					localStorage.userId = data.userId;
					localStorage.accessToken = data.accessToken;

					console.log($state)
					$state.go('dashboard');
					return false;
				} else {
					$scope.errorText = data.errorText;
					var dialog = $('#dialog').data('dialog');

					dialog.open()
				}
			});
		}
	};

	$scope.closeWindow = function() {
		$state.go('exit');
	}

}]);
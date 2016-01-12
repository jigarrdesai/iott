App.controller('Exit', ['$scope', function($scope) {

	delete localStorage.userId;
	delete localStorage.accessToken;
	GUI.Window.get().close();

}]);
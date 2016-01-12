App.controller('App', ['$scope', '$rootScope', 'Users', function($scope, $rootScope, Users) {
	
	$scope.headerInit = function() {

		console.log('init')
		if($rootScope.isLoggedIn()) {
			Users.getCurrentUser(function(data){
				if(data.status == 'success') {
					$rootScope.userDetails = data.data;
				} else {
					$state.transitionTo('logout');
				}
			});
		}
	};

	$scope.contextMenu = function($event) {

		var menu = new GUI.Menu();
		menu.append(new GUI.MenuItem({
			label: 'Alert Me!',
			click: function() {
				alert('This is an alert')
			}
		}));
		menu.append(new GUI.MenuItem({ label: 'Item B' }));
		menu.append(new GUI.MenuItem({ type: 'separator' }));
		menu.append(new GUI.MenuItem({
			label: 'Show Dev Tools',
			click: function() {
				GUI.Window.get().showDevTools();
			}
		}));

		menu.popup(event.x, event.y);
		return false;
	};
}]);
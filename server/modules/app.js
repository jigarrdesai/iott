var App = angular.module('Application', ['ngRoute', 'ui.router', 'ui.bootstrap', ]);
App.run(['$rootScope', '$state', '$stateParams', '$db', '$timeout', 'Users', '$location', function ($rootScope, $state, $stateParams, $db, $timeout, Users, $location) {

	$rootScope.noConnection = false;

	$timeout(function() {
		$db.query('SELECT 1 FROM DUAL', function(err, res) {
			if(err) {
				console.log(err);
				// location = 'noconnection.html';
			}
		});
	}, 5000);

	$rootScope.$state = $state;
	
	var isLoggedIn = function() {
		
		if(!localStorage.userId || !localStorage.accessToken) {
			return false;
		}
		
		// $rootScope.userData = {
		// 	userId: localStorage.userId,
		// 	accessToken: localStorage.accessToken
		// };

		return true;
	};

	var activeConnection = function() {

	};

	$rootScope.isLoggedIn = isLoggedIn;

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
		
		if($rootScope.noConnection) {
			console.log('No Connection');
			event.preventDefault();
			$state.go('noconnection');
			return false;
		}

		if(isLoggedIn()) {

			Users.getCurrentUser(function(data){

				if(data.status == 'success') {
					$rootScope.userDetails = data.data;
				} else {
					event.preventDefault();
					// $state.go('exit');
					return false;
				}
			});

			if(toState.name == 'login') {
				event.preventDefault();
				$state.go('dashboard');
				return false;
			}

			// if($state.is('exit')) {
			// 	$state.transitionTo('exit');
			// 	return false;
			// }

			var Menubar = new GUI.Menu({type: 'menubar'});

			// Create a menuitem
			var optionMenu = new GUI.Menu();
			var deviceMenu = new GUI.Menu();
			var userMenu = new GUI.Menu();

			optionMenu.append(new GUI.MenuItem({
				label: 'Home',
				click: function() {
			  		$state.transitionTo('dashboard');
			  		return false;
				}
			}));

			optionMenu.append(new GUI.MenuItem({
				label: 'Change Password',
				click: function() {
			  		$state.transitionTo('change-password');
			  		return false;
				}
			}));

			optionMenu.append(new GUI.MenuItem({
				label: 'Exit',
				click: function() {
			  		$state.transitionTo('exit');
			  		return false;
				}
			}));

			deviceMenu.append(new GUI.MenuItem({
				label: 'Add Device',
				click: function() {
			  		$state.transitionTo('add-device');
			  		return false;
				}
			}));

			deviceMenu.append(new GUI.MenuItem({
				label: 'Show Devices',
				click: function() {
			  		$state.transitionTo('show-devices');
			  		return false;
				}
			}));

			userMenu.append(new GUI.MenuItem({
				label: 'Add User',
				click: function() {
			  		$state.transitionTo('add-user');
			  		return false;
				}
			}));

			userMenu.append(new GUI.MenuItem({
				label: 'Show Users',
				click: function() {
			  		$state.transitionTo('show-users');
			  		return false;
				}
			}));
			
			Menubar.append(new GUI.MenuItem({
				label: 'Options',
				submenu: optionMenu
			}));
			
			Menubar.append(new GUI.MenuItem({
				label: 'Devices',
				submenu: deviceMenu
			}));
			
			Menubar.append(new GUI.MenuItem({
				label: 'Users',
				submenu: userMenu
			}));

			GUI.Window.get().menu = Menubar;
		} else {

			if(toState.name != 'login') {
				event.preventDefault();
				$state.go('login');
			}

			GUI.Window.get().menu = null;
		}

		// if(toState.name != 'login') {
		// 	event.preventDefault();
		// 	$state.go('login');
		// }
	});
}]);

App.config(['$provide', function($provide){

	$provide.decorator('uibPaginationDirective', function($delegate) {
		var directive = $delegate[0];

		directive.templateUrl = 'partials/custom/pagination.html';

		return $delegate;
	});

}]);

App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/dashboard');
  
	$stateProvider
		.state('dashboard', {
			url: '/dashboard', 
			templateUrl: 'partials/dashboard.html',
			controller: 'Dashboard'
		})
		.state('change-password', {
			url: '/change-password', 
			templateUrl: 'partials/change-password.html',
			controller: 'ChangePassword'
		})
		.state('add-device', {
			url: '/add-device', 
			templateUrl: 'partials/add-device.html',
			controller: 'AddDevice'
		})
		.state('show-device', {
			url: '/show-device/?:id',
			params: {
				id: null
			},
			templateUrl: 'partials/show-device.html',
			controller: 'ShowDevice'
		})
		.state('show-device-gridview', {
			url: '/show-device-gridview/?:id',
			params: {
				id: null
			},
			templateUrl: 'partials/show-device-gridview.html',
			controller: 'ShowDeviceGridView'
		})
		.state('add-user', {
			url: '/add-user', 
			templateUrl: 'partials/add-user.html',
			controller: 'AddUser'
		})
		.state('show-users', {
			url: '/show-users', 
			templateUrl: 'partials/show-users.html',
			controller: 'ShowUsers'
		})
		.state('login', {
			url: '/login', 
			templateUrl: 'partials/login.html',
			controller: 'Login'
		})
		.state('noconnection', {
			url: '/noconnection', 
			templateUrl: 'partials/noconnection.html',
			controller: 'NoConnection'
		})
		.state('exit', {
			url: '/exit',
			controller: 'Exit'
		})
		
	;
}]);
var App = angular.module('Application', []);
App.run(['$db', function ($db) {

	$timeout(function() {
		$db.query('SELECT 1 FROM DUAL', function(err, res) {
			if(!err) {
				window.location = 'index.html';
			}
		});
	}, 5000);
}]);
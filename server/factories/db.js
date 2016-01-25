App.factory('$db', ['$http', '$state', function($http, $state) {

	var db = new MAR.Adapter({
		server: 'localhost',
		username: 'root',
		password: '',
		database: 'nwPOC',
		reconnectTimeout: 2000
	});

	db.query('SELECT 1 FROM DUAL', function(err, res) {
		if(err) {
			console.log($state)
			$state.transitionTo('noconnection');
			return false;
		}
	});
	
	return db;
}]);
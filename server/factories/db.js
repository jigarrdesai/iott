App.factory('$db', ['$http', '$state', function($http, $state) {

	// var db = new MAR.Adapter({
	// 	server: 'localhost',
	// 	username: 'root',
	// 	password: '',
	// 	database: 'nwPOC',
	// 	reconnectTimeout: 2000
	// });

	var db = new MAR.Adapter({
		server: '107.155.108.49',
		port: 3306,
		username: 'root',
		password: 'd0ts@db',
		database: 'iott',
		reconnectTimeout: 2000
	});
	
	return db;
}]);
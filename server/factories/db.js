App.factory('$db', ['$http', '$state', function($http, $state) {

	var db = new MAR.Adapter({
		server: 'localhost',
		username: 'root',
		password: '',
		database: 'nwPOC',
		reconnectTimeout: 2000
	});

	// var db = new MAR.Adapter({
	// 	server: '107.155.108.49',
	// 	port: 3306,
	// 	username: 'root',
	// 	password: 'd0ts@db',
	// 	database: 'iott',
	// 	reconnectTimeout: 2000
	// });
	
	return db;
}]);

// D/T:010216 13:05
// ID: HMT1234567
// mod: REMOTE
// cmd: ON
// pump : OFF
// pwr: OK
// Flt: None
// Alrm:SUMP-EMPTY
// V:434,448,442
// A:0,0,0
// B:4.1V 96%
// S:31


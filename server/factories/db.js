App.factory('$db', function() {

	return new MAR.Adapter({
		server: 'localhost',
		username: 'root',
		password: '',
		database: 'nwPOC',
		reconnectTimeout: 2000
	});
});
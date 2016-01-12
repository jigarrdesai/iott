var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

console.log('\n\n')
console.log(__dirname)
console.log('\n\n')

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../app.html'));
});

app.get('/json', function(req, res) {
	res.json({
		'h1': 'Hello World !'
	});
});

app.listen(3000, '0.0.0.0', function() {
	console.log('Express server listening on http://localhost:3000');
});
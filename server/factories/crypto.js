App.factory('$crypto', function() {

	var algorithm = 'aes256';
	var key = 'dogisdangerous';

	return {
		encrypt: function(text) {

			var cipher = CRYPTO.createCipher(algorithm, key);  
			return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
		},
		decrypt: function(encrypted) {

			var decipher = CRYPTO.createDecipher(algorithm, key);
			return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
		}
	};
});
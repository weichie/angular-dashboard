var mongoose = require('mongoose');

var VerkoopSchema = new mongoose.Schema({
	factuur: String,
	bedrag: Number
});

mongoose.model('Verkoop', VerkoopSchema);
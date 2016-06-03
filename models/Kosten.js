var mongoose = require('mongoose');

var KostSchema = new mongoose.Schema({
	factuur: String,
	bedrag: Number
});

mongoose.model('Kost', KostSchema);
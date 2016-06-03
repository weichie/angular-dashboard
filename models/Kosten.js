var mongoose = require('mongoose');

var KostSchema = new mongoose.Schema({
	date: Date,
	title: String,
	winkel: String,
	bedrag: Number,
	factuur: String,
	beschrijving: String
});

mongoose.model('Kost', KostSchema);
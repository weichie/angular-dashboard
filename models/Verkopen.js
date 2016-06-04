var mongoose = require('mongoose');

var VerkoopSchema = new mongoose.Schema({
	date: {type: Date, default: Date.now },
	title: String,
	bedrag: Number,
	factuur: Number,
	bedrijfsnaam: String,
	btw_nr: String,
	beschrijving: String
});

mongoose.model('Verkoop', VerkoopSchema);
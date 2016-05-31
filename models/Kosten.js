var mongoose = require('mongoose');

var KostSchema = new mongoose.Schema({
	rekening: String,
	prijs: {type: Number, default: 0}
});

mongoose.model('Kost', KostSchema);
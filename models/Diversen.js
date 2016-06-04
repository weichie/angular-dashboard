var mongoose = require('mongoose');

var DiversSchema = new mongoose.Schema({
	date: {type: Date, default: Date.now },
	title: String,
	info: String,
	document: Buffer
});

mongoose.model('Divers', DiversSchema);
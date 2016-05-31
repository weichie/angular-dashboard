var mongoose = require('mongoose');

var InkomstSchema = new mongoose.Schema({
	factuur: String,
	bedrag: {type: Number, default: 0}
});

mongoose.model('Inkomst', InkomstSchema);
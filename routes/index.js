var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Verkoop = mongoose.model('Verkoop');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/verkoop', function(req,res,next){
	Verkoop.find(function(err,verkoop){
		if(err){return next(err);}

		res.json(verkoop);
	});
});

router.post('/verkoop', function(req,res,next){
	var verkoop = new Verkoop(req.body);

	verkoop.save(function(err, question){
		if(err){ return next(err);}

		res.json(verkoop);
	});
});

router.param('verkoop', function(req,res,next,id){
	var query = Verkoop.findById(id);

	query.exec(function(err,question){
		if(err){return next(err);}
		if(!verkoop){return next(new Error('Kan het verkoopfactuur niet vinden...')); }

		req.verkoop = verkoop;
		return next();
	});
});

module.exports = router;
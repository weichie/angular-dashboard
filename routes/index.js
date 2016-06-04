var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Verkoop = mongoose.model('Verkoop');
var Kost = mongoose.model('Kost');
var Divers = mongoose.model('Divers');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Dashboard' });
});

router.get('/verkoop', function(req,res,next){
	Verkoop.find(function(err,verkoop){
		if(err){return next(err);}

		res.json(verkoop);
	});
});
router.get('/kost', function(req,res,next){
	Kost.find(function(err,kost){
		if(err){ return next(err);}

		res.json(kost);
	});
});
router.get('/divers', function(req,res,next){
	Divers.find(function(err,divers){
		if(err){return next(err);}

		res.json(divers);
	});
});

router.post('/verkoop', function(req,res,next){
	var verkoop = new Verkoop(req.body);

	verkoop.save(function(err, question){
		if(err){ return next(err);}

		res.json(verkoop);
	});
});
router.post('/kost', function(req,res,next){
	var kost = new Kost(req.body);

	kost.save(function(err, question){
		if(err){return next(err);}

		res.json(kost);
	});
});
router.post('/divers', function(req,res,next){
	var divers = new Divers(req.body);

	divers.save(function(err,question){
		if(err){return next(err);}

		res.json(divers);
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
router.param('kost', function(req,res,next,id){
	var query = Kost.findById(id);

	query.exec(function(err,question){
		if(err){return next(err);}
		if(!kost){return next(new Error('Kan het kostfactuur niet vinden...')); }

		req.kost = kost;
		return next();
	});
});
router.param('divers', function(req,res,next,id){
	var query = Divers.findById(id);

	query.exec(function(err,question){
		if(err){return next(err);}
		if(!kost){return next(new Error('Kan formulier diversen niet vinden...')); }

		req.divers = divers;
		return next();
	});
});

module.exports = router;
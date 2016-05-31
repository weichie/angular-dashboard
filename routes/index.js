var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Inkomst = mongoose.model('Inkomst');
var Kost = mongoose.model('Kost');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/inkomsten', function(req,res,next){
	Inkomst.find(function(err,inkomsten){
		if(err){return next(err);}

		res.json(inkomsten);
	});
});

router.post('/inkomsten', function(req,res,next){
	var inkomst = new Inkomst(req.body);

	inkomst.save(function(err,inkomst){
		if(err){return next(err);}

		res.json(inkomst);
	});
});

router.param('inkomst', function(req,res,next,id){
	var query = Inkomst.findById(id);

	query.exec(function(err, inkomst){
		if(err){return next(err);}
		if(!inkomst){return next(new Error('Can\'t find inkomst'));}

		req.inkomst = inkomst;
		return next();
	});
});

router.get('/inkomsten/:inkomst', function(req,res){
	res.json(req.inkomst);
});

module.exports = router;
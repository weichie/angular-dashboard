var app = angular.module('accountand-app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'MainCtrl',
			resolve: {
				postPromise: ['verkopen', 'kosten', function(verkopen, kosten){
					return verkopen.getAll();
					return kosten.getAll();
				}]
			}
		})
		.when('/kosten', {
			templateUrl: 'pages/kosten.html',
			controller: 'KostCtrl',
			resolve: {
				postPromise: ['kosten', function(kosten){
					return kosten.getAll();
				}]
			}
		})
		.otherwise({
			redirectTo: '/'
		});
});

app.filter('reverse', function() {
	return function(items) {
		return items.slice().reverse();
	};
});

app.factory('verkopen', ['$http',function($http){
	var o = {
		inkomsten: []
	};

	o.getAll = function(){
		return $http.get('/verkoop').success(function(data){
			angular.copy(data, o.inkomsten);
		});
	};
	o.get = function(id){
		return $http.get('/verkoop/' + id).then(function(res){
			return res.data;
		});
	};
	o.create = function(verkoop){
		return $http.post('/verkoop', verkoop).success(function(data){
			o.inkomsten.push(data);
		});
	};

	return o;
}]);
app.factory('kosten', ['$http', function($http){
	var o = {
		kosten: []
	};

	o.getAll = function(){
		return $http.get('/kost').success(function(data){
			angular.copy(data, o.kosten);
		});
	};
	o.get = function(id){
		return $http.get('/kost/' + id).then(function(res){
			return res.data;
		});
	};
	o.create = function(kost){
		return $http.post('/kost', kost).success(function(data){
			o.kosten.push(data);
		});
	};

	return o;
}]);

app.controller('MainCtrl', ['$scope', 'verkopen', 'kosten', function($scope, verkopen, kosten){
	verkopen.getAll();
	$scope.inkomsten = verkopen.inkomsten;
	kosten.getAll();
	$scope.kosten = kosten.kosten;

	$scope.lastInkomsten = function(){
		var laatsteInkomsten = $scope.inkomsten.length - 5;
		var total = 0;
		for(var i = 0; i < $scope.inkomsten.length; i++){
			var rekening = $scope.inkomsten[i];
			if( i >= laatsteInkomsten ){ 
				total += (rekening.bedrag);
			}
		}
		return total;
	};
	$scope.lastKosten = function(){
		var laatsteKosten = $scope.kosten.length - 5;
		var total = 0;
		for(var i = 0; i < $scope.kosten.length; i++){
			var rekening = $scope.kosten[i];
			if( i >= laatsteKosten ){ 
				total += (rekening.bedrag);
			}
		}
		return total;
	};

	$scope.allInkomsten = function(){
		var total = 0;
		for(var i = 0; i < $scope.inkomsten.length; i++){
			var rekening = $scope.inkomsten[i];
			total += (rekening.bedrag);
		}
		return total;
	};
	$scope.allKosten = function(){
		var total = 0;
		for(var i = 0; i < $scope.kosten.length; i++){
			var rekening = $scope.kosten[i];
			total += (rekening.bedrag);
		}
		return total;
	};

	$scope.addInkomsten = function(){
		if(!$scope.factuur || $scope.factuur == "" || !$scope.bedrag || $scope.bedrag == ""){
			return;
		}

		verkopen.create({
			factuur: $scope.factuur, 
			bedrag: $scope.bedrag
		});

		$scope.factuur = "";
		$scope.bedrag = "";
	};
	$scope.addKosten = function(){
		if(!$scope.rekening || $scope.rekening == "" || !$scope.kost || $scope.kost == ""){
			return;
		}

		kosten.create({
			factuur: $scope.rekening,
			bedrag: $scope.kost
		});

		$scope.rekening = "";
		$scope.kost = "";
	};
}]);
app.controller('KostCtrl', ['$scope', 'kosten', function($scope, kosten){

}]);


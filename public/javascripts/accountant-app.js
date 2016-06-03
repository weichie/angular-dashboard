var app = angular.module('accountand-app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'MainCtrl',
			activetab: 'home',
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
			activetab: 'kosten',
			resolve: {
				postPromise: ['kosten', function(kosten){
					return kosten.getAll();
				}]
			}
		})
		.when('/inkomsten', {
			templateUrl: 'pages/inkomsten.html',
			controller: 'VerkoopCtrl',
			activetab: 'inkomsten',
			resolve: {
				postPromise: ['verkopen', function(verkopen){
					return verkopen.getAll();
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
}]);
app.controller('SidebarCtrl', ['$scope', '$route', function($scope, $route){
	$scope.$route = $route;
}]);
app.controller('KostCtrl', ['$scope', 'kosten', function($scope, kosten){
	kosten.getAll();
	$scope.kosten = kosten.kosten;

	$scope.addKosten = function(){
		if(!$scope.title || $scope.title == "" || !$scope.bedrag || $scope.bedrag == ""){
			return;
		}

		kosten.create({
			date: $scope.date,
			title: $scope.title,
			winkel: $scope.winkel,
			bedrag: $scope.bedrag,
			factuur: $scope.factuur,
			beschrijving: $scope.extra
		});

		$scope.date = "";
		$scope.title = "";
		$scope.winkel = "";
		$scope.bedrag = "";
		$scope.factuur = "";
		$scope.extra = "";
	};
}]);
app.controller('VerkoopCtrl', ['$scope', 'verkopen', function($scope, verkopen){
	verkopen.getAll();
	$scope.inkomsten = verkopen.inkomsten;

	$scope.addInkomsten = function(){
		if(!$scope.title || $scope.title == "" || !$scope.bedrag || $scope.bedrag == ""){
			return;
		}

		verkopen.create({
			date: $scope.date,
			title: $scope.title,
			bedrag: $scope.bedrag,
			factuur: $scope.factuur,
			bedrijfsnaam: $scope.bedrijfsnaam,
			btw_nr: $scope.btw_nr,
			beschrijving: $scope.extra
		});

		$scope.date = "";
		$scope.title = "";
		$scope.bedrag = "";
		$scope.factuur = "";
		$scope.bedrijfsnaam = "";
		$scope.btw_nr = "";
		$scope.extra = "";
	};
}]);
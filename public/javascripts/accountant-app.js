var app = angular.module('accountand-app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'MainCtrl',
			resolve: {
				postPromise: ['inkomsten', function(inkomsten){
					return inkomsten.getAll();
				}]
			}
		});
		/*
		.when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        });
		*/
});

app.factory('verkopen', ['$http',function($http){
	var o = {
		inkomsten: []
	};
	return o;

	o.getAll = function(){
		return $http.get('/inkomsten').success(function(data){
			angular.copy(data, o.inkomsten);
		});
	};

	o.create = function(inkomst){
		return $http.inkomst('/inkomsten', inkomst).success(function(data){
			o.inkomsten.push(data);
		});
	};
}]);

app.factory('aankopen', [function(){
	var o = {
		kosten: []
	};
	return o;
}])

app.controller('MainCtrl', ['$scope', 'verkopen', 'aankopen', function($scope, verkopen, aankopen){
	$scope.inkomsten = verkopen.inkomsten;
	$scope.kosten = aankopen.kosten;

	$scope.addInkomsten = function(){
		if(!$scope.factuur || $scope.factuur == "" || !$scope.bedrag || $scope.bedrag == ""){
			return;
		}

		$scope.create({
			factuur: $scope.factuur, 
			bedrag: $scope.bedrag
		});
		/*
		$scope.inkomsten.push({
			factuur: $scope.factuur, 
			bedrag: $scope.bedrag
		});
		*/
		$scope.factuur = "";
		$scope.bedrag = "";
	};

	$scope.addKosten = function(){
		if(!$scope.rekening || $scope.rekening == "" || !$scope.kost || $scope.kost == ""){
			return;
		}

		$scope.kosten.push({
			rekening: $scope.rekening,
			kost: $scope.kost
		});

		$scope.rekening = "";
		$scope.kost = "";
	};
}]);
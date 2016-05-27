var app = angular.module('accountand-app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'MainCtrl'
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

app.factory('inkomsten', [function(){
	var o = {
		inkomsten: []
	};
	return o;
}]);

app.controller('MainCtrl', ['$scope', 'inkomsten', function($scope, inkomsten){
	$scope.inkomsten = inkomsten.inkomsten;

	$scope.addRekening = function(){
		if(!$scope.factuur || $scope.factuur == "" || !$scope.bedrag || $scope.bedrag == ""){
			return;
		}

		$scope.inkomsten.push({
			factuur: $scope.factuur, 
			bedrag: $scope.bedrag
		});

		$scope.factuur = "";
		$scope.bedrag = "";
	};
}]);
var app = angular.module('accountand-app', ['ngRoute']);

app.factory('verkopen', ['$http',function($http){
	var o = {
		inkomsten: []
	};

	o.getAll = function(){
		return $http.get('/verkoop').success(function(data){
			angular.copy(data, o.verkopen);
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

app.controller('MainCtrl', ['$scope', 'verkopen', function($scope, verkopen){
	verkopen.getAll();
	$scope.inkomsten = verkopen.inkomsten;

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
}]);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'MainCtrl',
			resolve: {
				postPromise: ['verkopen', function(verkopen){
					return verkopen.getAll();
				}]
			}
		});
});
'use strict';

/**
 * @ngdoc function
 * @name angularDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularDemoApp
 */
angular.module('metacriticApp')
  .controller('MainCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
			
			console.log('in controller');
			
			$http.get('/get/platforms/5').
				  success(function(data) {
					// this callback will be called asynchronously
					console.log(data);
					// when the response is available
				  }).
				  error(function(data) {
					// called asynchronously if an error occurs
					console.log('fail');
					// or server returns response with an error status.
				  });
				  
			 $scope.getSystems = function() {
				console.log('sup');
			}
				  
				  
			/*
				$scope.systems = [
				{ name: 'ps4',    selected: true },
				{ name: 'xboxone',   selected: false },
				{ name: 'ps3',     selected: false },
				{ name: 'xbox360', selected: false },
				{ name: 'pc', selected: false },
				{ name: 'wii-u', selected: false },
				{ name: '3ds', selected: false },
				{ name: 'vita', selected: false },
				{ name: 'ios', selected: false },
				];

				// selected systems
				$scope.selection = [];
				var selections;

				// helper method to get selected systems
				$scope.selectedSystems = function selectedSystems() {
				return filterFilter($scope.systems, { selected: true });
				};


				// watch systems for changes
				$scope.$watch('systems|filter:{selected:true}', function (nv) {
				selections = nv.map(function (system) {
				console.log(system.name);
				//buildGames(system.name);
				return system.name;
				});
				}, true);
			
		*/
		
  }]);

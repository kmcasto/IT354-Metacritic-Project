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
					console.log('success');
					console.log(data);
					// when the response is available
				  }).
				  error(function(data) {
					// called asynchronously if an error occurs
					console.log('fail');
					// or server returns response with an error status.
				  });
			
			
		
  }]);

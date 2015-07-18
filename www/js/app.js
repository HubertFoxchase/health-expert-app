'use strict';

angular.module('c4c', ['ngMaterial', 'ngMdIcons', 'ngRoute', 'controllers', 'services', 'values', 'ngCordovaOauth'])
.value('$config', {
      clientId     : '817202020074-1b97ag04r8rhfj6r40bocobupn92g5bj.apps.googleusercontent.com',
      scope        : [ 'https://www.googleapis.com/auth/userinfo.email' ],
      apiUrl	   : 'https://health-expert-1705.appspot.com',
      organisation : {id: "5722646637445120", name : "C4C"}
})
.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/list', {
			templateUrl: 'templates/list.html',
			controller: 'PatientCtrl',
			resolve : { init: ['$api', function($api) {
		          	return $api.load();
	        	}]
			}
		})
		.when('/start', {
			templateUrl: 'templates/start.html',
			controller: 'StartCtrl',
			resolve : { init: ['$api', function($api) {
		          	return $api.load();
	        	}]
			}
		})
		.when('/authorise', {
			templateUrl: 'templates/authorise.html',
			controller: 'StartCtrl',
			resolve : { init: ['$api', function($api) {
	          	return $api.load();
	        	}]
			}
		})
		.when('/:patient/intro', {
			templateUrl: 'templates/intro.html',
			controller: 'StartCtrl',
			resolve : { init: ['$api', function($api) {
	          	return $api.load();
	        	}]
			}
		})
		.when('/:patient/gender', {
			templateUrl: 'templates/gender.html',
			controller: 'StartCtrl',
			resolve : { init: ['$api', function($api) {
	          	return $api.load();
	        	}]
			}
		})
		.when('/:patient/age', {
			templateUrl: 'templates/age.html',
			controller: 'StartCtrl',
			resolve : { init: ['$api', function($api) {
	          	return $api.load();
	        	}]
			}
		})
		.when('/:patient/reason', {
			templateUrl: 'templates/reason.html',
			controller: 'StartCtrl',
			resolve : { init: ['$api', function($api) {
	          	return $api.load();
	        	}]
			}
		})		
		.when('/:patient/groups', {
			templateUrl: 'templates/symptom1.html',
			controller: 'StartCtrl',
			resolve : { init: ['$api', function($api) {
	          	return $api.load();
	        	}]
			}
		})
		.when('/:patient/initial/:groupId', {
			templateUrl: 'templates/symptom2.html',
			controller: 'StartCtrl',
			resolve : { init: ['$api', function($api) {
	          	return $api.load();
	        	}]
			}
		})	
		.when('/:session/end', {
			templateUrl: 'templates/end.html',
			controller: 'QuestionsCtrl',
			resolve : { init: ['$api', function($api) {
	          	return $api.load();
	        	}]
			}
		})
		.when('/:session/symptom/:sid', {
			templateUrl: 'templates/question.html',
			controller: 'QuestionsCtrl',
			resolve : { init: ['$api', function($api) {
	          	return $api.load();
	        	}]
			}
		})
		.when('/:session/symptom', {
			templateUrl: 'templates/question.html',
			controller: 'QuestionsCtrl',
			resolve : { init: ['$api', function($api) {
	          	return $api.load();
	        	}]
			}
		})
	    .otherwise({
	          redirectTo: '/list'
	    });		

    //$locationProvider.html5Mode({enabled: true,requireBase:false});
}])
.directive('myClick', function() {
    return function(scope, element, attrs) {
        element.bind('click', function(event) {
        	
            event.preventDefault();
            event.stopPropagation();

            if(!element[0].disabled)
            	scope.$apply(attrs['myClick']);
        });
    };
})
.run(["$rootScope", "$location", 
      function ($rootScope, $location) {
	
    	$rootScope.$on('$routeChangeSuccess', function(){
    		ga('send', 'pageview', $location.path());
    	});
    	
    	document.addEventListener("backbutton", function(){
    		if(location.hash == "#/start") {
    			navigator.app.exitApp();
    		}
    		else {
    			return false;
    		}
    	}, false);
}]);
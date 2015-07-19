'use strict';

angular.module('services', []).

factory('$api',  ['$q', '$config', '$cordovaOauth', '$rootScope', function ($q, $config, $cordovaOauth, $rootScope) {

	var deferred = $q.defer();
	var _api = null;
	
    var clientId = $config.clientId,
    	apiUrl = $config.apiUrl,
        scopes = $config.scope;
    
	var checkAuth = function() {

		$cordovaOauth.google(clientId, scopes).then(function(result) {
		    handleAuthResult(result);
		}, function(error) {
			deferred.reject('auth error');
		});
	};
	
	var handleAuthResult = function(authResult) {
		if (authResult && !authResult.error) {
        	gapi.load('client', {'callback': clientReady});
	    } 
	    else {
	        deferred.reject('authentication error');
	    }
	};    
	
	var clientReady = function() {
    	var ROOT = apiUrl + '/_ah/api';
   		gapi.client.load('c4c', 'v1', apiReady, ROOT);
    }      

    var apiReady = function() {
        if (gapi.client.c4c) {
        	_api = gapi.client.c4c;
			$rootScope.organisation = $config.organisation;
            deferred.resolve(_api);
        } 
        else {
            deferred.reject('api load error');
        }
    }      
    
    return {
    	load : function() {
    		if(_api) {
	            deferred.resolve(_api);
    		}
    		else {
            	gapi.load('client', {'callback': clientReady});
        	    //gapi.load('auth', {'callback': checkAuth});
	            return deferred.promise;
    		}
    	},
    	
    	handleAuthClick : function (event) {
    		
    		$cordovaOauth.google(clientId, scopes).then(function(result) {
    		    handleAuthResult(result);
    		}, function(error) {
    			deferred.reject('auth error');
    		});
    	    
    	    deferred = $q.defer();
    	    return deferred.promise;
    	},
    	
    	get : function(){
    		return _api;
    	}
    };
}]);
'use strict';

angular.module("directives", [])

.directive('myClick', function() {
    return function(scope, element, attrs) {
        element.bind('touchend click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            scope.$apply(attrs['myClick']);
        });
    };
})
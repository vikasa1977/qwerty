
angular.module('SMART2')
.directive('ckeditior', ['$timeout', 

function ckeditorDirectiveFunc($timeout){
        return {
            restrict: 'A',
            link: function (scope, iElement, iAttrs) {
                $timeout(function(){
                     CKEDITOR.replace(iAttrs.id);
                })
                    
                }
        };

           }

]);
angular.module('SMART2')
    .filter('shortname', [shortnameFilterfunc]);

function shortnameFilterfunc() {

        return function(value) {
        	if(value != undefined){
            
            var getValue = value.split(' ');

            if( getValue[0] == getValue[getValue.length - 1]){

            return getValue[0].charAt(0)
            }else{
            return getValue[0].charAt(0) + getValue[getValue.length - 1].charAt(0)
            }
            

			};



        }
          }
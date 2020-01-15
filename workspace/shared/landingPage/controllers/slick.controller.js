(function(angular) {
    
    'use strict';

    angular.module('SMART2')

  .controller('SlickController', function ($scope, $timeout) {

        $scope.items = [];

        // simulate that the data is loaded from a remote source
        $timeout(function () {


            $scope.items = [
              {
                  imgSrc: 'http://placekitten.com/325/325',
                  name: 'Cat one',
                  header: 'one'
                 
              },
              {
                  imgSrc: 'http://placekitten.com/g/325/325',
                  name: 'Cat two',
                  header: 'two'
              },
              {
                  imgSrc: 'http://placekitten.com/325/325',
                  name: 'Cat three',
                  header: 'three'
              },
              {
                  imgSrc: 'http://placekitten.com/g/325/325',
                  name: 'Cat four',
                  header: 'four'
              },
              {
                  imgSrc: 'http://placekitten.com/325/325',
                  name: 'Cat five',
                  header: 'five'
              },
              {
                  imgSrc: 'http://placekitten.com/g/325/325',
                  name: 'Cat six',
                  header: 'six'
              },
              {
                  imgSrc: 'http://placekitten.com/325/325',
                  name: 'Cat seven',
                  header: 'seven'

              },
              {
                  imgSrc: 'http://placekitten.com/g/325/325',
                  name: 'Cat eight',
                  header: 'eight'
              },
              {
                  imgSrc: 'http://placekitten.com/325/325',
                  name: 'Cat nine',
                  header: 'nine'
              },
              {
                  imgSrc: 'http://placekitten.com/g/325/325',
                  name: 'Cat ten',
                  header: 'ten'
              }
            ];

            // update the dataLoaded flag after the data has been loaded
            // i dont know why but its important that the flag doesnt get initialized in an previous step like $scope.dataLoaded = false;
            $scope.dataLoaded = true;

        }, 2000);

        $scope.messItUp = function () {

            $scope.dataLoaded = false;


            $scope.items = [
                { imgSrc: 'http://lorempixel.com/325/325/sports/', label: 'label 1' },
                { imgSrc: 'http://lorempixel.com/325/325/sports/', label: 'label 2' },
                { imgSrc: 'http://lorempixel.com/325/325/sports/', label: 'label 3' },
                { imgSrc: 'http://lorempixel.com/325/325/sports/', label: 'label 4' },
                { imgSrc: 'http://lorempixel.com/325/325/sports/', label: 'label 5' },
                { imgSrc: 'http://lorempixel.com/325/325/sports/', label: 'label 6' },
                { imgSrc: 'http://lorempixel.com/325/325/sports/', label: 'label 7' },
                { imgSrc: 'http://lorempixel.com/325/325/sports/', label: 'label 8' },
                { imgSrc: 'http://lorempixel.com/325/325/sports/', label: 'label 9' },
                { imgSrc: 'http://lorempixel.com/325/325/sports/', label: 'label 10' }
            ];

            // the slick directive doesn't expose the reinit method to the public api 
            // so we trick it out with ng-include and ng-if attribute. we need to put it in the timeout function in order to get the prevoiusly elements completly removed.
            // otherwise the old elements stay in the directive and the carousel breaks
            $timeout(function () {
                $scope.dataLoaded = true;
            });

        

        }

    });
})(angular);

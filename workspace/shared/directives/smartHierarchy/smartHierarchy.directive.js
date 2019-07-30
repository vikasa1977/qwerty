/**
 * @memberof SMART2
 * @ngdoc directive
 * @name SmartHierarchy
 * @description This directive is useful for creating hierarchical structure.
 * 
 * @attr {Object} config
 *    Config object is expected to decide the behaviour of the component.
 * @attr {Function} callback
 *    Callback function when selections are done in component
 * 
 * @example
Controller : 
    config :
     $scope.treeComponentConfig = {
                selectedNodes: "", // Coma seperated codes string given to component for pre selection, 
                				   // so the default selections can be shown selected when the component 
                				   // in initialized.
                isRadio: false, // Boolean values to toggle between checkBox & radioButton
                getHierarchyOnSelection: true, // If set to true , selection hierarchy
                                               // (uptil the relevent parent) also will be recieved 
                                               // in selection callback.
                isLazyLoad: true, // If set to true, data would be fetched from the server on demand 
                                  // (lazyLoading on scroll & node expansion)
                data: null, // Custom data can also be passed to component, representation would be in hierarchical manner.
                disableLevelSelection: '', // comma seperated string values of levels to be shown disabled eg. "1,2,3".
                title: 'Category', // Title of the component.
                getSelections: false, // On setting it true, it will call the callback function 
                                      // provided to the component with seleted values in the ouput.
                clearCache: false, // On setting it true, it will clear the Java script heap 
                                   // runtime memory which will reduce the memory foot print of the web page.
                height: '328px', // Height can be set to the component.
                isSearchEnabled : true, // Bollean value to toggle the visibility of search bar.
                requestParameter: { // Request parameter is expected to fetch the data from the server. 
                    navigationContext: "PAS",
                    userExecutionContext: '{"ClientName":"abc,....}',
                    documentCode: null,
                    contactCode: null,
                }
            };
    callback :
         $scope.treeComponentCallback = function (e) {
                console.log(e);

                // Un comment the below logic to see admin use case.
                // TODO : getHierarchyOnSelection:true (in tree config)

                // var obj = { 'PASList': [] };
                // var levelData = _.groupBy(_.flatten(e.selectionHierarchy), "Level");
                // _.each(levelData, function (data, key) {
                    // _.each(data, function (n) {
                        // n['selection'] = "0";
                    // });
                    // obj['PASList'].push({
                        // "Level": key,
                        // "PASDetails": data
                    // });
                // });
                // $scope.treeComponentConfig.isRadio = true;
                // $scope.treeComponentConfig.data = obj;
                // $scope.treeComponentConfig.selectedNodes = e.selections[0]['ID'].toString();
         }
  Usage:
      <smart-hierarchy-component config="treeComponentConfig" callback="treeComponentCallback"></smart-hierarchy-component>
      */
      (function (angular) {
      	'use strict';
        angular.module('smartHierarchyComponent', [])
        .directive('smartHierarchyComponent', ['$timeout', 'RESTApi', '$q', '$rootScope',
          function($timeout, RESTApi, $q, $rootScope) {
           return {
            restrict : 'E',
            replace : true,
            scope : {
             config: '=',
             callback: '&'
           },
           link : function(scope, element, attrs) {
             /*config for the directive*/

             scope.treeConfig = scope.config;
             var doneCallback = scope.$eval(scope.callback);

             scope.config.refreshConfig = function (newData) {
              scope.treeConfig = newData;
              resetValue(scope.treeConfig);

            }

            var resetValue = function(data)
            {         
               if (scope.treeConfig.isRadio) {

               scope.uniqueRadioGroupName = uniqueIDGenerator();
            }

            if(scope.treeConfig.clearCache)
            {
               resetDataSourcesAndPromises();
               scope.isLoading = false;
               scope.treeConfig.clearCache = false;
            }



             dataRecievedCallPromise;
             preselectionRecievedPromise;
             promises = [];

             /*Local variables*/
             navContext = scope.treeConfig.navigationContext;
             isLazyLoadServerData = (scope.treeConfig.isLazyLoad == true || scope.treeConfig.isLazyLoad == false) ? scope.treeConfig.isLazyLoad : false;
             dataSet;
             searchBucket = 50;
             lazyLoadingBucket = 50;
             maxLevel = 1;
             lazyLoadOffset;
             lazyLoadMarker = [];
             levelKey = 'level';

             //levelWiseData = {};
             parentStringConstant = "parentString";
             parentCodeStringConstant = "parentCodeString";
             preselection;
             isInitialServiceCalled = false;
             searchCategories = [];
             baseLevelExpectNode = [];

             nodeExpandingCodeProperty;
             dataProperty;
             levelWiseDataProperty;
             searchProperty;
             modelProperty;

             //scope.totalSelection = 0;
             //totalID = [];
             //totalName = [];

             selectAllBool = false;

             scope.getUserSelectionArray =[];
             scope.selectionAndCountOptions = false;

             scope.treeType = scope.treeConfig.treeType;

             scope.isReadOnly = scope.treeConfig.isReadOnly;
             scope.isDisabled = scope.treeConfig.isDisabled;
             scope.isSingleSelect = scope.treeConfig.isRadio;

             

            // if(scope.treeConfig.requestParameter)
            // {
              
            //           //scope.treeConfig.requestParameter = n;
            //           RESTApi.setDocumentId(scope.treeConfig.requestParameter.documentCode);
            //           RESTApi.setContactCode(scope.treeConfig.requestParameter.contactCode);
            //           RESTApi.setUserContext(scope.treeConfig.requestParameter.userExecutionContext);
            //           RESTApi.setEnvironment(scope.treeConfig.requestParameter.environment);
            //           RESTApi.setRequestObject(scope.treeConfig.requestParameter.requestObject);
            //           setKeysAsPerNavigationContext(scope.treeConfig.requestParameter.navigationContext);
            //           navContext = scope.treeConfig.requestParameter.navigationContext;
                    
            //         init();
                  
            // }

            scope.showSelectAll = scope.treeConfig.showSelectAll;
            scope.showClearSelection = scope.treeConfig.showClearSelection;
            scope.showSelectionCount = scope.treeConfig.showSelectionCount;
            scope.enableLastLevelSelection  = scope.treeConfig.enableLastLevelSelection;
            
           }; 


            /* scope.$watch('config', function (n, o) {
              if (n) {
                scope.treeConfig = null;
                scope.treeConfig = scope.config;
                clearAllsearch();
               
                dataRecievedCallPromise;
                preselectionRecievedPromise;
                promises = [];
               
                navContext = scope.treeConfig.navigationContext;
                isLazyLoadServerData = (scope.treeConfig.isLazyLoad == true || scope.treeConfig.isLazyLoad == false) ? scope.treeConfig.isLazyLoad : false;
                dataSet;
                searchBucket = 50;
                lazyLoadingBucket = 50;
                maxLevel = 1;
                lazyLoadOffset;
                lazyLoadMarker = [];
                levelKey = 'level';
                levelWiseData = {};
                parentStringConstant = "parentString";
                parentCodeStringConstant = "parentCodeString";
                preselection;
                isInitialServiceCalled = false;
                searchCategories = [];
                baseLevelExpectNode = [];
                nodeExpandingCodeProperty;
                dataProperty;
                levelWiseDataProperty;
                searchProperty;
                modelProperty;
                scope.totalSelection = 0;
                totalID = [];
                totalName = [];
                selectAllBool = false;
                scope.getUserSelectionArray =[];
                scope.treeType = scope.treeConfig.treeType;
                scope.isReadOnly = scope.treeConfig.isReadOnly;
                scope.isDisabled = scope.treeConfig.isDisabled;
              }
            });*/

            function clearAllsearch()
            {
              serverSearchVal = "";
              scope.searchResults.length = 0;
              searchDataYetToBeDisplayed.length = 0;
              searchWithContainsHitResult.length = 0;
              scope.searchText = '';
              scope.searchFieldVal = '';
            }


            /*scope.$watch('config.clearCache', function (n, o) {
              if (n) {
               resetDataSourcesAndPromises();
               scope.isLoading = false;
               scope.config.clearCache = false;
             }
          });*/


            scope.$watch('config.getSelections', function (n, o) {
              if(n){
               getSelections();
               scope.config.getSelections = false;
             }
           });


            scope.$watch('config.requestParameter', function(n, o) {
      						//if (!scope.treeConfig.data && n) {
      							if (n) {
                      scope.treeConfig.requestParameter = n;
                      RESTApi.setDocumentId(n.documentCode);
                      RESTApi.setContactCode(n.contactCode);
                      RESTApi.setUserContext(n.userExecutionContext);
                      RESTApi.setEnvironment(n.environment);
                      RESTApi.setRequestObject(n.requestObject);
                      setKeysAsPerNavigationContext(n.navigationContext);
                      navContext = n.navigationContext;
      							//request params than it must go in 
      							//if (!isInitialServiceCalled)
      							init();
      						}
      						//scope.treeConfig.requestParameter = null;
      					});



            scope.$watch('config.selectedNodes', function (n, o) {
              if (n) {
               preselection = n.split(',');
               if (preselectionRecievedPromise)
                preselectionRecievedPromise.resolve();
            }
            scope.config.selectedNodes = null;
          });



            /*scope.$watch('config.isRadio', function(n, o) {
              scope.isSingleSelect = n;
              if (scope.isSingleSelect) {
               scope.uniqueRadioGroupName = uniqueIDGenerator();
             }
             scope.config.isRadio = false;
           });*/


            scope.$watch('config.data', function(n, o) {
              if (n) {
               setKeysAsPerNavigationContext(scope.treeConfig.navigationContext);
               navContext = scope.treeConfig.navigationContext;
               resetDataSourcesAndPromises(true);
               createLevelWiseDataSet(_.sortBy(n[dataProperty], 'Level'));
               dataRecievedCallPromise.resolve();
               renderLevels();
             }
             scope.config.data = null;
           });


            var navContext;
            /*promise*/
            var dataRecievedCallPromise;
            var preselectionRecievedPromise;
            var promises = [];
            var selectAllBool = false;
            /*Local variables*/
            var isLazyLoadServerData = (scope.treeConfig.isLazyLoad == true || scope.treeConfig.isLazyLoad == false) ? scope.treeConfig.isLazyLoad : false;
            var dataSet;
            var searchBucket = 50;
            var lazyLoadingBucket = 50;
            var maxLevel = 1;
            var lazyLoadOffset;
            var lazyLoadMarker = [];
            var levelKey = 'level';
            var levelWiseData = {};
            var parentStringConstant = "parentString";
            var parentCodeStringConstant = "parentCodeString";
            var preselection;
            var isInitialServiceCalled = false;
            var searchCategories = [];
            var baseLevelExpectNode = [];
            var nodeExpandingCodeProperty;
            var dataProperty;
            var levelWiseDataProperty;
            var searchProperty;
            var modelProperty;
            var treeTypeObject ="Generic"; 
            scope.codeProperty = 'ID';
            scope.titleProperty = 'Name';
            scope.levelProperty = 'Level';
            scope.parentProperty = 'ParentID';
            scope.getUserSelectionArray =[];
            scope.treeType = "Generic";
            scope.totalSelection = 0;
            
            scope.isReadOnly = false;
            scope.isDisabled = false;

            scope.showSelectAll = false;
            scope.showClearSelection = false;
            scope.showSelectionCount = false;
            scope.enableLastLevelSelection = false;




            scope.isReadOnly = scope.treeConfig.isReadOnly;
            scope.isDisabled = scope.treeConfig.isDisabled;
            scope.isSingleSelect = scope.treeConfig.isRadio;
            
            scope.showSelectAll = scope.treeConfig.showSelectAll;
            scope.showClearSelection = scope.treeConfig.showClearSelection;
            scope.showSelectionCount = scope.treeConfig.showSelectionCount;
            scope.enableLastLevelSelection  = scope.treeConfig.enableLastLevelSelection;


            scope.selectionAndCountOptions = false;

            var totalID = [];
            var totalName = [];

            function setKeysAsPerNavigationContext(mode) {
              switch(mode) {
               case 'PAS':
               nodeExpandingCodeProperty = 'PASCodes';
               dataProperty = 'PASList';
               levelWiseDataProperty = 'PASDetails';
               searchProperty = 'PAS_SearchList';
               scope.codeProperty = 'ID';
               scope.titleProperty = 'Name';
               scope.levelProperty = 'Level';
               scope.parentProperty = 'ParentID';
               modelProperty = 'SelectedPasCodeList';
               break;
               case 'REG':
               nodeExpandingCodeProperty = 'RegionId';
               levelWiseDataProperty = 'RegionDetails';
               dataProperty = 'RegionList';
               searchProperty = 'Region_SearchList';
               scope.codeProperty = 'ID';
               scope.titleProperty = 'Name';
               scope.levelProperty = 'Level';
               scope.parentProperty = 'ParentID';
               modelProperty = 'SelectedRegionList';
               break;
               case 'ORG':
               nodeExpandingCodeProperty = 'EntityDetailCode';
               levelWiseDataProperty = 'EntityDetails';
               dataProperty = 'Org_DetailsList';
               searchProperty = 'Org_SearchList';
               scope.codeProperty = 'EntityDetailCode';
               scope.titleProperty = 'EntityDisplayName';
               scope.levelProperty = 'Level';
               scope.parentProperty = 'ParentEntityDetailCode';
               modelProperty = 'SelectedORGList';
               break;
             };
           };

           scope.selectedData = [];

           /*Local member fuctions*/

           function resetDataSourcesAndPromises(isPromiseInit) {
            levelWiseData = {};
            scope.categories = [];
            lazyLoadMarker = [];
            scope.isLoading = true;
            scope.isError = false;

            scope.selectedData = [];
            scope.getUserSelectionArray =[];

            scope.totalSelection = 0;
            totalID = [];
            totalName = [];

            if (isPromiseInit) initializePromise(true, true);
          };

          function init() {
            scope.selectionAndCountOptions = false;
            isInitialServiceCalled = true;
            resetDataSourcesAndPromises(true);
            RESTApi.getData(navContext, function(response) {
             isInitialServiceCalled = false;
             if (response.action == 'success') {
              if (isLazyLoadServerData) {
               //setLevelWiseData(response.data.data);
               setLevelWiseDataSource(response.data.data);
             } else {
               createLevelWiseDataSet(_.sortBy(response.data.data[dataProperty], 'Level'));
             }
             renderLevels();

             
						//createSelectedModelIfRecieved(response.data.data.SelectedPasCodeList);
						createSelectedModelIfRecieved(response.data.data[modelProperty]);
						dataRecievedCallPromise.resolve();

            if(scope.treeType == treeTypeObject)
            { 
            }else
              { //working perfect in porject team case
                scope.totalSelection= scope.selectedData.length;  
              }


            } else {
              if (scope.isLoading) scope.isLoading = false;
              scope.isError = true;
            }
          }, (isLazyLoadServerData) ? {
           "LevelAt" : "1",
           "PageNumber" : 1,
           "PageSize" : lazyLoadingBucket
         } : {});
          };

          scope.getSelectAllBool = function(){
           if(scope.categories && scope.categories.length > 0)
           {
            var selectedNodes = _.filter(scope.categories,function(node){
              return (node.selection == "1" || node.disabled == true)
            });
            if(scope.categories.length>0 && selectedNodes.length == scope.categories.length){
              selectAllBool = true;
            }else{
              selectAllBool = false;
            }

          }else{
            selectAllBool = false;
          }
          return selectAllBool;
        }

        function createSelectedModelIfRecieved(data) {
          if (data && data.length > 0)
           scope.selectedData = getLeafNodeWithParentHierarchy(data);
       };

       function renderLevels() {

        scope.categories = levelWiseData[levelKey + '1'].slice(0, lazyLoadingBucket);
        if (scope.categories.length % lazyLoadingBucket == 0)
         lazyLoadMarker.push(scope.categories[scope.categories.length - 1]);
       scope.isLoading = false;
     
        if(scope.categories.length > 0)
             {
              scope.selectionAndCountOptions =  true;
             }
     };


     function initializePromise(dataRievedPromiseBool, preselectionRecievedPromiseBool) {
      dataRecievedCallPromise = null;
      preselectionRecievedPromise = null;
      promises.length = 0;
      if (dataRievedPromiseBool) {
       dataRecievedCallPromise = $q.defer();
       promises.push(dataRecievedCallPromise.promise);
     }
     if (preselectionRecievedPromiseBool) {
       preselectionRecievedPromise = $q.defer();
       promises.push(preselectionRecievedPromise.promise);
     }
     $q.all(promises).then(promiseResolved);
   }



   function promiseResolved() {
    initatePreSelection();
    initializePromise(false, true);
  }

  function createLevelWiseDataSet(dataSet) {
    var level = 1;
    var parentNodes = dataSet[level - 1][levelWiseDataProperty];
    insertParentHierarchyForFlatStrucure(parentNodes);
    while (parentNodes) {
     levelWiseData[levelKey + level] = (levelWiseData[levelKey + level]) ? _.map(_.groupBy(_.union(levelWiseData[levelKey + level], parentNodes), function(doc) {
      return doc[scope.codeProperty];
    }), function(grouped) {
      return grouped[0];
    }) : parentNodes;
     if (dataSet[level]) {
      insertParentHierarchyForFlatStrucure(parentNodes, level, dataSet);
    };
    maxLevel = level;
    level = level + 1;
    parentNodes = (dataSet[level - 1]) ? dataSet[level - 1][levelWiseDataProperty] : null;
  };

};

function insertParentHierarchyForFlatStrucure(parentNodes, level, dataSet) {
  var fetchedData = (level) ? _.groupBy(dataSet[level][levelWiseDataProperty], scope.parentProperty) : null;
  _.each(parentNodes, function(parent) {
   var childForParent = (fetchedData) ? fetchedData[parent[scope.codeProperty]] : parentNodes;
   if (childForParent) {
    _.each(childForParent, function(node, index) {
     node[parentStringConstant] = parent[parentStringConstant] ? parent[parentStringConstant] + ' > ' + node[scope.titleProperty] : (node[scope.levelProperty] > 1) ? parent[scope.titleProperty] + ' > ' + node[scope.titleProperty] : "";
     node[parentCodeStringConstant] = parent[parentCodeStringConstant] ? parent[parentCodeStringConstant] + '>' + node[scope.codeProperty] : (node[scope.levelProperty] > 1) ? parent[scope.codeProperty] + '>' + node[scope.codeProperty] : "";
     node['isExpanded'] = false;
     node['selection'] = (node && node.selection && (node.selection == "1" || node.selection == "0") && !scope.isSingleSelect) ? node.selection : (node.IsSelected == false || node.IsSelected == null || node.IsSelected) ? getSelectionState(node.IsSelected) : '0',
     checkDisableForPartialNode(node);
     node['index'] = index;

     if(node.selection == "1")
     {

      var index = totalID.indexOf(node[scope.codeProperty]);
      if (index > -1) {
      }else
      {
        totalID.push(node[scope.codeProperty]);
        totalName.push(node[scope.titleProperty]);
        scope.totalSelection++;
      }
    }


  });
  }
});
};



function checkDisableForPartialNode(node){
  if(scope.treeConfig.requestParameter)
  {   
      if(!scope.treeConfig.requestParameter.getComplete && scope.treeConfig.requestParameter.contactCode && node.selection=='2'){

    node.disabled = true;

  }else
  {
    node.disabled = false;
  }
  }else
  {
    node.disabled = false;
  }
  
};

function setLevelWiseDataSource(data, parent) {
  _.each(data[dataProperty], function(n) {
    _.each(n[levelWiseDataProperty], function(d) {
      d.selection = (parent && parent.selection && (parent.selection == "1" || parent.selection == "0") && !scope.isSingleSelect) ? parent.selection : (d.IsSelected == false || d.IsSelected == null || d.IsSelected) ? getSelectionState(d.IsSelected) : '0';
      checkDisableForPartialNode(d);
      d[parentCodeStringConstant] = parent && parent[parentCodeStringConstant] ? parent[parentCodeStringConstant] + '>' + d[scope.codeProperty] : (d[scope.levelProperty] > 1) ? parent[scope.codeProperty] + '>' + d[scope.codeProperty] : "";
      d[parentStringConstant] = parent && parent[parentStringConstant] ? parent[parentStringConstant] + ' > ' + d[scope.titleProperty] : (d[scope.levelProperty] > 1) ? parent[scope.titleProperty] + ' > ' + d[scope.titleProperty] : "";
      if (baseLevelExpectNode[d[scope.codeProperty]]) {
        d.selection = getStateForNode(d);
        scope.expandNode(d);
        delete baseLevelExpectNode[d[scope.codeProperty]];
      }
    });
    levelWiseData[levelKey + n.Level] = _.isArray(levelWiseData[levelKey + n.Level]) ? levelWiseData[levelKey + n.Level].concat(n[levelWiseDataProperty]) : n[levelWiseDataProperty];
  });
};
function setLevelWiseData(data, parent) {
  _.each(data[dataProperty], function(n) {
   _.each(n[levelWiseDataProperty], function(d) {
    if(scope.treeType == treeTypeObject)
    {

      d.selection = (parent && parent.selection && (parent.selection == "1" || parent.selection == "0") && !scope.isSingleSelect) ? parent.selection : (d.IsSelected == false || d.IsSelected == null || d.IsSelected) ? getSelectionState(d.IsSelected) : '0';

    }
    else

    {
      d.selection = '0';  
    }
    if(scope.treeType == treeTypeObject)
    {
      if(isLazyLoadServerData)
      {
        totalID.push(d[scope.codeProperty]);
        totalName.push(d[scope.titleProperty]);
        scope.totalSelection++;
      }
    }

    d[parentCodeStringConstant] = parent && parent[parentCodeStringConstant] ? parent[parentCodeStringConstant] + '>' + d[scope.codeProperty] : (d[scope.levelProperty] > 1) ? parent[scope.codeProperty] + '>' + d[scope.codeProperty] : "";
    d[parentStringConstant] = parent && parent[parentStringConstant] ? parent[parentStringConstant] + ' > ' + d[scope.titleProperty] : (d[scope.levelProperty] > 1) ? parent[scope.titleProperty] + ' > ' + d[scope.titleProperty] : "";
    if (baseLevelExpectNode[d[scope.codeProperty]]) {
     d.selection = getStateForNode(d);
     scope.expandNode(d);
     delete baseLevelExpectNode[d[scope.codeProperty]];
   }
 });
   levelWiseData[levelKey + n.Level] = _.isArray(levelWiseData[levelKey + n.Level]) ? levelWiseData[levelKey + n.Level].concat(n[levelWiseDataProperty]) : n[levelWiseDataProperty];
 });
};

			/*function createLevelWiseDataSet(dataSet) {
				var level = 1;
				var parentNodes = dataSet[level - 1][levelWiseDataProperty];
				insertParentHierarchyForFlatStrucure(parentNodes);
				while (parentNodes) {
					levelWiseData[levelKey + level] = parentNodes;
					if (dataSet[level]) {
						insertParentHierarchyForFlatStrucure(parentNodes, level, dataSet);
					};
					maxLevel = level;
					level = level + 1;
					parentNodes = (dataSet[level - 1]) ? dataSet[level - 1][levelWiseDataProperty] : null;
				};
			};

			function insertParentHierarchyForFlatStrucure(parentNodes, level, dataSet) {
				var fetchedData = (level) ? _.groupBy(dataSet[level][levelWiseDataProperty], scope.parentProperty) : null;
				_.each(parentNodes, function(parent) {
					var childForParent = (fetchedData) ? fetchedData[parent[scope.codeProperty]] : parentNodes;
					if (childForParent) {
						_.each(childForParent, function(node, index) {
							node[parentStringConstant] = parent[parentStringConstant] ? parent[parentStringConstant] + ' > ' + node[scope.titleProperty] : (node[scope.levelProperty] > 1) ? parent[scope.titleProperty] + ' > ' + node[scope.titleProperty] : "";
							node[parentCodeStringConstant] = parent[parentCodeStringConstant] ? parent[parentCodeStringConstant] + '>' + node[scope.codeProperty] : (node[scope.levelProperty] > 1) ? parent[scope.codeProperty] + '>' + node[scope.codeProperty] : "";
							node['isExpanded'] = false;
							node['selection'] = node['selection'] ? node['selection'] : "0";
							node['index'] = index;
						});
					}
				});
			};

			function setLevelWiseData(data, parent) {
				_.each(data[dataProperty], function(n) {
					_.each(n[levelWiseDataProperty], function(d) {
						d.selection = (parent && parent.selection && (parent.selection == "1" || parent.selection == "0") && !scope.isSingleSelect) ? parent.selection : (d.IsSelected == false || d.IsSelected == null || d.IsSelected) ? getSelectionState(d.IsSelected) : '0';
						d[parentCodeStringConstant] = parent && parent[parentCodeStringConstant] ? parent[parentCodeStringConstant] + '>' + d[scope.codeProperty] : (d[scope.levelProperty] > 1) ? parent[scope.codeProperty] + '>' + d[scope.codeProperty] : "";
						d[parentStringConstant] = parent && parent[parentStringConstant] ? parent[parentStringConstant] + ' > ' + d[scope.titleProperty] : (d[scope.levelProperty] > 1) ? parent[scope.titleProperty] + ' > ' + d[scope.titleProperty] : "";

						if (baseLevelExpectNode[d[scope.codeProperty]]) {
							d.selection = getStateForNode(d);
							scope.expandNode(d);
							delete baseLevelExpectNode[d[scope.codeProperty]];
						}
					});
					levelWiseData[levelKey + n.Level] = _.isArray(levelWiseData[levelKey + n.Level]) ? levelWiseData[levelKey + n.Level].concat(n[levelWiseDataProperty]) : n[levelWiseDataProperty];
				});
			};*/

			function getSelectionState(val) {
				if (val) {
					return '1';
				} else if (val == false) {
					return '2';
				} else if (val == null) {
					return '0';
				}
			};

			function resetSelectionState() {
				_.each(scope.selectedData, function(_node) {
					scope.selectNode(_node, '0');
				});
			};

			function initatePreSelection() {
				resetSelectionState();
				_.each(preselection, function(preselectionNode) {
					var searchLevel = 1;
					while (searchLevel <= maxLevel) {
						var foundNode = _.groupBy(levelWiseData[levelKey + searchLevel],scope.codeProperty)[preselectionNode];
						if (foundNode) {
							scope.selectNode(foundNode[0], '1');
							break;
						}
						searchLevel = searchLevel + 1;
					}
				});
			};

			function getNodesFromServer(parent, level, bucket, pageIndex, callback) {
				scope.isLoading = true;
				if (scope.isError) scope.isError = false;
				if (parent)
					parent.childLoading = true;

				var reqPayLoad = {
					"LevelAt" : level,
					"PageNumber" : (!parent) ? pageIndex : null,
					"PageSize" : (!parent) ? bucket : null
				};
				reqPayLoad[nodeExpandingCodeProperty] = (parent) ? parent[scope.codeProperty] : null;
				//RESTApi.getData(scope.treeConfig.navigationContext, function (responseData) {
					//RESTApi.getData(scope.treeConfig.requestParameter.navigationContext, function (responseData) {
						RESTApi.getData(navContext, function (responseData) {
							if (responseData.action == 'success') {
								scope.isLoading = false;
							} else {
								scope.isError = true;
							}
							var level = (responseData.data.data[dataProperty] && responseData.data.data[dataProperty].length > 0) ? responseData.data.data[dataProperty][0].Level : null;
							maxLevel = (level && maxLevel < level) ? level : maxLevel;
							callback(parent, responseData, true, bucket, pageIndex);
						}, reqPayLoad);
					};


					function getRequestedDataFromCache(parent, bucket, pageIndex) {
						var childSearchLevel = (parent) ? parent[scope.levelProperty] + 1 : 1;
						var parentCodeStringIterator;
						var result = (parent) ? _.groupBy(levelWiseData[levelKey+childSearchLevel],scope.parentProperty)[parent[scope.codeProperty]] : levelWiseData[levelKey + childSearchLevel];
						var startIndex = (pageIndex - 1) * bucket;
						var bucketData = (bucket && result) ? result.slice(startIndex, startIndex + bucket) : (result) ? result : [];
						return {
							"data" : bucketData,
							"searchLevel" : childSearchLevel
						};
					};

					function getChildsForParentAsPerBucket(parent, bucket, pageIndex, callback) {
						var cachedDataSet = getRequestedDataFromCache(parent, bucket, pageIndex);
						var bucketData = cachedDataSet.data;
						var searchLevel = cachedDataSet.searchLevel;

						if (bucketData.length > 0) {
							callback(parent, bucketData, false, bucket, pageIndex);
						} else {
							getNodesFromServer(parent, searchLevel, bucket, pageIndex, callback);
						}
					};

					function lazyLoadLevelWiseData(markerNode) {
						var parentSearchLevel = markerNode[scope.levelProperty] - 1;
						var markerNodeParent = markerNode[scope.parentProperty];
						var parent = _.find(levelWiseData[levelKey + parentSearchLevel], function(node) {
							return node[scope.codeProperty] == markerNodeParent;
						});

						if (parent && parent.children && parent.children.length % lazyLoadingBucket != 0) {
							return;
						};

						getChildsForParentAsPerBucket(parent, lazyLoadingBucket, (parent) ? (parent.children.length / lazyLoadingBucket) + 1 : (scope.categories.length / lazyLoadingBucket) + 1, createTreeStructure);
					};

					var searchString = "";
					var searchLevel;
					var searchDataYetToBeDisplayed = [];
					var searchWithContainsHitResult = [];
					scope.searchResults = [];

					function searchAsPerBucketSize(searchStr, bucket,isMaintainSearchPointer) {
            if (!isMaintainSearchPointer) {
              if (searchString != searchStr) {
               searchString = searchStr;
               searchLevel = maxLevel;
               searchDataYetToBeDisplayed.length = 0;
               searchWithContainsHitResult.length = 0;
               scope.searchResults.length = 0;
             };
           }
           var searchData = getDataAsPerBucketSize(searchStr, bucket);
           $timeout(function () {
             scope.searchResults = scope.searchResults.concat(searchData);
           });
         };

         function getOffsetSearchData(bucket) {
          var partitionedData = _.partition(searchDataYetToBeDisplayed, function(data, index) {
           return index > (bucket - 1);
         });
          searchDataYetToBeDisplayed = partitionedData[0];
          return partitionedData[1];
        };

        function getOffsetSearchDataForContainsSearch(bucket) {
          var partitionedData = _.partition(searchWithContainsHitResult, function(data, index) {
           return index > (bucket - 1);
         });
          searchWithContainsHitResult = partitionedData[0];
          return partitionedData[1];
        };

        function getDataAsPerBucketSize(searchStr, bucket) {
          var bucketData = [];
          while (bucketData.length < bucket && searchLevel > 0) {
           var offsetSearchData = getOffsetSearchData(bucket);
           if (offsetSearchData.length == bucket) {
            bucketData = offsetSearchData;
            break;
          }
          var searchData = _.filter(levelWiseData[levelKey + searchLevel], function(node) {
            return -1 != node[scope.titleProperty].toLowerCase().indexOf(searchString.toLowerCase());
          });

          var containsSarchResult = _.filter(levelWiseData[levelKey + searchLevel], function(node) {
            return new RegExp("(" + _.compact(searchString.split(' ')).join('|') + ")", "gi").test(node[scope.titleProperty]) && -1 == node[scope.titleProperty].toLowerCase().indexOf(searchString.toLowerCase());
          });
          searchWithContainsHitResult = searchWithContainsHitResult.concat(containsSarchResult);
          var qumulativeData = offsetSearchData.concat(searchData);
          var partitionedData = _.partition(qumulativeData, function(data, index) {
            return index > (bucket - 1);
          });
          searchDataYetToBeDisplayed = searchDataYetToBeDisplayed.concat(partitionedData[0]);
          bucketData = bucketData.concat(partitionedData[1]);
          searchLevel = searchLevel - 1;
        }
        if (searchLevel == 0) {
         while (bucketData.length < bucket) {
          var containsSearchDataToBeAppended = getOffsetSearchDataForContainsSearch(bucket);
          if (containsSearchDataToBeAppended.length > 0) {
           bucketData = bucketData.concat(containsSearchDataToBeAppended);
         } else {
           break;
         }
       }
     }
     return bucketData;
   };

   function closeChildsForParent(parent) {
    getChildsForParentAsPerBucket(parent, null, null, function(parent, data) {
     var childs = _.filter(data, function(childNode) {
      return childNode.isExpanded;
    });
     _.each(childs, function(child) {
      child.isExpanded = false;
      child.children = [];
      closeChildsForParent(child);
    });
   });

  };

  scope.searchText = '';
  scope.searchFieldVal = '';

  scope.expandNode = function(node, index) {
    node.isExpanded = !node.isExpanded;
    if (node.isExpanded) {
     getChildsForParentAsPerBucket(node, lazyLoadingBucket, 1, createTreeStructure);
   } else {
     node.children = [];
     removeMarkerForParent(node);
   }
 };

 var createTreeStructure = function(node, data, isService, bucket, pageIndex) {
  if (isService) {
   if (node) {
    node.childLoading = false;
    node.lazyLoading = false;
  }
  if (data.action == 'success') {
    setLevelWiseData(data.data.data, node);
    if (node && data.data.data[dataProperty][0]) {
     if (!node.children) {
      node.children = getRequestedDataFromCache(node, bucket, pageIndex).data;
    } else {
      node.children = node.children.concat(getRequestedDataFromCache(node, bucket, pageIndex).data);
    }
    if (node.children.length % lazyLoadingBucket == 0) {
      lazyLoadMarker.push(node.children[node.children.length - 1]);
    }
  } else {
   scope.categories[scope.categories.length - 1].lazyLoading = false;
   scope.categories = scope.categories.concat(data.data.data[dataProperty][0][levelWiseDataProperty]);
   if (scope.categories.length % lazyLoadingBucket == 0) {
    lazyLoadMarker.push(scope.categories[scope.categories.length - 1]);
  }
}
} else {
  console.log('service failure');
}
} else {
 $timeout(function() {
  if (node) {
   if (node && node.children && node.children.length > 0)
    node.children[node.children.length - 1].lazyLoading = false;
							//node.children = (node.children) ? node.children.concat(data) : data;
							node.children = (node.children) ? ((scope.treeConfig.getAllLazyLoadedData) ? data : node.children.concat(data)) : data;

							if (node.children.length % lazyLoadingBucket == 0) {
								lazyLoadMarker.push(node.children[node.children.length - 1]);
							}
						} else {
							scope.categories[scope.categories.length - 1].lazyLoading = false;
							scope.categories = scope.categories.concat(data);
							if (scope.categories.length % lazyLoadingBucket == 0) {
								lazyLoadMarker.push(scope.categories[scope.categories.length - 1]);
							}
						}
					});
}
};

function removeMarkerForParent(parent) {
  var childMarkers = _.filter(lazyLoadMarker, function(node, index) {
   return -1 != node[parentCodeStringConstant].indexOf(parent[scope.codeProperty]);
 });
  lazyLoadMarker = _.difference(lazyLoadMarker, childMarkers);
  closeChildsForParent(parent);
};

var filterTextTimeout;
scope.searchAndSelectNode = function() {
  if (filterTextTimeout) {
   $timeout.cancel(filterTextTimeout);
 }
 if (scope.searchFieldVal.length <= 2) {
   serverSearchVal = "";
   scope.searchResults.length = 0;
   searchDataYetToBeDisplayed.length = 0;
   searchWithContainsHitResult.length = 0;
 } else {
   filterTextTimeout = $timeout(function() {
    if (!isLazyLoadServerData) {
     searchAsPerBucketSize(scope.searchFieldVal, searchBucket);
   } else {
     getSearchDataFromServer(searchBucket, createModelForSearchData, scope.searchFieldVal);
   }
 }, 500);
 }
};


scope.selectAll = function()
{



  if(selectAllBool)
  {
    for (var key in levelWiseData) {
      _.each(levelWiseData[key], function (data,n) {
        if(data.disabled == false)
        {
          data.selection = "0";
        }
        scope.selectedData = (key == (levelKey + '1'))  ? [] : [];  
      });
    }
    scope.getUserSelectionArray = [];
    scope.totalSelection = 0;
    totalID = [];
    totalName  = [];

  }else
  {
    for (var key in levelWiseData) {            
      _.each(levelWiseData[key], function (data,n) {
        if(data.disabled != true)
        {
          data.selection = "1";
        }
        scope.selectedData = (key == (levelKey + '1')) ? levelWiseData[levelKey + '1'] : scope.selectedData;
        var index = totalID.indexOf(data[scope.codeProperty]);
        if (index > -1) {
        }else
        {
          totalID.push(data[scope.codeProperty]);
          totalName.push(data[scope.titleProperty]);
          scope.totalSelection++;
        } 
      });
    }
  }
} 
scope.clearAllSelection = function()
{
  for (var key in levelWiseData) {
    _.each(levelWiseData[key], function (data,n) {
      data.selection = "0";
                //scope.selectedData = (key == (levelKey + '1'))  ? [] : [];
                //scope.getUserSelectionArray = [];
              });
  }
  scope.selectedData = [];
  scope.getUserSelectionArray = [];
  scope.totalSelection = 0;
  totalID = [];
  totalName  =[];
}

scope.selectNode = function(node, selectionState, byPassIsLazyLoadCheck) {
 if (isLazyLoadServerData && scope.searchFieldVal.length > 0 && !byPassIsLazyLoadCheck) {
  completeModelFromServerIfNeeded(node);
  return;
}
node.selection = selectionState;
if (scope.isSingleSelect) {
 if (scope.selectedData.length > 0 && scope.selectedData[0].$$hashKey != node.$$hashKey) {
  scope.selectedData[0].selection = '0';
};
scope.selectedData = [node];
} else {
  updateSelectionObject(node, selectionState);
  updateChildsForNode(node, selectionState);
}
updateParentForNode(node, selectionState);
updateUserSelection(node,selectionState);
if(scope.treeType == treeTypeObject)
{ 
} else
{
            //working perfect in project team
            scope.totalSelection= scope.selectedData.length;
          }
        };

        function updateSelectionObject(node, selectionState) {
          switch(selectionState) {
           case '0':
         //scope.selectedData = _.without(scope.selectedData, node);
         scope.selectedData = _.filter(scope.selectedData,function(data)
         {
          return data[scope.codeProperty] != node[scope.codeProperty];
        });
         scope.totalSelection =  scope.totalSelection -1;
         var index = totalID.indexOf(node[scope.codeProperty]);
         if(index > -1)
         {
          totalID.splice(index,1);
          totalName.splice(index,1);  
        }
        break;
        case '1':
        scope.selectedData.push(node);
        scope.totalSelection =  scope.totalSelection +1;
        totalID.push(node[scope.codeProperty]);
        totalName.push(node[scope.titleProperty]);
        break;
      }
    };
    function updateUserSelection(node,selectionState)
    {
      switch(selectionState) {
        case '0':
            scope.getUserSelectionArray = _.filter(scope.getUserSelectionArray,function(data){return data[scope.codeProperty] != node[scope.codeProperty]});//_.without(scope.getUserSelectionArray, node);
            break;
            case '1':
            scope.getUserSelectionArray.push(node);
            break;
          }
        }

     /*function updateParentForNode(node, selectionState) {
      var depthLevel = node[scope.levelProperty] - 1;
      var immediateParentCode = node[scope.parentProperty].toString();
      while (depthLevel > 0) {
       var parent = _.find(levelWiseData[levelKey + depthLevel], function(node) {
        return node[scope.codeProperty] == immediateParentCode;
      });
       if (!parent && depthLevel == 1) {
        baseLevelExpectNode[node[parentCodeStringConstant].split('>')[0]] = true;
        parent = {};
        parent[scope.codeProperty] = node[parentCodeStringConstant].split('>')[0];
        parent[scope.levelProperty] = 1;
        parent[scope.parentProperty] = parent[scope.codeProperty];
      }
      if (parent) {
        immediateParentCode = parent[scope.parentProperty].toString();
        if (!parent['isExpanded']) {
         scope.expandNode(parent);
       }
       if (!scope.isSingleSelect) {
         parent.selection = getStateForNode(parent);
       }
     }
     depthLevel = depthLevel - 1;
   }
 };*/

 function updateParentForNode(node, selectionState) {

  var depthLevel = node[scope.levelProperty] - 1;
  var immediateParentCode = node[scope.parentProperty].toString();

  while (depthLevel > 0) {
    var parent = _.find(levelWiseData[levelKey + depthLevel], function(node) {
      return node[scope.codeProperty] == immediateParentCode;
    });
    if (!parent && depthLevel == 1) {
      baseLevelExpectNode[node[parentCodeStringConstant].split('>')[0]] = true;
      parent = {};
      parent[scope.codeProperty] = node[parentCodeStringConstant].split('>')[0];
      parent[scope.levelProperty] = 1;
      parent[scope.parentProperty] = parent[scope.codeProperty];
    }
//if (parent && !parent.disabled) {
  if (parent && !parent.disabled) {
    immediateParentCode = parent[scope.parentProperty].toString();
    if (!parent['isExpanded']) {
      scope.expandNode(parent);
    }
    if (!scope.isSingleSelect) {
      parent.selection = getStateForNode(parent,parent.selection);
    }
  }else
  {
    immediateParentCode = parent[scope.parentProperty].toString();
    if (!parent['isExpanded']) {
      scope.expandNode(parent);
    }
    if (!scope.isSingleSelect) {
      var tempSelection  = getStateForNode(parent,parent.selection);
      parent.selection = "2";
    }
  }
  depthLevel = depthLevel - 1;
}
};

function getStateForNode(node,parentSelection ) {

  var depthLevel = node[scope.levelProperty] + 1;
  var parentCode = node[scope.codeProperty];
  var groupByData = _.groupBy(levelWiseData[levelKey + depthLevel], scope.parentProperty);
  var childCount = groupByData[parentCode].length;
  var selectedChild = _.filter(groupByData[parentCode], function(node) {
   return node.selection == '1';
 });
  var partiallySelectedChild = _.filter(groupByData[parentCode], function(node) {
   return node.selection == '2';
 });


/*
  if (childCount == selectedChild.length) {
    //scope.selectedData = _.difference(scope.selectedData, selectedChild);
    //JJ Add Later
    scope.selectedData = _.filter(scope.selectedData,function(data,n)
    {
      return data[scope.parentProperty] !=parentCode;
    });

    scope.selectedData.push(node);
    return "1";
  } else if ((selectedChild.length + partiallySelectedChild.length) > 0) {
   scope.selectedData = _.union(scope.selectedData, selectedChild);

   scope.selectedData = _.uniq(scope.selectedData,function(item,jey,a) {
    return item[scope.codeProperty]; 
  });
   //scope.selectedData = _.without(scope.selectedData, node);
   scope.selectedData = _.filter(scope.selectedData,function(data,n)
   {
    return data[scope.codeProperty] != node[scope.codeProperty];
  });

   return "2";
 } else {
   scope.selectedData = _.union(scope.selectedData, selectedChild);
   scope.selectedData = _.filter(scope.selectedData, function(data)
   {
    return data[scope.codeProperty] != node[scope.codeProperty];
  });
   //scope.selectedData = _.without(scope.selectedData, node);
   return "0";
 }
 */

 if(scope.treeType == treeTypeObject)
 {
  if (childCount == selectedChild.length) {

              ///scope.selectedData = _.difference(scope.selectedData, selectedChild);
              
              scope.selectedData = _.filter(scope.selectedData, function(data) { 
                return data[scope.parentProperty] != parentCode;
              });

              scope.selectedData.push(node);
              //Manage Total Selection and TotalName nd ID  
              scope.totalSelection = scope.totalSelection +1;
              var index = totalID.indexOf(node[scope.codeProperty]);
              if (index > -1) {
              }else
              {
                totalID.push(node[scope.codeProperty]);
                totalName.push(node[scope.titleProperty]);
              }//Ends

              return "1";

            } else if ((selectedChild.length + partiallySelectedChild.length) > 0) {

              scope.selectedData = _.union(scope.selectedData, selectedChild);
              
              scope.selectedData = _.uniq(scope.selectedData, function(item, key, a) { 
                return item[scope.codeProperty];
              });

              scope.selectedData = _.filter(scope.selectedData,function(data){
              return data[scope.codeProperty] != node[scope.codeProperty]}); //_.without(scope.selectedData, node);
              


              //Manage Total Selection and TotalName nd ID
              if(parentSelection != "0" && parentSelection != "2")
              {
                scope.totalSelection = scope.totalSelection -1;
              }
              var index = totalID.indexOf(node[scope.codeProperty]);
              if(index > -1)
              {
                totalID.splice(index,1);
                totalName.splice(index,1);
              }
              //Ends

              
              return "2";
            } else {

              scope.selectedData = _.union(scope.selectedData, selectedChild);
              
              scope.selectedData = _.filter(scope.selectedData,function(data){
                return data[scope.codeProperty] != node[scope.codeProperty]
              });

              //_.without(scope.selectedData, node);
              
              //Manage Total Selection and TotalName nd ID
              var index = totalID.indexOf(node[scope.codeProperty]);
              if(index > -1)
              {
                totalID.splice(index,1);
                totalName.splice(index,1);  
                scope.totalSelection = scope.totalSelection -1;
              }//Ends
              return "0";
            }
          } else {

            //Non Generic Tree management
            //it will not having parent selection full means 1 even if all childs are selected.
            if (childCount == selectedChild.length) {
            //scope.selectedData = selectedChild;
            scope.selectedData = _.union(scope.selectedData, selectedChild);
            return "2";

          }else if ((selectedChild.length + partiallySelectedChild.length) > 0) {

            scope.selectedData = _.union(scope.selectedData, selectedChild);
            
            scope.selectedData = _.uniq(scope.selectedData, function(item, key, a) { 
              return item[scope.codeProperty];
            });

            scope.selectedData = _.filter(scope.selectedData,function(data){return data[scope.codeProperty] != node[scope.codeProperty]});
            //_.without(scope.selectedData, node);
            return "2";
          }else
          {
            scope.selectedData = _.union(scope.selectedData, selectedChild);
            scope.selectedData = _.filter(scope.selectedData,function(data){return data[scope.codeProperty] != node[scope.codeProperty]});//_.without(scope.selectedData, node);
            return "0";
          }
        }


      };



/*
function updateChildsForNode(node, selectionState) {
  var depthLevel = node[scope.levelProperty] + 1;
  var parentCode = node[scope.codeProperty].toString();
  while (depthLevel <= maxLevel) {
   var childs = _.filter(levelWiseData[levelKey + depthLevel], function(node) {
    return -1 != node[parentCodeStringConstant].indexOf(parentCode);
  });
   _.each(childs, function(child) {
    child.selection = selectionState;
    if (selectionState == "1") {
     //scope.selectedData = _.without(scope.selectedData, child);
     scope.selectedData =_.filter(scope.selectedData,function(data)
     {
      return data[scope.codeProperty] != child[scope.codeProperty];
    });
   };
 });
   depthLevel = depthLevel + 1;
 }
 if (isLazyLoadServerData) {
   updateChildsForSelectedData(node);
 }
}*/

function updateChildsForNode(node, selectionState) {

  var depthLevel = node[scope.levelProperty] + 1;
  var parentCode = node[scope.codeProperty].toString();
  var tempNode = node;
  while (depthLevel <= maxLevel) {
    var childs = _.filter(levelWiseData[levelKey + depthLevel], function(node) {
            //return -1 != node[parentCodeString].indexOf(parentCode)
            var parentCodesofNode = node[parentCodeStringConstant].split(">");
            return -1 != parentCodesofNode.indexOf(parentCode);
          });


    _.each(childs, function(child) {
      if(scope.treeType == treeTypeObject)
      {
        if (selectionState == "1") {
              //Work in laziloading false
              scope.totalSelection = (child.selection == "1")? scope.totalSelection : scope.totalSelection + 1;
              scope.selectedData = _.filter(scope.selectedData,function(data){
                return data[scope.codeProperty] != child[scope.codeProperty]
              });
              //closed//_.without(scope.selectedData, child);
              var index = totalID.indexOf(child[scope.codeProperty]);
              if (index > -1) {
              }else
              {
                totalID.push(child[scope.codeProperty]);
                totalName.push(child[scope.titleProperty]);   
              } 
            }else
            {
              scope.totalSelection = scope.totalSelection -1;
              var index = totalID.indexOf(child[scope.codeProperty]);
              if(index > -1)
              {
                totalID.splice(index,1);
                totalName.splice(index,1);  
              }
            }
            child.selection = selectionState;

            scope.getUserSelectionArray = _.filter(scope.getUserSelectionArray,function(data){
              return data[scope.codeProperty] != child[scope.codeProperty]
              });//_.without(scope.selectedData, child);
              //jayesh add
            }else
            {
              child.selection = "0";
              scope.selectedData = _.filter(scope.selectedData,function(data){
              return data[scope.codeProperty] != child[scope.codeProperty]});//_.without(scope.selectedData, child);
            }
            /*scope.getUserSelectionArray = _.filter(scope.getUserSelectionArray,function(data){
            
              return data[scope.codeProperty] != child[scope.codeProperty]
            });//_.without(scope.selectedData, child);*/
          });

    depthLevel = depthLevel + 1;
  }
          //if (isLazyLoadServerData) {
            updateChildsForSelectedData(node);
          //}
        }



        function updateChildsForSelectedData(node) {
          var searchHits = [];
          _.each(scope.selectedData, function(data) {
           if (-1 != data[parentCodeStringConstant].indexOf(node[scope.codeProperty].toString())) {
            searchHits.push(data);
          }
        });
          _.each(searchHits, function(hits) {

   //scope.selectedData = _.without(scope.selectedData, hits);
   scope.selectedData = _.filter(scope.selectedData,function(data)
   {
    return data[scope.codeProperty] != hits[scope.codeProperty];
  });


 });
        }

        var uniqueIDGenerator = function() {
          var d = new Date().getTime();
          var uniqueID = 'xxx2xxxpxxxoxxx'.replace(/[xy]/g, function(c) {
           var r = (d + Math.random() * 16) % 16 | 0;
           d = Math.floor(d / 16);
           return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
         });
          return uniqueID;
        };

        scope.scroll = function () {
          if (!lazyLoadOffset) {
           lazyLoadOffset = angular.element("#treeComponentContainer")[0].getBoundingClientRect().bottom;
         };
         if (lazyLoadMarker.length > 0 && scope.searchFieldVal.length == 0) {
           var markerNode = lazyLoadMarker[lazyLoadMarker.length - 1];
           if (angular.element("#" + markerNode[scope.codeProperty])[0].getBoundingClientRect().top <= lazyLoadOffset) {
            console.log(markerNode);
            markerNode.lazyLoading = true;
            lazyLoadMarker.length = (lazyLoadMarker.length > 0) ? lazyLoadMarker.length - 1 : 0;
            lazyLoadLevelWiseData(markerNode);
            console.log(lazyLoadMarker.length);
          }
        }
      };

      scope.scrollEnd = function () {
        if (scope.searchFieldVal.length > 2)
         if (!isLazyLoadServerData) {
          searchAsPerBucketSize(scope.searchFieldVal, searchBucket,true);
        } else {
          getSearchDataFromServer(searchBucket, createModelForSearchData, scope.searchFieldVal, true);
        }
      };

			/*lazyLoadOffset = angular.element("#treeComponentContainer")[0].getBoundingClientRect().bottom;
			console.log(lazyLoadOffset);
			angular.element('.scrollbar-outer').scrollbar({
				onScroll : function(y, x) {
					//console.log('marker length -- '+lazyLoadMarker.length);
					if (lazyLoadMarker.length > 0 && scope.searchFieldVal.length == 0) {
						var markerNode = lazyLoadMarker[lazyLoadMarker.length - 1];
						if (angular.element("#"+markerNode[scope.codeProperty])[0].getBoundingClientRect().top <= lazyLoadOffset) {
							console.log(markerNode);
							markerNode.lazyLoading = true;
							lazyLoadMarker.length = (lazyLoadMarker.length > 0) ? lazyLoadMarker.length - 1 : 0;
							lazyLoadLevelWiseData(markerNode);
							console.log(lazyLoadMarker.length);
						}
					}
					if (y.maxScroll > 0 && y.scroll == y.maxScroll && scope.searchFieldVal.length > 0) {
						if (!isLazyLoadServerData) {
							searchAsPerBucketSize(scope.searchFieldVal, searchBucket);
						} else {
							getSearchDataFromServer(searchBucket, createModelForSearchData, scope.searchFieldVal, true);
						}
					}
				}
			});*/

			var massageSelectedData = function(data) {
				_.each(data, function(e) {
					if (e['children'])
						delete e['children'];
				});
				return data;
			};


      var newtotalID = [];
      var newtotalName = [];


      var getSelections = function() {

        _.each(scope.selectedData,function(node)
        {
          if(node.disabled)
          {
            
            scope.selectedData = _.without(scope.selectedData, node);
          }
        });

        newtotalID  = [];
        newtotalName  = [];

        $timeout(function() {
          var outPutObject = {
            'selections' : massageSelectedData(scope.selectedData)
          };

          _.each(outPutObject.selections, function(data){
            newtotalID.push(data[scope.codeProperty]);
            newtotalName.push(data[scope.titleProperty]);
          });

          outPutObject["selectionIds"] = newtotalID;
          outPutObject["selectionNames"] = newtotalName;
          if(scope.treeType == treeTypeObject)
          {
          outPutObject["selectionAllIds"] = totalID;
          outPutObject["selectionAllNames"] = totalName;
        }

          var hierarchyCollection = [];
          _.each(scope.selectedData, function(node) {
            if (node[scope.levelProperty] > 1) {
              var parentHierarchy = node[parentCodeStringConstant].split('>');
              var parentTraversalArray = [];
              _.each(parentHierarchy, function(parentNode, index) {
                var found = _.clone(_.find(levelWiseData[levelKey + (index + 1)], function(data) {
                  return data[scope.codeProperty] == parentNode;
                }));
                if (found && found['children'])
                  delete found['children'];
                parentTraversalArray.push(found);
              });
              hierarchyCollection.push(parentTraversalArray);
            } else {
              hierarchyCollection.push([node]);
            }
          });

        /*if(scope.treeConfig.getHierarchyOnSelection)
        {
          outPutObject['selectionHierarchy'] =  massageSelectedData(hierarchyCollection);
        }
        if(scope.treeConfig.getAllLazyLoadedData)
        {
          outPutObject['allLazyLoadedData'] = levelWiseData;
        }*/


        if(scope.treeConfig.getHierarchyOnSelection && (scope.treeType == treeTypeObject))
        {
          outPutObject['selectionHierarchy'] =  massageSelectedData(hierarchyCollection);
        }
        if(scope.treeConfig.getUserSelection && (scope.treeType == treeTypeObject))
        {
          outPutObject['userSelection'] = massageSelectedData(scope.getUserSelectionArray);
        }
        if(scope.treeConfig.getAllLazyLoadedData)
        {
          outPutObject['allLazyLoadedData'] = levelWiseData;
        }

        doneCallback(outPutObject);
        
      });



      };

      /** seacrh for server **/

      var searchResultPageNumber = 0;
      var serverSearchVal = "";
      var isLazyLoadingNode;
      var ongoingService;
      function getSearchDataFromServer(searchBucket, callback, searchVal, isLazyLoad) {
        if (searchVal != serverSearchVal) {
         serverSearchVal = searchVal;
         searchResultPageNumber = 0;
         scope.searchResults.length = 0;
       }

       scope.isLoading = true;
       if (scope.isError) scope.isError = false;

       if (scope.searchResults.length > 0) {
         isLazyLoadingNode = scope.searchResults[scope.searchResults.length - 1];
         isLazyLoadingNode.lazyLoading = true;
       }

       if (ongoingService && !isLazyLoad) {
         RESTApi.abort(ongoingService);
       }

       ongoingService = {
         "PageNumber" : searchResultPageNumber = searchResultPageNumber + 1,
         "PageSize" : searchBucket,
         "SearchText" : scope.searchFieldVal
       };

				//RESTApi.getData(scope.treeConfig.navigationContext, function(responseData) {
					//RESTApi.getData(scope.treeConfig.requestParameter.navigationContext, function(responseData) {
						RESTApi.getData(navContext, function(responseData) {
							ongoingService = null;
							if (responseData.action == 'success') {
								scope.isLoading = false;
							} else {
								scope.isError = true;
							}
							callback(responseData);
						}, ongoingService);
					}

					function createModelForSearchData(data) {
						if (isLazyLoadingNode)
							isLazyLoadingNode.lazyLoading = false;
						scope.searchResults = scope.searchResults.concat(getLeafNodeWithParentHierarchy(data.data.data[searchProperty]));
					};

					function getLeafNodeWithParentHierarchy(data) {
						var searchList = data;
						var searchDataCollection = [];
						var selectedData = _.groupBy(scope.selectedData, scope.codeProperty);
						_.each(searchList, function(searchData) {
							var searchDataHierarchy = searchData[levelWiseDataProperty];
							var sortedLevelSearchedData = _.sortBy(searchDataHierarchy, 'Level');
							var searchHitNode = sortedLevelSearchedData[sortedLevelSearchedData.length - 1];
							var parentString = "";
							var parentCodeString = "";

							_.each(sortedLevelSearchedData, function(data) {
								parentString = (parentString.length > 0) ? parentString + ' > ' + data[scope.titleProperty] : data[scope.titleProperty];
								parentCodeString = (parentCodeString.length > 0) ? parentCodeString + '>' + data[scope.codeProperty].toString() : data[scope.codeProperty].toString();
								data[parentStringConstant] = parentString;
								data[parentCodeStringConstant] = parentCodeString;
								data.selection = getSelectionFromLevelWiseData(data);
							});

						//searchHitNode.serverData = _.groupBy(sortedLevelSearchedData, scope.codeProperty);
						searchDataCollection.push(searchHitNode);
					});
						return searchDataCollection;
					};

					function resetSelectionForSearchNodes(node) {
						_.each(scope.searchResults, function(searchNode) {
							if (node[scope.codeProperty] != searchNode[scope.codeProperty] && searchNode[parentCodeStringConstant].indexOf((node[parentCodeStringConstant].length > 0) ? node[parentCodeStringConstant] : node[scope.codeProperty].toString()) != -1) {
								searchNode.selection = node.selection;
							} else {
								searchNode.selection = getSelectionFromLevelWiseData(searchNode);
							}
						});
					};

					function getSelectionFromLevelWiseData(node) {
						var searchLevel = node[scope.levelProperty];
						var groupedLevelData = _.groupBy(levelWiseData[levelKey + searchLevel], scope.codeProperty);
						var selectionState = (groupedLevelData[node[scope.codeProperty]]) ? groupedLevelData[node[scope.codeProperty]][0].selection : isPresentInInternalHierarchy(node) ? '1' : (node.IsSelected == false || node.IsSelected == null || node.IsSelected) ? getSelectionState(node.IsSelected) : '0';
						return selectionState;
					};

					function isPresentInInternalHierarchy(searchNode) {
						var retVal = false;
						for (var i = 0; i < scope.selectedData.length; i++) {
							var node = scope.selectedData[i];
							if (searchNode[parentCodeStringConstant].indexOf((node[parentCodeStringConstant].length > 0) ? node[parentCodeStringConstant] : node[scope.codeProperty].toString()) != -1) {
								retVal = true;
								break;
							}
						}
						return retVal;
					};

				/*function completeModelFromServerIfNeeded(node) {
					var parentHierarchy = node[parentCodeStringConstant].split('>');
					var dataRetrivalCount = parentHierarchy.length;
					parentHierarchy.length = dataRetrivalCount - 1;
					var recievedData = [];
					if (parentHierarchy.length > 0) {
						_.each(parentHierarchy, function(PASCode, index) {
							getChildsForParentAsPerBucket(node.serverData[PASCode][0], lazyLoadingBucket, 1, function(_node, data, isService, bucket, pageIndex) {
								if (isService) {
									if (data.action == 'success')
										setLevelWiseData(data.data.data, _node);
								};
								dataRetrivalCount = dataRetrivalCount - 1;
								if (dataRetrivalCount == 1) {
									updateSelectionInDataSource(node);
								}
							});
						});
					} else {
						updateSelectionInDataSource(node);
					}
				}*/

				function completeModelFromServerIfNeeded(node) {

					var parentHierarchy = node[parentCodeStringConstant].split('>');
					var levelNumber = node['Level'];
					var recievedData = [];

					if (!(levelWiseData[levelKey + node[scope.levelProperty]] && _.find(levelWiseData[levelKey + node[scope.levelProperty]], function(data) {
						return node[scope.codeProperty] == data[scope.codeProperty];
					}))) {
						var reqObj = {};
						reqObj[nodeExpandingCodeProperty] = [parseInt(parentHierarchy[parentHierarchy.length - 1])];

          	//RESTApi.getData(scope.treeConfig.requestParameter.navigationContext, function(responseData) {
              RESTApi.getData(navContext, function(responseData) {
               if (responseData.action == 'success') {
                var allResultData = responseData.data.data.PAS_SearchList[0][levelWiseDataProperty];
                var result = _.groupBy(allResultData, "Level");
                var level = 1;
                var levelData = [];
                while (level) {
                 var obj = {};
                 obj[levelWiseDataProperty] = result[level];
                 obj['Level'] = level;
                 levelData.push(obj);
                 level = level + 1;
                 if (!result[level])
                  break;
              };
              createLevelWiseDataSet(levelData);
              updateSelectionInDataSource(node);
            } else {
              console.log('error');
            }
          }, reqObj, true);
            } else {
              updateSelectionInDataSource(node);
            }
          }

          function updateSelectionInDataSource(node) {
           scope.selectNode(_.find(levelWiseData[levelKey + node.Level], function(data) {
            return data[scope.codeProperty] == node[scope.codeProperty];
          }), (node.selection == "1") ? "0" : "1", true);
           resetSelectionForSearchNodes(node);
         };

         scope.focusSearch = false;
         scope.isActive = false;
         scope.showMe = false;
         scope.showSearch = function () {
           scope.isActive = true;
           scope.focusSearch = true;
           scope.showMe = true;
           scope.hideClose = true;
         }

         scope.hideSearch = function () {
           scope.isActive = false;
           scope.focusSearch = false;
           scope.hideClose = false;
         }

       },
       templateUrl: 'shared/directives/smartHierarchy/smartHierarchyTemplate.html'
     };
   }])
.directive('ngIndeterminate', function ($compile) {
  return {
   restrict : 'A',
   link : function(scope, element, attributes) {
    scope.$watch(attributes['ngIndeterminate'], function(value) {
     element.prop('indeterminate', value);
   });
  }
};
})
.directive('ngHighlight', function ($compile, hilitor) {
  return {
   restrict : 'A',
   link : function(scope, element, attributes) {
    scope.$watch(attributes['ngHighlight'], function(value) {
     hilitor.getHilitor().apply(value);
   });
  }
};
})
.service('RESTApi', ['$http', '$q',
	function($http, $q) {
		var baseUrl;
		var env = "DEV";
   
		var callbackTracker = [];
		var userExecutionContext;
		var documentId;
		var contactCode;
		var requestObjectToBeExtended = null;
    

    /*if(windows.location.origin.indexOf('smartdev') > -1 || windows.location.origin.indexOf('127') > -1)
    {
      env = "DEV";
    }else if(windows.location.origin.indexOf('smartqc') > -1)
    {
      env = "QC";
    }else if(windows.location.origin.indexOf('smartuat') > -1)
    {
      env = "UAT";
    }else
    {
      env = "PROD";
    }*/

    this.setEnvironment = function(env)
    {
      switch(env) {
        case "DEV":
        baseUrl = 'https://gepdevsmart-rest.servicebus.windows.net/PortalRestService/';
        break;
        case "QC":
        baseUrl = 'https://gepqcsmart-rest.servicebus.windows.net/PortalRestService/';
        break;
        case "UAT":
        baseUrl = 'https://gepuatsmart-rest.servicebus.windows.net/PortalRestService/';
        break;
        case "PROD":
        baseUrl = 'https://gepsmart-rest.servicebus.windows.net/PortalRestService/';

      }
    }
    this.setDocumentId = function(val) {
     documentId = val;
   };
   this.setContactCode = function(val) {
     contactCode = val;
   };
   this.setUserContext = function(val) {
     userExecutionContext = val;
   };
   this.setRequestObject = function(val)
   {
     requestObjectToBeExtended =val;
   }
   function createRequest(mode, data,isOverrideInputPayload) {
     var contactPasMappingMethod,
     getPasDetailsMethod,
     inputParameterKey,
     getParentForNodeUrl;
     switch(mode) {
      case "PAS":
      contactPasMappingMethod = 'GetContactPASMappingDetails';
      getPasDetailsMethod = 'GetPASDetails';
      inputParameterKey = 'PASInputParam_Levels';
      getParentForNodeUrl  = "GetPASLevelDetailsByPASCodes";
      break;
      case "REG":
      contactPasMappingMethod = 'GetContactRegionMappingDetails ';
      getPasDetailsMethod = 'GetRegionDetails ';
      inputParameterKey = 'RegionInputParam_Levels';
      getParentForNodeUrl = "GetREGIONLevelDetailsByRegionIds";
      break;

      case "ORG":
      contactPasMappingMethod = 'GetContactOrgMappingDetails';
      getPasDetailsMethod = 'GetORGDetails ';
      inputParameterKey ='ORG_InputParams';
      getParentForNodeUrl = "GetOrgEntityLevelDetailsByEntityDetailCodes";
      break;	
    }


    var propmiseForThisInstance = $q.defer();
    var requestObject = {
      'url' : baseUrl,
      'headers' : {
       'Content-Type' : 'application/json',
       'UserExecutionContext' : null
     },
     'data' : {},
     'method' : 'POST',
     'timeout' : propmiseForThisInstance.promise
   };
   requestObject['data'][inputParameterKey] = {
    'ContactCode' : null,
    'DocumentCode' : null
  };

  if (isOverrideInputPayload == true) {
    requestObject.url = requestObject.url + getParentForNodeUrl;
    requestObject.data = data;
  }else
  {
    if (contactCode) {
     requestObject.data[inputParameterKey].ContactCode = contactCode;
     requestObject.url = requestObject.url + contactPasMappingMethod;
   } else {
     requestObject.data[inputParameterKey].ContactCode = null;
     requestObject.url = requestObject.url + getPasDetailsMethod;
   }
   requestObject.data[inputParameterKey].DocumentCode = (documentId) ? documentId : null;

 }
 requestObject.headers.UserExecutionContext = userExecutionContext;
 requestObject.promise = propmiseForThisInstance;
 if(requestObjectToBeExtended == null && contactCode == null)
 {
  requestObject.data[inputParameterKey] = _.extend(requestObject.data[inputParameterKey], data);
}else
{
  requestObject.data[inputParameterKey] = _.extend(_.extend(requestObject.data[inputParameterKey], data),requestObjectToBeExtended)
}
return requestObject;
};
this.abort = function(reqParam) {
 var dataFoundOnIndex;
 var promise = _.find(callbackTracker, function(reqObj, index) {
  dataFoundOnIndex = index;
  return _.isEqual(reqParam, reqObj.data);
}).promise;
 if (promise) {
  promise.resolve();
  console.log('canceled - ' + reqParam);
}
};

this.getData = function(mode, callback, data,isOverrideInputPayload) {
 var requestObject = new createRequest(mode, data,isOverrideInputPayload);
 callbackTracker.push({
  'key' : JSON.stringify(requestObject.data),
  'callback' : callback,
  'promise' : requestObject.promise,
  'data' : data
});
 serviceCall(requestObject);
};

function serviceCall(req) {
 $http(req).then(function(response) {
  var dataFoundOnIndex;
  var Callback = _.find(callbackTracker, function(reqObj, index) {
   dataFoundOnIndex = index;
   return _.isEqual(JSON.parse(reqObj.key), req.data);
 }).callback;
  callbackTracker.splice(dataFoundOnIndex, 1);
  Callback({
   'action' : 'success',
   'data' : response
 });
}, function(error) {
  var dataFoundOnIndex;
  var Callback = _.find(callbackTracker, function(reqObj, index) {
   dataFoundOnIndex = index;
   return _.isEqual(JSON.parse(reqObj.key), req.data);
 }).callback;
  callbackTracker.splice(dataFoundOnIndex, 1);
  Callback({
   'action' : 'failure',
   'data' : error
 });
});
};
}])
.service('hilitor', [
	function() {
		var hilitor = new Hilitor("treeComponentContainer");
		this.getHilitor = function() {
			return hilitor;
		};
	}]);

})(angular);
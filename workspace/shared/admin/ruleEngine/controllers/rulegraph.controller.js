angular.module('SMART2')
    .controller('rulegraphCtrl', ['$scope', '$rootScope', '$translate', '$timeout', '$window', rulegraphCtrlFunc]);

function rulegraphCtrlFunc($scope, $rootScope, $translate, $timeout, $window) {
    $scope.focusSearchC = false;
    $scope.isActiveC = false;
    $scope.showMeC = false;
    $scope.showSearchC = function () {
        $scope.isActiveC = true;
        $scope.focusSearchC = true;
        $scope.showMeC = true;
        $scope.hideCloseC = true;
    };
    $scope.hideSearchC = function () {
        $scope.isActiveC = false;
        $scope.focusSearchC = false;
        $scope.hideCloseC = false;
    };
    $scope.isMaximized = false;
    //$scope.canvasLayout();

    $(window).resize(function () {
        $scope.canvasLayout();
    });

    $scope.canvasLayout = function () {
        var diagramHeight = $(window).outerHeight() - ($('header').outerHeight() + $('.extra-nav-wrap').outerHeight()),
            diagramWidth = $('.cardParent').outerWidth() - (250 + 70);
        $('.rulegraph-wrap').css({ 'position': 'relative', 'top': 0, 'left': 0, 'zIndex': 9 });
        $('.rulegraph-wrap, .sidebar, canvas, #myDiagramDiv').css({ 'height': diagramHeight + 'px', 'max-height': diagramHeight + 'px' });
        $('canvas, #myDiagramDiv').css({ 'width': diagramWidth + 'px', 'max-width': diagramWidth + 'px' });
        $('.rulegraph-wrap .accordion ul').css('max-height', (diagramHeight / 2) - 100 + 'px');
        $(function () {
            $("#resizable").resizable();
        });
    }

    $scope.canvasFullScreenLayout = function () {
        $scope.isMaximized = !$scope.isMaximized;
        if (!$scope.isMaximized) { $scope.canvasLayout(); return}
        var diagramHeight = $(window).outerHeight() - ($('header').outerHeight() + $('.extra-nav-wrap').outerHeight()),
            diagramWidth = $(window).outerWidth() - (250 + 70 + 32);
        $('.rulegraph-wrap').css({ 'position': 'fixed', 'top': ($('header').outerHeight() + $('.extra-nav-wrap').outerHeight()) + 'px', 'left': 0, 'zIndex': 9 });
        $('.rulegraph-wrap, .sidebar, canvas, #myDiagramDiv').css({ 'height': diagramHeight + 'px', 'max-height': diagramHeight + 'px' });
        $('canvas, #myDiagramDiv').css({ 'width': diagramWidth + 'px', 'max-width': diagramWidth + 'px' });
    }
    $('#fullScreen').on('click', function (e) {
        if ($scope.isMaximized == true) {

        }
        $scope.canvasFullScreenLayout();
    });
    var headers = ["H1", "H2", "H3", "H4", "H5", "H6"];
    $(".accordion").on('click', function (e) {
        var target = e.target,
            name = target.nodeName.toUpperCase();

        if ($.inArray(name, headers) > -1) {
            var subItem = $(target);
            subItem.slideToggle("fast", function () {
                $(target).toggleClass('expand');
                $(target).find('.icon.arrow').toggleClass('collapaseRules');
            });
        }
    });
    var attributes = {
        0: {
            icon: "#icon_Costcenter",
            color: "green"
        },
        1: {

        },
        2: {},
        3: {}
    };
    $scope.attributesList = [
    {
        "bgClass": "green",
        "icon": "#icon_Costcenter",
        "attribute": "Cost Center",
        "operator": "Equals To",
        "value": "CC_India",
        "borderColor": "tomato",
        "category": "attributes",
    },
    {
        "bgClass": "blue",
        "icon": "#icon_Category",
        "attribute": "Category",
        "operator": "Not Equals To",
        "value": "Software",
        "borderColor": "aquamarine",
        "category": "attributes",
        "iconsrc": "category"
    },
    {
        "bgClass": "orange",
        "icon": "#icon_Amount",
        "attribute": "Amount",
        "operator": "Less Than",
        "value": "10,000",
        "borderColor": "yellowgreen",
        "category": "attributes"
    },
    {
        "bgClass": "green",
        "icon": "#icon_Costcenter",
        "attribute": "Sample Name",
        "operator": "",
        "value": "",
        "borderColor": "blue",
        "category": "attributes"
    }];
    $scope.actionList = [
        {
            "bgClass": "green",
            "icon": "#icon_Approved",
            "name": "Auto Approve",
            "borderColor": "#d9d9d9",
            "category": "actions"
        },
        {
            "bgClass": "blue",
            "icon": "#icon_Approved",
            "name": "Cost Center Approval",
            "borderColor": "#d9d9d9",
            "category": "actions",
            "leadApprover": "y.s@gep.com",
            "enableAutoApproval": "Y",
            "selfApproval": "Y",
            "poolType": "xyz",
            "PoolValue": "123"
        },
        {
            "bgClass": "orange",
            "icon": "#icon_Approved",
            "name": "Executive Approval",
            "borderColor": "#d9d9d9",
            "category": "actions",
            "leadApprover": "r.d@gep.com",
            "enableAutoApproval": "Y",
            "selfApproval": "Y",
            "poolType": "abc",
            "PoolValue": "156"
        },
        {
            "bgClass": "purple",
            "icon": "#icon_Approved",
            "name": "CEO Office",
            "borderColor": "#d9d9d9",
            "category": "actions",
            "leadApprover": "s.m@gep.com",
            "enableAutoApproval": "Y",
            "selfApproval": "Y",
            "poolType": "klm",
            "PoolValue": "190"
        },
        {
            "bgClass": "green",
            "icon": "#icon_Approved",
            "name": "Auto Reject",
            "borderColor": "#d9d9d9",
            "category": "actions"
        }
    ];

    var ruleNodeArray = [
        { "location": { "class": "go.Point", "x": 313.0685424949239, "y": 15.5 }, "name": "REQUISITION", "key": 1001, "category": "rootelement" },
        { "location": { "class": "go.Point", "x": 208.38060582936154, "y": 156.6580078125002 }, "key": 270, "borderColor": "aquamarine", "attribute": "Category", "operator": "Not Equals To", "value": "Software", "iconsrc": "#icon_Category", "category": "attributes", "group": -10 },
        { "location": { "class": "go.Point", "x": 417.75647916048615, "y": 159.7537778898508 }, "key": 7208, "borderColor": "blue", "attribute": "Condition", "operator": "Less Than", "value": "2141", "iconsrc": "#icon_Costcenter", "category": "attributes", "group": -10 },
        { "location": { "class": "go.Point", "x": 452.5913899932318, "y": 335.0197935148504 }, "key": 7669, "borderColor": "yellowgreen", "attribute": "Amount", "operator": "Less Than", "value": "10,000", "iconsrc": "#icon_Amount", "category": "attributes" },
        { "location": { "class": "go.Point", "x": 173.54569499661596, "y": 335.0197935148504 }, "key": 4987, "borderColor": "tomato", "attribute": "Cost Center", "operator": "Equals To", "value": "CC_India", "iconsrc": "#icon_Costcenter", "category": "attributes" },
        { "location": { "class": "go.Point", "x": 452.5913899932318, "y": 617.5666644506584 }, "key": 6787, "borderColor": "#d9d9d9", "name": "Cost Center Approval", "iconsrc": "#icon_Approved", "category": "actions" },
        { "location": { "class": "go.Point", "x": 70.52284749830784, "y": 462.5506488256584 }, "key": 2822, "borderColor": "#d9d9d9", "name": "Auto Approve", "iconsrc": "#icon_Approved", "category": "actions" },
        { "location": { "class": "go.Point", "x": 254.06854249492383, "y": 462.5506488256584 }, "key": 9312, "borderColor": "#d9d9d9", "name": "Cost Center Approval", "iconsrc": "#icon_Approved", "category": "actions" },
        { "text": "Common conditions", "isGroup": true, "color": "blue", "font": "italic 9pt sans-serif", "key": -10 },
        { "location": { "class": "go.Point", "x": 452.5913899932318, "y": 490.03580913985036 }, "key": 3529, "borderColor": "tomato", "attribute": "Cost Center", "operator": "Equals To", "value": "CC_India", "iconsrc": "#icon_Costcenter", "category": "attributes" }
    ];
    var ruleLinkArray = [
        { "from": 4987, "to": 2822 },
        { "from": 3529, "to": 6787 },
        { "from": 1001, "to": -10 },
        { "from": -10, "to": 4987 },
        { "from": -10, "to": 7669 },
        { "from": 4987, "to": 9312 },
        { "from": 7669, "to": 3529 }
    ];


    $scope.init = function () {
        if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
        var dragged = null;
        function highlight(node) {
            var oldskips = myDiagram.skipsUndoManager;
            myDiagram.skipsUndoManager = true;
            myDiagram.startTransaction("highlight");
            if (node !== null) {
                myDiagram.highlight(node);
            } else {
                myDiagram.clearHighlighteds();
            }
            myDiagram.commitTransaction("highlight");
            myDiagram.skipsUndoManager = oldskips;
        }

        document.addEventListener("dragstart", function (event) {
            if (!angular.element(event.target).hasClass("draggable")) return;
            event.dataTransfer.setData("text", "");
            dragged = event.target;
        }, false);

        document.addEventListener("dragend", function (event) {
            highlight(null);
        }, false);

        var div = document.getElementById("myDiagramDiv");
        div.addEventListener("dragenter", function (event) {
            event.preventDefault();
        }, false);
        var isPlaceholderPresent = false;
        function showPlaceholder(node) {
            if (!isPlaceholderPresent) {
                myDiagram.startTransaction('dummy node');
                myDiagram.model.addNodeData({
                    key: 1002,
                    name: 'Print',
                    category: 'placeholder'
                });
                myDiagram.commitTransaction('dummy node');
                var fromkey = (node.data.hasOwnProperty('group')) ? node.data.group : node.data.key;
                myDiagram.startTransaction('dummy nodeLink');
                myDiagram.model.addLinkData({
                    key: 1003,
                    from: fromkey,
                    to: 1002
                });
                myDiagram.commitTransaction('dummy nodeLink');
                isPlaceholderPresent = true;
            };
        };
        function removePlaceholder() {
            if (isPlaceholderPresent) {
                myDiagram.startTransaction('dummy nodeRemove');
                var nodee = myDiagram.model.findNodeDataForKey(1002);
                myDiagram.model.removeNodeData(nodee);
                myDiagram.commitTransaction('dummy nodeRemove');

                myDiagram.startTransaction('remove nodeLink');
                myDiagram.model.removeLinkData(myDiagram.model.linkDataArray[(myDiagram.model.linkDataArray.length - 1)]);
                myDiagram.commitTransaction('remove nodeLink');
                isPlaceholderPresent = false;
            }
        };
        div.addEventListener("dragover", function (event) {
            if (this === myDiagram.div) {
                var can = event.target;
                var pixelratio = window.PIXELRATIO;
                if (!(can instanceof HTMLCanvasElement)) return;
                var bbox = can.getBoundingClientRect();
                var bbw = bbox.width;
                if (bbw === 0) bbw = 0.001;
                var bbh = bbox.height;
                if (bbh === 0) bbh = 0.001;
                var mx = event.clientX - bbox.left * ((can.width / pixelratio) / bbw);
                var my = event.clientY - bbox.top * ((can.height / pixelratio) / bbh);
                var point = myDiagram.transformViewToDoc(new go.Point(mx, my));
                var curnode = myDiagram.findPartAt(point, true);
                if (curnode instanceof go.Node) {
                    showPlaceholder(curnode);
                    highlight(curnode);
                } else {
                    removePlaceholder();
                    highlight(null);
                }
            }
            if (event.target.className === "dropzone") {
                return;
            }
            event.preventDefault();
        }, false);

        div.addEventListener("dragleave", function (event) {
            if (this === myDiagram.div) {
                highlight(null);
            }
        }, false);

        div.addEventListener("drop", function (event) {
            event.preventDefault();
            if (this === myDiagram.div) {
                var can = event.target;
                var pixelratio = window.PIXELRATIO;
                if (!(can instanceof HTMLCanvasElement)) return;
                var bbox = can.getBoundingClientRect();
                var bbw = bbox.width;
                if (bbw === 0) bbw = 0.001;
                var bbh = bbox.height;
                if (bbh === 0) bbh = 0.001;
                var mx = event.clientX - bbox.left * ((can.width / pixelratio) / bbw);
                var my = event.clientY - bbox.top * ((can.height / pixelratio) / bbh);
                var point = myDiagram.transformViewToDoc(new go.Point(mx, my));
                var itemkeyvalue = Math.floor((Math.random() * 10000) + 1);
                removePlaceholder(); //Remove placeholder if exist;
                if (angular.isDefined(angular.element(dragged).data("$scope").attri)) {
                    var data = angular.element(dragged).data("$scope").attri;
                    myDiagram.startTransaction('new node');
                    myDiagram.model.addNodeData({
                        location: point,
                        key: itemkeyvalue,
                        borderColor: data.borderColor,
                        attribute: data.attribute,
                        operator: data.operator,
                        value: data.value,
                        iconsrc: data.icon ? data.icon : "default",
                        category: data.category
                    });
                    myDiagram.commitTransaction('new node');
                } else {
                    if (angular.isDefined(angular.element(dragged).data("$scope").action)) {
                        var data = angular.element(dragged).data("$scope").action;
                        myDiagram.startTransaction('new node');
                        myDiagram.model.addNodeData({
                            location: point,
                            key: itemkeyvalue,
                            borderColor: data.borderColor,
                            name: data.name,
                            operator: data.operator,
                            value: data.value,
                            iconsrc: data.icon ? data.icon : "default",
                            category: "actions"
                        });
                        myDiagram.commitTransaction('new node');
                    }
                }
                var curnode = myDiagram.findPartAt(point, true);
                if (curnode != null && curnode.data.key != itemkeyvalue) { // Should not be null // not allow to self connect
                    var fromkey = (curnode.data.hasOwnProperty('group')) ? curnode.data.group : curnode.data.key;
                    myDiagram.startTransaction('new link');
                    myDiagram.model.addLinkData({
                        from: fromkey,
                        to: itemkeyvalue
                    });
                    myDiagram.commitTransaction('new link');
                }
            }
        }, false);

        var $ = go.GraphObject.make;  // for conciseness in defining templates
        myDiagram =
            $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
                      {
                          initialContentAlignment: go.Spot.Center,
                          maxSelectionCount: 15,
                          validCycle: go.Diagram.CycleDestinationTree,
                          allowDrop: true,
                          "commandHandler.archetypeGroupData": {
                              text: "Common conditions",
                              isGroup: true,
                              color: "blue",
                              font:"italic 9pt sans-serif"
                          } ,
                          layout:
                            $(go.TreeLayout,
                              {
                          //        treeStyle: go.TreeLayout.StyleLastParents,
                         //         arrangement: go.TreeLayout.ArrangementHorizontal,
                                  //properties for most of the tree:
                                  angle: 90,
                                  layerSpacing: 35,
                                  // properties for the "last parents":
                                  alternateAngle: 90,
                                  alternateLayerSpacing: 35,
                                  alternateAlignment: go.TreeLayout.AlignmentBus,
                                  alternateNodeSpacing: 20
                              }),
                          "undoManager.isEnabled": true
                      });
        window.PIXELRATIO = myDiagram.computePixelRatio(); // constant needed to determine mouse coordinates on the canvas
        myDiagram.addDiagramListener("SelectionDeleting", function (e) {
            var part = e.subject.first(); // e.subject is the myDiagram.selection collection,
            myDiagram.startTransaction("clear node");
            if (part instanceof go.Node) {
                var it = part.findTreeChildrenNodes(); // find all child nodes
                while (it.next()) { // now iterate through them and clear out the boss information
                    var child = it.value;
                    var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
                    if (bossText === null) return;
                    bossText.text = undefined;
                }
            } else if (part instanceof go.Link) {
                var child = part.toNode;
                var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
                if (bossText === null) return;
                bossText.text = undefined;
            }
            myDiagram.commitTransaction("clear node");
        });

        // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
        myDiagram.layout.commitNodes = function () {
            go.TreeLayout.prototype.commitNodes.call(myDiagram.layout);  // do the standard behavior
        };
        function shallWeConnect(node1, node2) {
            if (!(node1 instanceof go.Node)) return false;  // must be a Node
            if (node1 === node2) return false;  // Conditions are not connected to self
            if (node2.isInTreeOf(node1)) return false;  // cannot connect to node if this is the child of same
            return true;
        }
        function textStyle(color) {
            return { font: "9pt  Segoe UI,sans-serif", stroke: color };
        }
        function mouseEnter(e, obj) {
            var shape = obj.findObject("SHAPE");
            shape.stroke = "dodgerblue";
        };
        function mouseLeave(e, obj) {
            var shape = obj.findObject("SHAPE");
            shape.stroke = "#ccc";
        };

        var attributesTemplate = $(go.Node, "Auto",{ locationSpot: go.Spot.Center },
            {
                selectionAdorned: true,
                selectionAdornmentTemplate: $(go.Adornment, "Auto",
$(go.Shape, "Rectangle", {fill: null,stroke: "#159dfc",strokeWidth: 2}),$(go.Placeholder))},
            { resizable: false },
    {
    mouseEnter: mouseEnter, mouseLeave: mouseLeave,
                mouseDragEnter: function (e, node, prev) {
                    var diagram = node.diagram;
                    var selnode = diagram.selection.first();
                    if (!shallWeConnect(selnode, node)) return;
                    var shape = node.findObject("SHAPE");
                    if (shape) {
                        showPlaceholder(node);shape._prevFill = shape.fill;shape.fill = "#ccc";
                    }
                },
                mouseDragLeave: function (e, node, next) {
                    var shape = node.findObject("SHAPE");
                    if (shape && shape._prevFill) {
                        shape.fill = shape._prevFill;
                    }
                    removePlaceholder();
                },
                mouseDrop: function (e, node) {
                    var diagram = node.diagram;
                    var selnode = diagram.selection.first();
                    if (shallWeConnect(selnode, node)) {
                        var link = selnode.findTreeParentLink();
                        if (link !== null) {
                            link.fromNode = node;
                        } else {
                            diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
                        }
                    }
                    removePlaceholder();
                }
            },
            new go.Binding('location', 'location').makeTwoWay(),new go.Binding("text", "name"),new go.Binding("layerName", "isSelected", function (sel) { return sel ? "Foreground" : ""; }).ofObject(),
            $(go.Shape, "Border",
			{name: "SHAPE",fill: "white",stroke: "#ccc",strokeWidth: 1,margin: 0,width: 170}),
            $(go.Panel, "Vertical",{ margin: 0 },
            $(go.Shape, "Circle",{width: 5,height: 5,fill: "grey",stroke: "#26c6da",strokeWidth: 1,portId: "In",toSpot: go.Spot.Top,toLinkable: true}),
              $(go.Panel, "Horizontal",
                    $(go.Panel, "Table",
                    {maxSize: new go.Size(150, 999),defaultAlignment: go.Spot.Left,margin: new go.Margin(5, 20, 10, 20)},
                    $(go.RowColumnDefinition, {row: 0,column: 0}),
                    $(go.Picture,
                    {row: 0,column: 0,name: "Picture",desiredSize: new go.Size(40, 40),},
                    new go.Binding("source", "iconsrc", function (v) { return "shared/resources/images/ruleEngine/" + v.replace('#', '') + ".png" })),
                    $(go.TextBlock,{row: 0,column: 1,editable: false,isMultiline: false,minSize: new go.Size(10, 16),margin: new go.Margin(0, 0, 0, 10)},
                        new go.Binding("text", "attribute").makeTwoWay()),
                      $(go.TextBlock, textStyle("#9e9e9e"),
                        {row: 1,column: 0,columnSpan: 2,margin: new go.Margin(10, 0, 0, 0),font: "italic 9pt sans-serif",},
                        new go.Binding("text", "operator", function (v) { return v; })),
                      $(go.TextBlock, textStyle("black"),
                          {row: 2,column: 0,columnSpan: 2,editable: true,isMultiline: false,minSize: new go.Size(10, 14)},
                        new go.Binding("text", "name").makeTwoWay()),
                        $(go.TextBlock, textStyle("#159dfc"),
                          {row: 3,column: 0,columnSpan: 2,editable: true},
                          new go.Binding("text", "value").makeTwoWay()),
                          new go.Binding("text", "leadApprover", function (v) { return v; }),
                          new go.Binding("text", "selfApproval", function (v) { return v; }),
                          new go.Binding("text", "poolType", function (v) { return v; }),
                          new go.Binding("text", "PoolValue", function (v) { return v; })
                        )
                    ),
                    $(go.Shape, "Rectangle",
                        {width: 100,height: 6,fill: "#d4d4d4",stroke: "#c2c2c2",portId: "Out",fromSpot: go.Spot.Bottom,fromLinkable: true,cursor: "pointer"})));

        ///Actions shape
        var actionsTemplate = $(go.Node, "Auto",
            { locationSpot: go.Spot.Center },
            {selectionAdorned: true,selectionAdornmentTemplate:
                    $(go.Adornment, "Auto",$(go.Shape, "Border",
                    {fill: null,stroke: "#159dfc",strokeWidth: 1,margin: 0}),
                    $(go.Placeholder))},
            {resizable: false},
            {
                mouseEnter: mouseEnter, mouseLeave: mouseLeave,
                mouseDragEnter: function (e, node, prev) {
                    var diagram = node.diagram;
                    var selnode = diagram.selection.first();
                    if (!shallWeConnect(selnode, node)) return;
                    var shape = node.findObject("SHAPE");
                    if (shape) {
                        shape._prevFill = shape.fill;
                        shape.fill = "#ccc";
                    }
                },
                mouseDragLeave: function (e, node, next) {
                    var shape = node.findObject("SHAPE");
                    if (shape && shape._prevFill) {
                        shape.fill = shape._prevFill;
                    }
                },
                mouseDrop: function (e, node) {
                    var diagram = node.diagram;
                    var selnode = diagram.selection.first();
                    if (shallWeConnect(selnode, node)) {
                        var link = selnode.findTreeParentLink();
                        if (link !== null) {
                            link.fromNode = node;
                        } else {
                            diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
                        }
                    }
                }
            },
            new go.Binding('location','location').makeTwoWay(),
            new go.Binding("text", "name"),
            new go.Binding("layerName", "isSelected", function (sel) { return sel ? "Foreground" : ""; }).ofObject(),
            $(go.Shape, "RoundedRectangle",
			{name: "SHAPE",fill: "#fff",stroke: "#ccc",strokeWidth: 1,margin: 0,parameter1: 10,maxSize: new go.Size(250, 70)}),
            $(go.Panel, "Vertical",
            { margin: 0 },
            $(go.Shape, "Circle",
            {width: 5,height: 5,fill: "grey",stroke: "#26c6da",strokeWidth: 1,portId: "In",toSpot: go.Spot.Top,toLinkable: true}),
              $(go.Panel, "Horizontal",
                $(go.Panel, "Table",
                    {defaultAlignment: go.Spot.Left,margin: 0},
                    $(go.Picture,
                        {row: 0,column: 0,name: "Picture",desiredSize: new go.Size(40, 40)},
                        new go.Binding("source", "iconsrc", function (v) { return "shared/resources/images/ruleEngine/" + v.replace('#', '') + ".png" })),
                        $(go.TextBlock, {row: 0,column: 1,margin: new go.Margin(0,0,0,10)},
                        new go.Binding("text", "name")))),
            $(go.Shape, "Rectangle",
                {width: 100,height: 6,fill: "#d4d4d4",stroke: "#c2c2c2",portId: "Out",fromSpot: go.Spot.Bottom,fromLinkable: true,cursor: "pointer"})));

        //Root Element
        var rootElementTemplate = $(go.Node, "Auto",{ locationSpot: go.Spot.Center },
            {resizable: false},
            new go.Binding("location", "location").makeTwoWay(),
            {
                mouseDragEnter: function (e, node, prev) {
                    var diagram = node.diagram;
                    var selnode = diagram.selection.first();
                    if (!shallWeConnect(selnode, node)) return;
                    var shape = node.findObject("SHAPE");
                    if (shape) {
                        shape._prevFill = shape.fill;
                        shape.fill = "#ccc";
                    }
                },
                mouseDragLeave: function (e, node, next) {
                    var shape = node.findObject("SHAPE");
                    if (shape && shape._prevFill) {
                        shape.fill = shape._prevFill;
                    }
                },
                mouseDrop: function (e, node) {
                    var diagram = node.diagram;
                    var selnode = diagram.selection.first();
                    if (shallWeConnect(selnode, node)) {
                        var link = selnode.findTreeParentLink();
                        if (link !== null) {
                            link.fromNode = node;
                        } else {
                            diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
                        }
                    }
                }
            },
            $(go.Shape, "Border",
			{name: "SHAPE",fill: "#fff",stroke: "#ccc",strokeWidth: 1,margin: 0,height:30,maxSize: new go.Size(250, 70)}),
            $(go.Panel, "Vertical",
            { margin: 0 },
            $(go.TextBlock, {margin: new go.Margin(10,10,0,10)},
            new go.Binding("text", "name")),
            $(go.Shape, "Rectangle",
                {width: 10,height: 10,fill: "#d4d4d4",stroke: "#c2c2c2",portId: "Out",fromSpot: go.Spot.Bottom,fromLinkable: true,cursor: "pointer"})));

        var placeholderElementTemplate = $(go.Node, "Auto",{ locationSpot: go.Spot.Center },
            {resizable: false},
            $(go.Shape, "Border",
			{name: "SHAPE",fill: "transparent",stroke: "green",strokeDashArray: [2,2],strokeWidth: 1,margin: 0,height: 40,width:40,maxSize: new go.Size(250, 70)}));
        var templmap = new go.Map("string", go.Node);
        // for each of the node categories, specify which template to use
        templmap.add("attributes", attributesTemplate);
        templmap.add("actions", actionsTemplate);
        templmap.add("rootelement", rootElementTemplate);
        templmap.add("placeholder", placeholderElementTemplate);
        // for the default category, "", use the same template that Diagrams use by default;
        // this just shows the key value as a simple TextBlock
        templmap.add("", myDiagram.nodeTemplate);
        myDiagram.nodeTemplateMap = templmap;


        myDiagram.linkTemplate =
            $(go.Link,
            { routing: go.Link.Orthogonal, corner: 3 },
            {relinkableFrom: true,relinkableTo: true,reshapable: true,resegmentable: true},
            $(go.Shape,{strokeWidth: 1,stroke: "#9e9e9e"}
            ),
            $(go.Shape,  // the "to" arrowhead
            {
                toArrow: "standard",
                stroke: "#D4B52C"
            }
            ));
        myDiagram.groupTemplate =
            $(go.Group, "Vertical",
            {
                selectionObjectName: "PANEL",
                ungroupable: true
            },
            $(go.TextBlock,
            {
                font: "10px sans-serif",
                isMultiline: false,  // don't allow newlines in text
                editable: true,  // allow in-place editing by user
                alignment: go.Spot.Left
            },
            new go.Binding("text", "text").makeTwoWay(),
            new go.Binding("stroke", "color")),
            $(go.Panel, "Auto",
                { name: "PANEL" },
                $(go.Shape, "Rectangle",
                {
                    fill: "#f1f1f1",
                    stroke: "#9e9e9e",
                    strokeWidth: 0.5,
                    portId: "",
                    fromLinkable: true,
                    fromLinkableSelfNode: true,
                    fromLinkableDuplicates: false,
                    toLinkable: true,
                    toLinkableSelfNode: true,
                    toLinkableDuplicates: false
                }),
                $(go.Placeholder, {
                    margin: 20,
                    background: "transparent"
                })
            )
        );
        if (window.Inspector) myInspector = new Inspector('myInspector', myDiagram);
        // create the model data that will be represented by Nodes and Links
        myDiagram.model = new go.GraphLinksModel(ruleNodeArray,ruleLinkArray);
    }

    $scope.getData = function () {
        document.getElementById("mySavedModel").value = myDiagram.model.toJson();
        console.log(myDiagram.model.toJson());
    }
    function load() {
        myDiagram.model = go.Model.fromJson(graphData);
    }
    $scope.makeSelectionGroup = function () {
        myDiagram.commandHandler.groupSelection();
    }
    $scope.deleteSelection = function () {
        myDiagram.commandHandler.deleteSelection();
    }
}
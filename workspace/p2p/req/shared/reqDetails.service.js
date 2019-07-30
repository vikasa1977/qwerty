'use strict';

angular.module('SMART2').
        factory('reqDetailsService', [reqDetailsService]);

function reqDetailsService() {
    var _message = {};
    var _maxNumber = 0;

    var service = {
        getNewReqItem: getNewReqItem,
        getDropDownConfig: getDropDownConfig,
        getItemTypes: getItemTypes,
        getItemDetailSet: getItemDetailSet,
        getBlkEdit: getBlkEdit,
        getModalMessage: getModalMessage,
        setAlertMsg: setAlertMsg,
        setItemNoIndex: setItemNoIndex,
        parseNumber : parseNumber
    };

    return service;

    function parseNumber(num) {
        var returnValue = 0;
        try {
            if (num)
                returnValue = parseFloat(num).toFixed(2);

        } catch (e) {
            console.log("number parsing failed for ", num);
        }
        return parseFloat(returnValue);
    };

    function setItemNoIndex(items) {
        if (items) {
            items.map(function (item) {
                if (_maxNumber < item.id)
                    _maxNumber = item.id;
            });
        }
    };

    function setAlertMsg(msg) {
        _message = msg;
    }

    function getModalMessage() {
        return _message;
    };

    function getBlkEdit() {
        return {
            data: {
                category: {
                }
            },
            config: {
                isSequenceToBeMaintained: false,
                sections: [{
                    isMandatory: true,
                    rows: [{
                        properties: [
                        ]
                    }
                    ]
                }]
            }
        };
    };

    function getItemDetailSet() {
        return [
            { "title": "Lines", "contentUrl": "tabs1.html" },
            { "title": "Accounting", "contentUrl": "tabs2.html" },
            { "title": "Shipping", "contentUrl": "tabs3.html" },
            { "title": "Others", "contentUrl": "tabs4.html" }
        ];
    };

    function getItemTypes() {
        return [
          {
              key: "materials",
              title: "Materials"
          },
          {
              key: "services",
              title: "Services"
          }
        ];
    };

    function getDropDownConfig() {
        return {
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        };
    };

    function getNewReqItem() {
        var time = new Date();
        var newtime = new Date(time);
        newtime.setDate(newtime.getDate() + 15);
        time = time.toDateString();
        newtime = newtime.toDateString();
        _maxNumber++;
        var item = {};
        item.isTaxExempt = true;
        item.status = 0;
        item.splitType = 0;
        item.id = _maxNumber;
        item.lineNumber = 0;
        item.documentCode = 0;
        item.p2PLineItemId = 0;
        item.catalogItemId = null;
        item.taxes = 0;
        item.quantity = 1;
        item.unitPrice = 0;
        item.otherCharges = 0;
        item.shippingCharges = 0;
        item.contractValue = null;
        item.endDate = null;
        item.startDate = null;
        item.createdOn = time;
        item.lastModifiedOn = time;
        item.contractExpiryDate = null;
        item.name = "";
        item.imageURL = null;
        item.buyerItemNumber = null;
        item.description = "";
        item.manufacturer = null;
        item.contractNumber = null;
        item.partnerItemNumber = "";
        item.manufacturerPartNumber = null;
        item.supplierPartAuxiliaryId = null;
        item.contract = null;
        item.notes = null;
        item.isProcurable = 0;
        item.orderedQuantity = null;
        item.needByDate = newtime;
        item.requestedDate = time;
        item.shippingMethod = "";
        item.inventoryType = null;
        item.deliverTo = "";
        item.partnerCode = "PC-2014.000001";
        item.shipTo = {
            id: 2,
            name: "London",
            address: "Airoli Station; Thane - Belapur Road; Mind Space; Navi Mumbai; 400708."
        };
        item.type = {
            id: 1,
            name: "P2P_REQ_Material"
        };
        item.uom = {
            code: "EA",
            name: "Each"
        };
        item.source = {
            id: 2,
            name: "P2P_REQ_Catalog"
        };
        item.partner = {
            id: 6925,
            name: "Partner RiteAid"
        };
        item.category = {
            id: 6.31550000849E11,
            name: "BUSINESS TRAVEL"
        };
        item.createdBy = {
            id: 6.3150040000001E13,
            name: "RiteAid Admin"
        };
        item.lastModifiedBy = {
            id: 6.3150040000001E13,
            name: "RiteAid Admin"
        };
        item.splits = [
                {
                    documentCode: 0,
                    documentItemId: 0,
                    quantity: 0,
                    createdOn: time,
                    lastModifiedOn: time,
                    createdBy: null,
                    lastModifiedBy: null,
                    requester: {
                        code: "63150040000001",
                        name: "RiteAid Admin"
                    },
                    bu: {
                        code: 0,
                        name: ""
                    },
                    account: {
                        code: 0,
                        name: ""
                    },
                    project: {
                        code: 0,
                        name: ""
                    },
                    department: {
                        code: 21,
                        name: ""
                    }
                }
        ];

        return item;
    };
}

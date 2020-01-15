'use strict';

angular.module('SMART2').
        factory('configService', [configService]);

function configService() {
    var configService = {
        setDBConfig: setDBConfig,
        getUIConfig: getUIConfig
    };

    var _config = {};

    return configService;

    function setDBConfig(config) {
        _config = config;
    }

    function getUIConfig(type){
        switch(type){
            case "header":
                return convertConfiguration(_config.headerSettings, type);
                break;
            case "item":
                return convertConfiguration(_config.itemSettings, type);
                break;
            case "split":
                return convertConfiguration(_config.splitSettings, type);
                break;                
        }
    }

    function convertConfiguration(settings, type) {
        var formConfig = { "isSequenceToBeMaintained": false, "sections": [] };
        for (var p in settings) {
            var prop = settings[p];
            if (prop && prop.ui && (!prop.ui.isVisible) && prop.ui.section && (!isNaN(prop.ui.section)) && prop.ui.section > 0 && prop.ui.row && (!isNaN(prop.ui.row)) && prop.ui.row > 0) {
                if (formConfig.sections.length < prop.ui.section) {
                    var count = formConfig.sections.length;
                    for (var i = 0; i < prop.ui.section - count; i++)
                        formConfig.sections.push({ "isMandatory": true, "rows": [] });
                }

                var selectedSec = formConfig.sections[prop.ui.section - 1];
                if (selectedSec.rows.length < prop.ui.row) {
                    var count = selectedSec.rows.length;
                    for (var i = 0; i < prop.ui.row - count; i++)
                        selectedSec.rows.push({ "properties": [] });
                }

                var newProp = {
                    "label": prop.ui.label,
                    "type": prop.ui.type == 'textarea' || prop.ui.type == 'date' ? 'textfield' : prop.ui.type,
                    "sort": (prop.ui.sort && (!isNaN(prop.ui.sort))) ? prop.ui.sort : 1000,
                    "isMandatory": prop.isMandatory,
                    "data": (prop.ui.type !== 'dropdown' && prop.ui.type !== 'autosuggest' && (prop.ui.type !== 'subsection' && (prop.dataType === 'idandname' || prop.dataType === 'codeandname'))) ? p + '.name' : p,
                    "templateUrl": prop.ui.templateUrl,
                    "colspan": prop.ui.colspan,
                    "onKeyPress": prop.ui.onKeyPress,
                    "onBlur": prop.ui.onblur,
                    "onchange": prop.ui.onchange,
                    "attributes": {
                        "maxlength": prop.maxlength,
                        "readonly": (prop.isEditable != null && prop.isEditable != undefined && typeof (prop.isEditable) === 'boolean') ? (!prop.isEditable) : false,
                        "options": prop.ui.options,
                        "decimalprecision": prop.ui.decimalPrecision,
                        "filterkeys": prop.ui.filterkeys,
                        "optionformat": prop.ui.optionformat                       
                    }
                };

                if (type !== 'header') {
                    newProp.isVisible = true;
                    newProp.attributes.removable = false;
                }

                if (prop.ui.type === 'textarea')
                    newProp.attributes.type = 'text';

                if (prop.ui.type === 'date')
                    newProp.attributes.type = 'date';

                if (prop.ui.type === 'dropdown')
                    newProp.attributes.datakey = 'name';

                if (prop.ui.number !== null && prop.ui.number !== undefined && prop.ui.number === true)
                    newProp.attributes.type = 'number';

                if (prop.ui.type === 'autosuggest') {
                    newProp.type = 'textfield';
                    newProp.attributes.type = "autocomplete";
                    newProp.attributes.datakey = prop.datakey;
                }

                //TODO: This will be removed as and when control library is ready.
                if (prop.ui.type === 'tree' || prop.ui.type === 'date') {
                    newProp.type = 'textfield';
                    newProp.attributes.readonly = true;
                }

                selectedSec.rows[prop.ui.row - 1].properties.push(newProp);
            }
        }

        for (var i = 0; i < formConfig.sections.length; i++) {
            for (var j = 0; j < formConfig.sections[i].rows.length; j++) {
                formConfig.sections[i].rows[j].properties.sort(function (a, b) { return a.sort - b.sort })
            }
        }
        
        if (type === 'header') {
            formConfig.sections.push({
                "label": "Item Details",
                "isMandatory": true,
                "rows": [
                  {
                      "properties": [
                        {
                            "colspan": 6,
                            "type": "subsection",
                            "isMandatory": true,
                            "data": "items",
                            "templateUrl": "p2p/req/views/itemDetail.html"
                        }
                      ]
                  }
                ]
            });
        }
        else {
            for (var i = 0; i < formConfig.sections.length; i++) {
                formConfig.sections[i].plain = true;
            }
        }                    

        return formConfig;
    }
}

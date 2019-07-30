angular.module('SMART2').service('RuleEngine', [function() {
    var service = this;
    
    this.setRules = function(dataConfig, dataModel, rules) {
        this.dataConfig = dataConfig;
        this.dataModel = dataModel;
        this.rules = rules;
    };
    
    this.execute = function(callback) {
        //  Inline validations
        var isValid = true;
        var tmpPropertyValue;
        var failedRules = [];
        
        /*
         * Inline validation
         */
        for(var i=0; i<this.dataConfig.length; i++) {
            for(var j=0; j<this.dataConfig[i].rows.length; j++) {
                for(var k=0; k<this.dataConfig[i].rows[j].properties.length; k++) {
                    tmpPropertyValue = eval('this.dataModel.'+this.dataConfig[i].rows[j].properties[k].data);
                    /*
                     * Mandatory rule
                     */
                    var isValidated = false;
                    if(Object(this.dataConfig[i].rows[j].properties[k]).hasOwnProperty('attributes')) {
                        if(Object(this.dataConfig[i].rows[j].properties[k].attributes).hasOwnProperty('type') && this.dataConfig[i].rows[j].properties[k].attributes.type == 'number') {
                            isValidated = true;
                            if(this.dataConfig[i].rows[j].properties[k].isMandatory && isNaN(tmpPropertyValue) || (!this.dataConfig[i].rows[j].properties[k].isMandatory && tmpPropertyValue == undefined)) {
                                this.dataConfig[i].rows[j].properties[k].validate = true;
                                failedRules.push({
                                    type: 'inline',
                                    property: this.dataConfig[i].rows[j].properties[k].label,
                                    rule: "isNaN(this)",
                                    error: "This field should be a number"
                                });
                                if(failedRules.length == 1) {
                                    this.dataConfig[i].rows[j].properties[k].focus = true;
                                }
                                isValid = false;
                            }
                        }
                    }
                    
                    if(!isValidated && this.dataConfig[i].rows[j].properties[k].type != 'checkbox' && this.dataConfig[i].rows[j].properties[k].isMandatory && tmpPropertyValue == '') {
                        this.dataConfig[i].rows[j].properties[k].validate = true;
                        failedRules.push({
                            type: 'inline',
                            property: this.dataConfig[i].rows[j].properties[k].label,
                            rule: "this == ''",
                            error: "This field should not be blank"
                        });
                        if(failedRules.length == 1) {
                            this.dataConfig[i].rows[j].properties[k].focus = true;
                        }
                        isValid = false;
                    }
                    /*
                     * Inline rules
                     */
                    if(Object(this.dataConfig[i].rows[j].properties[k]).hasOwnProperty('rules')) {
                        if(this.dataConfig[i].rows[j].properties[k].rules) {
                            for(var l=0; l<this.dataConfig[i].rows[j].properties[k].rules.length; l++) {
                                if(eval((this.dataConfig[i].rows[j].properties[k].rules[l].rule).replace(/this/g, 'tmpPropertyValue'))) {
                                    this.dataConfig[i].rows[j].properties[k].validate = true;
                                    failedRules.push({
                                        type: 'inline',
                                        property: this.dataConfig[i].rows[j].properties[k].label,
                                        rule: this.dataConfig[i].rows[j].properties[k].rules[l].rule,
                                        error: this.dataConfig[i].rows[j].properties[k].rules[l].error
                                    });
                                    if(failedRules.length == 1) {
                                        this.dataConfig[i].rows[j].properties[k].focus = true;
                                    }
                                    isValid = false;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        /*
         *  Cumulative validations  
         */ 
        if(this.rules) {
            for(var i=0; i<this.rules.length; i++) {
                if(eval((this.rules[i].rule).replace(/this/g, 'this.dataModel'))) {
                    failedRules.push({
                        type: 'cumulative',
                        rule: this.rules[i].rule,
                        error: this.rules[i].error
                    });
                    isValid = false;
                }
            }
        } 
        
        callback({success: isValid, data: failedRules});
    };
    
    
    this.executeOnStaticForm = function(callback) {
        var isValid = true;
        var failedRules = [];
        
        for(var key in this.dataConfig) {
            for(var i=0; i<this.dataConfig[key].rules.length; i++) {
                if(eval(this.dataConfig[key].rules[i].rule.replace(/this/g, 'this.dataModel[key]'))) {
                    failedRules.push({
                        type: 'inline',
                        rule: this.dataConfig[key].rules[i].rule,
                        error: this.dataConfig[key].rules[i].error
                    });
                    if(failedRules.length == 1) {
                        angular.element(angular.element('[ng-model="ngModel.'+key+'"]').children()[1]).trigger('click');
                    }
                    isValid = false;
                }
            }
        }
        
        /*
         *  Cumulative validations  
         */ 
        for(var i=0; i<this.rules.length; i++) {
            if(eval((this.rules[i].rule).replace(/this/g, 'this.dataModel'))) {
                failedRules.push({
                    type: 'cumulative',
                    rule: this.rules[i].rule,
                    error: this.rules[i].error
                });
                isValid = false;
            }
        }
        
        if(angular.isFunction(callback)) {
            callback({success: isValid, data: failedRules}); 
        }
    };
}]);
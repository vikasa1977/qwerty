(function() {
    angular.module('SMART2')
        .service('scannedInvServices', ['$http', scannedInvServicesFn]);

    function scannedInvServicesFn($http) {
        this.SUPPLIER_ID_CARD = {
            "supplierName": "kelloggs",
            "location": "Michigan, United States",
            "site": "www.kelloggs.com",
            "emailId": "Allan.Gibson@Kelloggs.com",
            "logoUrl": "",
            "primaryContact": "Allan Gibson",
            "code": "232654BB3C",
            "suppilersourcetype": "General",
            "status": "Invited",
            "businessunit": {
                "displaytext": "Business Unit",
                "selectedoption": [{
                    "name": "TECHNOLOGY SOLUTIONS",
                    "check": true,
                    "value": [{
                        "name": "NOVA",
                        "check": true,
                        "value": [{
                            "name": "PRODUCT MANAGEMENT GROUP",
                            "check": true
                        }, {
                            "name": "USER EXPERIENCE",
                            "check": true
                        }, {
                            "name": "PRODUCT TECHNOLOGY",
                            "check": true
                        }]
                    }]
                }],
                "options": [{
                    "name": "TECHNOLOGY SOLUTIONS",
                    "check": true,
                    "value": [{
                        "name": "NOVA",
                        "check": true,
                        "value": [{
                            "name": "PRODUCT MANAGEMENT GROUP",
                            "check": true
                        }, {
                            "name": "USER EXPERIENCE",
                            "check": true
                        }, {
                            "name": "PRODUCT TECHNOLOGY",
                            "check": true
                        }]
                    }]
                }]
            },
            "diversityStatus": {
                "displaytext": "Diversity Status",
                "selectedoption": [{
                    "name": "Minority Business Enterprise (MBE) - African American",
                    "check": true
                }, {
                    "name": "Minority Business Enterprise (MBE) - Asian-Indian American",
                    "check": true
                }, {
                    "name": "Minority Business Enterprise (MBE) - Asian-Pacific American",
                    "check": true
                }, {
                    "name": "Minority Business Enterprise (MBE) - Hispanic American",
                    "check": true
                }],
                "options": [{
                    "name": "Minority Business Enterprise (MBE) - African American",
                    "check": true
                }, {
                    "name": "Minority Business Enterprise (MBE) - Asian-Indian American",
                    "check": true
                }, {
                    "name": "Minority Business Enterprise (MBE) - Asian-Pacific American",
                    "check": true
                }, {
                    "name": "Minority Business Enterprise (MBE) - Hispanic American",
                    "check": true
                }]
            },

            "email": "Allan.Gibson@Kelloggs.com",
            "dunscode": "343-BHH-236-549-BB2",
            "suppilerrisktype": "Moderate",
            "countIndicator": [{
                    "cardCount": "20",
                    "cardTitle": "Contracts"
                },
                {
                    "cardCount": "30",
                    "cardTitle": "Purchase Order"
                },
                {
                    "cardCount": "40",
                    "cardTitle": "Requisitions"
                }
            ],
            "phone": "908-720-8526",
            "fax": "9099809988"
        };

        this.NOTIFICATION_CONFIG = {
            type: "confirm",
            message: "<div class='left-align'>This will result in deleting all the Taxes associated with the Line Item. Do you want to proceed?</div>",
            buttons: [{
                "title": "YES",
                "result": "yes"
            }, {
                "title": "No",
                "result": "no"
            }]
        };

        this.TAX_CONFIG = [{
            "dataName": "Invoice Value",
            "dataValue": 678.00,
            "taxEditable": true,
            "makeEdit": false
        }, {
            "dataName": "Shipping",
            "dataValue": 109.00,
            "taxEditable": true,
            "makeEdit": false
        }, {
            "dataName": "Taxes",
            "dataValue": 0,
            "taxEditable": false,
            "makeEdit": false
        }, {
            "dataName": "Invoice Charges",
            "dataValue": 678,
            "taxEditable": false,
            "makeEdit": false
        }];

        this.TAXES_DETAIL_LIST = [{
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 1',
            'taxRate': '10',
            'showEdithCurrentPanel': false
        }, {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 2',
            'taxRate': '68',
            'showEdithCurrentPanel': false
        }, {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 3',
            'taxRate': '5',
            'showEdithCurrentPanel': false
        }, {
            'taxCode': 'TAX0006119',
            'taxDetail': 'Sample Tax Description 4',
            'taxRate': '79',
            'showEdithCurrentPanel': false
        }];

        this.ORG_OPTIONS = [{
            "UserId": 28360,
            "name": "GEP India"
        }, {
            "UserId": 28977,
            "name": "GEP Hyderabad"
        }, {
            "UserId": 28978,
            "name": "GEP Mumbai"
        }, {
            "UserId": 28979,
            "name": "GSPL Inc"
        }, {
            "UserId": 28979,
            "name": "GEP Ventures"
        }];

        this.TYPE_OPTIONS = [{
            "UserId": 28360,
            "UserName": "SRUser1@outlook.com",
            "FirstName": "Evertek",
            "LastName": ""
        }, {
            "UserId": 28977,
            "UserName": "SRUser1@outlook.com11",
            "FirstName": "Cap Supplier 2",
            "LastName": ""
        }, {
            "UserId": 28978,
            "UserName": "SRUser1@outlook.com234",
            "FirstName": "APL Supplier 3",
            "LastName": "Chi"
        }, {
            "UserId": 28979,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "WG Supp1",
            "LastName": ""
        }, {
            "UserId": 28980,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "Avishek",
            "LastName": "Jana"
        }, {
            "UserId": 28981,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "Sachin",
            "LastName": "Kurkute"
        }, {
            "UserId": 28982,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "Karthic",
            "LastName": "Muthuraman"
        }, {
            "UserId": 28983,
            "UserName": "SRUser1@outlook.com342",
            "FirstName": "Rahul",
            "LastName": "Kardekar"
        }];

        this.SCANNED_IMAGE_LIST = [{
            "title": "Outbound From SAP",
            "imageName": "IMG2016 - 000182",
            "imageUploadedBy": "Masco Admin",
            "imageUploadedDate": "2015-04-01",
            "pdfURL": 'shared/resources/images/TATA invoice.pdf'
        }, {
            "title": "Outbound From SAP1",
            "imageName": "IMG2016 - 000182",
            "imageUploadedBy": "Masco Admin",
            "imageUploadedDate": "2015-04-01",
            "pdfURL": 'shared/resources/images/TATA invoice.pdf'
        }, {
            "title": "Outbound From SAP2",
            "imageName": "IMG2016 - 000182",
            "imageUploadedBy": "Masco Admin",
            "imageUploadedDate": "2015-04-01",
            "pdfURL": 'shared/resources/images/TATA invoice.pdf'
        }, {
            "title": "Outbound From SAP3",
            "imageName": "IMG2016 - 000182",
            "imageUploadedBy": "Masco Admin",
            "imageUploadedDate": "2015-04-01",
            "pdfURL": 'shared/resources/images/TATA invoice.pdf'
        }];
        this.COMMENT_LIST = [{
            UserName: "Joseph Powell",
            UserType: "Internal Users and Suppliers",
            commentTxt: "rutrum eu dui rutrum eu dui  rutrum eu dui rutrum eu dui.",
            commentDateTime: "10/12/2015 03:54 PM",
            isOtherUser: true,
            attachments: [{
                filename: "lorem.xls"
            }]
        }, {
            UserName: "Joseph Powell",
            UserType: "Internal Users and Suppliers",
            commentTxt: "rutrum eu dui rutrum eu dui. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu",
            commentDateTime: "10/12/2015 03:54 PM",
            isOtherUser: false,
            attachments: [{
                filename: "reprehenderit.xls"
            }, {
                filename: "velit.xls"
            }]
        }, {
            UserName: "Joseph Powell",
            UserType: "Internal Users and Suppliers",
            commentTxt: "ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            commentDateTime: "10/12/2015 03:54 PM",
            isOtherUser: true,
            attachments: [{
                filename: "rutrum.xls"
            }, {
                filename: "dui.xls"
            }, {
                filename: "eu.xls"
            }]
        }, {
            UserName: "Joseph Powell",
            UserType: "Internal Users and Suppliers",
            commentTxt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim .",
            commentDateTime: "10/12/2015 03:54 PM",
            isOtherUser: false,
            attachments: [{
                filename: "consectetur.xls"
            }, {
                filename: "amet.xls"
            }]
        }, {
            UserName: "Joseph Powell",
            UserType: "Internal Users and Suppliers",
            commentTxt: "rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui rutrum eu dui.",
            commentDateTime: "10/12/2015 03:54 PM",
            isOtherUser: false,
            attachments: [{
                filename: "lorem.xls"
            }]
        }];

        this.ATTACHMENT_LIST = [{
            name: "AttachmentOne.xls",
            status: "fail",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: false
        }, {
            name: "AttachmentTwo.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        }, {
            name: "AttachmentThree.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        }, {
            name: "AttachmentFour.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        }, {
            name: "AttachmentFive.xls",
            status: "success",
            referenceName: "Add Name",
            isShow: true,
            actionIconDelete: true
        }];

        this.MODULES = [{
            id: '0',
            name: 'REQUISITION',
            count: '3',
            number: 'REQ-2016.013110',
            url: 'requisition.html',
            isChecked: false
        }, {
            id: '2',
            name: 'ORDER',
            count: '4',
            number: 'ORD-2015.523209',
            url: 'order.html',
            isChecked: false
        }, {
            id: '3',
            name: 'INVOICE RECONCILIATION',
            count: '8',
            number: 'IR-2016.234829',
            url: 'invoice.html',
            isChecked: false
        }];

        this.SEC_FIELDS_DETAILS = [{
            'name': 'Section One',
            'contentIn': ''
        }, {
            'name': 'Section Two',
            'contentIn': ''
        }, {
            'name': 'Section Three',
            'contentIn': ''
        }, {
            'name': 'Section Four',
            'contentIn': ''
        }, {
            'name': 'Section Five',
            'contentIn': ''
        }, {
            'name': 'Section Six',
            'contentIn': ''
        }, {
            'name': 'Section Seven',
            'contentIn': ''
        }, {
            'name': 'Shipping',
            'contentIn': ''
        }, {
            'name': 'Shipping to',
            'contentIn': 'In Shipping'
        }, {
            'name': 'Ship to Address',
            'contentIn': 'In Shipping'
        }];

        this.SP_DATA = [{
            id: "sp1",
            title: "Purchase Order Terms 1",
            codeRev: "PO TERMS/011",
            fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
            isChecked: false
        }, {
            id: "sp2",
            title: "Purchase Order Terms 2",
            codeRev: "PO TERMS/012",
            fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
            isChecked: false
        }, {
            id: "sp3",
            title: "Purchase Order Terms 3",
            codeRev: "PO TERMS/013",
            fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
            isChecked: false
        }, {
            id: "sp4",
            title: "Purchase Order Terms 4",
            codeRev: "PO TERMS/014",
            fullTxt: "You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere. You may use our Services only as permitted by this Agreement any any applicable laws. Don't misuse our Services. For example, don't interfere",
            isChecked: false
        }];

        this.EXPRESS_LIST = [{
            itemNumber: 'dell',
            name: '123-342-232',
            modelNo: '123',
            actionIconDelete: true
        }, {
            itemNumber: 'Lenovo',
            name: '345-342-354',
            modelNo: '456',
            actionIconDelete: true
        }, {
            itemNumber: 'dell',
            name: '636-436-236',
            modelNo: '789',
            actionIconDelete: true
        }, {
            itemNumber: 'Lenovo',
            name: '428-472-344',
            modelNo: '912',
            actionIconDelete: true
        }, {
            itemNumber: 'Sumsung',
            name: '288-2898-889',
            modelNo: '345',
            actionIconDelete: true,
            actionIconAdd: true
        }];

        this.SPLIT_LIST = [{
            splitNumber: '1',
            splitValue: '20',
            actionIconDelete: true
        }, {
            splitNumber: '2',
            splitValue: '20',
            actionIconDelete: true
        }, {
            splitNumber: '3',
            splitValue: '20',
            actionIconDelete: true
        }, {
            splitNumber: '4',
            splitValue: '20',
            actionIconDelete: true
        }, {
            splitNumber: '5',
            splitValue: '20',
            actionIconDelete: true
        }];

        this.APPROVAL_EXC_DATA = [{
                "supplierItemNumber": "9489T514",
                "itemType": "Service",
                "itemMatchingType": "2 Way",
                "overrideExc": {
                    "excOpt": "No"
                },
                "overrideExcOpt": [{
                        "excOpt": "Yes"
                    },
                    {
                        "excOpt": "No"
                    }
                ],
                "itemTotal": 1000,
                "exceptionComment": "Approvals are required for the received service line item."

            },
            {
                "supplierItemNumber": "9489T514",
                "itemType": "Service",
                "itemMatchingType": "2 Way",
                "overrideExc": {
                    "excOpt": "No"
                },
                "overrideExcOpt": [{
                        "excOpt": "Yes"
                    },
                    {
                        "excOpt": "No"
                    }
                ],
                "itemTotal": 1000,
                "exceptionComment": "Approvals are required for the received service line item."

            },
            {
                "supplierItemNumber": "9489T514",
                "itemType": "Service",
                "itemMatchingType": "2 Way",
                "overrideExc": {
                    "excOpt": "No"
                },
                "overrideExcOpt": [{
                        "excOpt": "Yes"
                    },
                    {
                        "excOpt": "No"
                    }
                ],
                "itemTotal": 1000,
                "exceptionComment": "Approvals are required for the received service line item."

            },
            {
                "supplierItemNumber": "9489T514",
                "itemType": "Service",
                "itemMatchingType": "2 Way",
                "overrideExc": {
                    "excOpt": "No"
                },
                "overrideExcOpt": [{
                        "excOpt": "Yes"
                    },
                    {
                        "excOpt": "No"
                    }
                ],
                "itemTotal": 1000,
                "exceptionComment": "Approvals are required for the received service line item."

            },
            {
                "supplierItemNumber": "9489T514",
                "itemType": "Service",
                "itemMatchingType": "2 Way",
                "overrideExc": {
                    "excOpt": "No"
                },
                "overrideExcOpt": [{
                        "excOpt": "Yes"
                    },
                    {
                        "excOpt": "No"
                    }
                ],
                "itemTotal": 1000,
                "exceptionComment": "Approvals are required for the received service line item."

            }
        ];

        this.CHARGES_DATA = [{
                "item": "Test",
                "orderedCharges": "100.00",
                "invoicedCharges": "10.00",
                "totalInvoicedCharges": "10.00",
                "tolerance": "250.00"
            },
            {
                "item": "Test",
                "orderedCharges": "100.00",
                "invoicedCharges": "10.00",
                "totalInvoicedCharges": "10.00",
                "tolerance": "50.00%"
            },
            {
                "item": "Test",
                "orderedCharges": "100.00",
                "invoicedCharges": "10.00",
                "totalInvoicedCharges": "10.00",
                "tolerance": "25.00%"
            },
            {
                "item": "Test",
                "orderedCharges": "100.00",
                "invoicedCharges": "10.00",
                "totalInvoicedCharges": "10.00",
                "tolerance": "125.00"
            },
            {
                "item": "Test",
                "orderedCharges": "100.00",
                "invoicedCharges": "10.00",
                "totalInvoicedCharges": "10.00",
                "tolerance": "268.00"
            }
        ];

        this.ORDER_TOT_DATA = [{
                "amount": "Item Total",
                "inOrder": "9600.00",
                "inInvoice": "10800.00",
                "totalInvoice": "10800.00",
                "tolerance": "5.00%"
            },
            {
                "amount": "Item Total",
                "inOrder": "9600.00",
                "inInvoice": "10800.00",
                "totalInvoice": "10800.00",
                "tolerance": "8.00"
            },
            {
                "amount": "Item Total",
                "inOrder": "9600.00",
                "inInvoice": "10800.00",
                "totalInvoice": "10800.00",
                "tolerance": "10.00%"
            },
            {
                "amount": "Item Total",
                "inOrder": "9600.00",
                "inInvoice": "10800.00",
                "totalInvoice": "10800.00",
                "tolerance": "25.00"
            },
            {
                "amount": "Item Total",
                "inOrder": "9600.00",
                "inInvoice": "10800.00",
                "totalInvoice": "10800.00",
                "tolerance": "18.00"
            }
        ];

        this.ITEM_MISMATCH_DATA = [{
                "srModel": {
                    "opt": "Select"
                },
                "srOpt": [{
                        "opt": "Select"
                    },
                    {
                        "opt": "Mark as default"
                    },
                    {
                        "opt": "Laptop"
                    },
                    {
                        "opt": "Mouse"
                    },
                    {
                        "opt": "Pendrive"
                    }
                ],
                "item": "Item description comes here",
                "itemType": "Material",
                "quantity": "12 each",
                "unitPrice": "10.00",
                "itemValue": "120.00"

            },
            {
                "srModel": {
                    "opt": "Select"
                },
                "srOpt": [{
                        "opt": "Select"
                    },
                    {
                        "opt": "Mark as default"
                    },
                    {
                        "opt": "Laptop"
                    },
                    {
                        "opt": "Mouse"
                    },
                    {
                        "opt": "Pendrive"
                    }
                ],
                "item": "Item description comes here",
                "itemType": "Material",
                "quantity": "12 each",
                "unitPrice": "10.00",
                "itemValue": "120.00"

            },
            {
                "srModel": {
                    "opt": "Select"
                },
                "srOpt": [{
                        "opt": "Select"
                    },
                    {
                        "opt": "Mark as default"
                    },
                    {
                        "opt": "Laptop"
                    },
                    {
                        "opt": "Mouse"
                    },
                    {
                        "opt": "Pendrive"
                    }
                ],
                "item": "Item description comes here",
                "itemType": "Material",
                "quantity": "12 each",
                "unitPrice": "10.00",
                "itemValue": "120.00"

            },
            {
                "srModel": {
                    "opt": "Select"
                },
                "srOpt": [{
                        "opt": "Select"
                    },
                    {
                        "opt": "Mark as default"
                    },
                    {
                        "opt": "Laptop"
                    },
                    {
                        "opt": "Mouse"
                    },
                    {
                        "opt": "Pendrive"
                    }
                ],
                "item": "Item description comes here",
                "itemType": "Material",
                "quantity": "12 each",
                "unitPrice": "10.00",
                "itemValue": "120.00"

            },
            {
                "srModel": {
                    "opt": "Select"
                },
                "srOpt": [{
                        "opt": "Select"
                    },
                    {
                        "opt": "Mark as default"
                    },
                    {
                        "opt": "Laptop"
                    },
                    {
                        "opt": "Mouse"
                    },
                    {
                        "opt": "Pendrive"
                    }
                ],
                "item": "Item description comes here",
                "itemType": "Material",
                "quantity": "12 each",
                "unitPrice": "10.00",
                "itemValue": "120.00"

            }
        ];

        this.QUANITY_DATA = [{
                "item": "Apple iPad 4",
                "itemType": "Material",
                "acceptedQuantity": "12 each",
                "orderQuantity": "12 each",
                "recQuantity": "10 each",
                "invQuantity": "12 each",
                "totalInvoice": "12 each",
                "tolerance": "16.00"
            },
            {
                "item": "Repair Service",
                "itemType": "Fixed Service",
                "acceptedQuantity": "12 each",
                "orderQuantity": "12 each",
                "recQuantity": "NA",
                "invQuantity": "12 each",
                "totalInvoice": "12 each",
                "tolerance": "6.00%"
            },
            {
                "item": "Painting Service",
                "itemType": "Variable Service",
                "acceptedQuantity": "12 each",
                "orderQuantity": "12 each",
                "recQuantity": "NA",
                "invQuantity": "12 each",
                "totalInvoice": "12 each",
                "tolerance": "5.00%"
            },
            {
                "item": "HTC One",
                "itemType": "Material",
                "acceptedQuantity": "12 each",
                "orderQuantity": "12 each",
                "recQuantity": "10 each",
                "invQuantity": "12 each",
                "totalInvoice": "12 each",
                "tolerance": "55.00"
            },
            {
                "item": "Apple iPhone",
                "itemType": "Material",
                "acceptedQuantity": "12 each",
                "orderQuantity": "12 each",
                "recQuantity": "10 each",
                "invQuantity": "12 each",
                "totalInvoice": "12 each",
                "tolerance": "78.00"
            },
            {
                "item": "Samsung 3",
                "itemType": "Material",
                "acceptedQuantity": "12 each",
                "orderQuantity": "12 each",
                "recQuantity": "10 each",
                "invQuantity": "12 each",
                "totalInvoice": "12 each",
                "tolerance": "30.00%"
            },
        ];

        this.SHIPPING_DATA = [{
                "item": "Chair",
                "orderShipping": "20.00",
                "invShipping": "21.00",
                "totalInvShipping": "21.00"
            },
            {
                "item": "Laptop",
                "orderShipping": "200.00",
                "invShipping": "201.00",
                "totalInvShipping": "201.00"
            },
            {
                "item": "Chair",
                "orderShipping": "20.00",
                "invShipping": "21.00",
                "totalInvShipping": "21.00"
            },
            {
                "item": "Laptop",
                "orderShipping": "200.00",
                "invShipping": "201.00",
                "totalInvShipping": "201.00"
            },
            {
                "item": "Chair",
                "orderShipping": "20.00",
                "invShipping": "21.00",
                "totalInvShipping": "21.00"
            },
            {
                "item": "Laptop",
                "orderShipping": "200.00",
                "invShipping": "201.00",
                "totalInvShipping": "201.00"
            }
        ];
        this.UNIT_PRICE_DATA = [{
                "item": "Item description comes here",
                "itemType": "Material",
                "orderUnitPrice": "12 each",
                "invUnitPrice": "10 each",
                "tolerance": "20.00%"
            },
            {
                "item": "Item description comes here",
                "itemType": "Material",
                "orderUnitPrice": "12 each",
                "invUnitPrice": "10 each",
                "tolerance": "165.00"
            },
            {
                "item": "Item description comes here",
                "itemType": "Material",
                "orderUnitPrice": "12 each",
                "invUnitPrice": "10 each",
                "tolerance": "75.00"
            },
            {
                "item": "Item description comes here",
                "itemType": "Material",
                "orderUnitPrice": "12 each",
                "invUnitPrice": "10 each",
                "tolerance": "89.00"
            },
            {
                "item": "Item description comes here",
                "itemType": "Material",
                "orderUnitPrice": "12 each",
                "invUnitPrice": "10 each",
                "tolerance": "26.00%"
            }
        ];

        this.TAX_DATA = [{
                "item": "Item Total",
                "orderTax": "12 (5%)",
                "invTax": "110 (4%)",
                "totalInvTax": "22",
                "useTax": "2 (1%)",
                "tolerance": "24.00%"
            },
            {
                "item": "Shipping Charges",
                "orderTax": "12 (5%)",
                "invTax": "110 (4%)",
                "totalInvTax": "22",
                "useTax": "2 (1%)",
                "tolerance": "62.00"
            },
            {
                "item": "Taxes",
                "orderTax": "12 (5%)",
                "invTax": "110 (4%)",
                "totalInvTax": "22",
                "useTax": "2 (1%)",
                "tolerance": "33.00%"
            },
            {
                "item": "Total Value",
                "orderTax": "12 (5%)",
                "invTax": "110 (4%)",
                "totalInvTax": "22",
                "useTax": "2 (1%)",
                "tolerance": "56.00"
            },
            {
                "item": "Other Charges",
                "orderTax": "12 (5%)",
                "invTax": "110 (4%)",
                "totalInvTax": "22",
                "useTax": "2 (1%)",
                "tolerance": "88.00"
            },
            {
                "item": "Taxes",
                "orderTax": "12 (5%)",
                "invTax": "110 (4%)",
                "totalInvTax": "22",
                "useTax": "2 (1%)",
                "tolerance": "25.00%"
            },
            {
                "item": "Total Value",
                "orderTax": "12 (5%)",
                "invTax": "110 (4%)",
                "totalInvTax": "22",
                "useTax": "2 (1%)",
                "tolerance": "35.00%"
            }
        ];
        this.UOM_DATA = [{
                "item": "Laptop",
                "itemType": "Material",
                "orderUOM": "12 each",
                "receivedUOM": "10 each",
                "invUOM": "2 packs"
            },
            {
                "item": "Laptop",
                "itemType": "Material",
                "orderUOM": "12 each",
                "receivedUOM": "10 each",
                "invUOM": "2 packs"
            },
            {
                "item": "Laptop",
                "itemType": "Material",
                "orderUOM": "12 each",
                "receivedUOM": "10 each",
                "invUOM": "2 packs"
            },
            {
                "item": "Laptop",
                "itemType": "Material",
                "orderUOM": "12 each",
                "receivedUOM": "10 each",
                "invUOM": "2 packs"
            },
            {
                "item": "Laptop",
                "itemType": "Material",
                "orderUOM": "12 each",
                "receivedUOM": "10 each",
                "invUOM": "2 packs"
            }
        ];

        this.getJSONData = function(a_reqData) {
            return $http(a_reqData).then(function(respData) {
                return respData.data;
            })
            .catch(function(err) {
                return 'ERROR'
            });
        }

        this.COMPANY_OPTIONS = [{
            "companyName": "Anglo Kristine",
            "code": "AK - 110"
        }, {
            "companyName": "German Shepard",
            "code": "GS - 005"
        }, {
            "companyName": "Victory Sales",
            "code": "VS - 770"
        }];

        this.ORDER_OPTIONS = [{
            "orderId": 28360,
            "OrderNumber": "PO-80.1004876",
            "OrderName": "Order1004876VATTest"
        }, {
            "orderId": 28977,
            "OrderNumber": "PO-80.1004884",
            "OrderName": "Order1004884VATTest"
        }, {
            "orderId": 57950,
            "OrderNumber": "PO-80.1004891",
            "OrderName": "Order271016377VATTest"
        }];

        this.PAYMENT_TERM_OPTIONS = [{
            "name": "Z006 - NET 30 DAYS"
        }, {
            "name": "Z007 - NET 40 DAYS"
        }, {
            "name": "Z008 - NET 50 DAYS"
        }, {
            "name": "Z009 - NET 60 DAYS"
        }];

        this.APPROVERS = [{
            name: 'John',
            "selected": false
        }, {
            name: 'Jessie'
        }, {
            name: 'Johanna'
        }, {
            name: 'Joy',
            "selected": false
        }, {
            name: 'Mary'
        }, {
            name: 'Peter'
        }, {
            name: 'Sebastian',
        }, {
            name: 'Erika'
        }, {
            name: 'Patrick'
        }, {
            name: 'Samantha'
        }];

        this.EXPRESS_LIST2 = [{
            itemNumber: 'dell',
            name: '-',
            actionIconDelete: true
        }, {
            itemNumber: 'Sumsung',
            name: '-',
            actionIconDelete: true
        }, {
            itemNumber: 'Lenovo',
            name: '-',
            actionIconDelete: true
        }, {
            itemNumber: 'Sumsung',
            name: '-',
            actionIconDelete: true
        }, {
            itemNumber: 'dell',
            name: '-',
            actionIconDelete: true
        }, {
            itemNumber: 'Lenovo',
            name: '-',
            actionIconDelete: true
        }, {
            itemNumber: 'Sumsung',
            name: '-',
            actionIconDelete: true,
            actionIconAdd: true
        }];
        this.IMPORT_FRM_TEMP = [{
            'lable': 'Payment Term Template',
            'tmptNo': 'TEMP-2016.000313'
        }, {
            'lable': 'Legal Entity Template',
            'tmptNo': 'TEMP-2016.000313'
        }, {
            'lable': 'Shipping & freight Template',
            'tmptNo': 'TEMP-2016.000313'
        }];
        this.EXC_TYPE_OPTIONS = [{ "name": "Approval Required Exception", "datakey": "approvalRequiredExcTbl" },
        { "name": "Order Total", "datakey": "orderTotalTbl" },
        { "name": "Charges Exception", "datakey": "chargesTbl" },
        {
            "name": "Item Mismatch Exception", "datakey": "itemMismatchTbl"
        },
        { "name": "Quantity Exception", "datakey": "quantityTbl" },
        { "name": "Shipping Exception", "datakey": "shippingTbl" },
        { "name": "Unit Price Exception", "datakey": "unitPriceTbl" },
        { "name": "Tax Exception", "datakey": "taxTbl" },
        {"name": "UOM Exception", "datakey": "uomTbl" }
        ];

    };
})();

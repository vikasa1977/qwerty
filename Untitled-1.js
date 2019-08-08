[{

    "costelement": "Direct Labor",
    "name": "Labor Setup Coating A",
    "dependent": {
        "options": [{
            "name": "Yes"
        }, {
            "name": "No"
        }],
        "selectedoption": {
            "name": "No"
        }
    },
    "refcostelem": "Not Applicable",
    "perofref": "",
    "scale": "Fixed",
    "costsource": "Labor Index1",
    "unitcost": 600,
    "inputuom": "Ton",
    "outputuom": "Ton",
    "throughputqty": 1,
    "requiredqty": 1,
    "stepyeild": 100,
    "required": 1,
    "cost": 600
}]

[{
        'sequence': '1',
        "costelement": "Labor Efficiency",
        "name": "Wastage",
        "dependent": {
            "options": [{
                "name": "Yes"
            }, {
                "name": "No"
            }],
            "selectedoption": {
                "name": "Yes"
            }
        },
        "refcostelem": "Labor (costelement)",
        "perofref": 0.7,
        "scale": "Proportional",
        "costsource": "",
        "unitcost": "",
        "inputuom": "",
        "outputuom": "",
        "throughputqty": "",
        "requiredqty": "",
        "stepyeild": "",
        "required": "",
        "cost": 1260
    },
    {
        'sequence': '2',
        "costelement": "Machine Efficiency",
        "name": "Wastage",
        "dependent": {
            "options": [{
                "name": "Yes"
            }, {
                "name": "No"
            }],
            "selectedoption": {
                "name": "Yes"
            }
        },
        "refcostelem": "Production",
        "perofref": 0.7,
        "scale": "",
        "costsource": "",
        "unitcost": "",
        "inputuom": "",
        "outputuom": "",
        "throughputqty": "",
        "requiredqty": "",
        "stepyeild": "",
        "required": "",
        "cost": 175
    }
]

[{
        'sequence': '1',
        "costelement": "Machine",
        "name": "Setup Sheeting Machine A",
        "dependent": {
            "options": [{
                "name": "Yes"
            }, {
                "name": "No"
            }],
            "selectedoption": {
                "name": "No"
            }
        },
        "refcostelem": "Not Applicable",
        "perofref": "",
        "scale": "Fixed",
        "costsource": "Cost Master",
        "unitcost": 100,
        "inputuom": "",
        "outputuom": "",
        "throughputqty": 1,
        "requiredqty": 1,
        "stepyeild": 100,
        "required": 1,
        "cost": 100
    },
    {
        'sequence': '2',
        "costelement": "Machine",
        "name": "Sheeting Machine A",
        "dependent": {
            "options": [{
                "name": "Yes"
            }, {
                "name": "No"
            }],
            "selectedoption": {
                "name": "No"
            }
        },
        "refcostelem": "Not Applicable",
        "perofref": "",
        "scale": "Proportional",
        "costsource": "Cost Master",
        "unitcost": 50,
        "inputuom": "",
        "outputuom": "",
        "throughputqty": 1,
        "requiredqty": 1,
        "stepyeild": 100,
        "required": 1,
        "cost": 50
    },
    {
        'sequence': '3',
        "costelement": "Machine",
        "name": "Setup Coating Machine A",
        "dependent": {
            "options": [{
                "name": "Yes"
            }, {
                "name": "No"
            }],
            "selectedoption": {
                "name": "No"
            }
        },
        "refcostelem": "Not Applicable",
        "perofref": "",
        "scale": "Fixed",
        "costsource": "Cost Master",
        "unitcost": 100,
        "inputuom": "",
        "outputuom": "",
        "throughputqty": 1,
        "requiredqty": 1,
        "stepyeild": 100,
        "required": 1,
        "cost": 100
    }
]
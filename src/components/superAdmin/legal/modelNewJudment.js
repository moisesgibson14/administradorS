function modelJudment(callback) {
    let newJudment = {
        "titleJudgment": "",
        "user": "",
        "applicantName": {
            "dataBasic": {
                "taxRegime": "",
                "RFC": "",
                "socialReason": "",
                "tradeName": "",
                "legalRepresentative": ""
            },
            "taxDomicile": {
                "street": "",
                "outdoorNumber": "",
                "interiorNumber": "",
                "colony": "",
                "municipality": "",
                "state": "",
                "country": "",
                "postalCode": "",
                "taxBill": "",
                "typeOfSettlement": ""
            },
            "contacts": [
                {
                    "titleContact": "",
                    "name": "",
                    "surname": "",
                    "jobPost": "",
                    "email": "",
                    "officePhone": "",
                    "cellPhone": ""
                }
            ]
        },
        "nameDefendant": [
            {
                "dataBasic": {
                    "taxRegime": "",
                    "RFC": "",
                    "socialReason": "",
                    "tradeName": "",
                    "legalRepresentative": ""
                },
                "taxDomicile": {
                    "street": "",
                    "outdoorNumber": "",
                    "interiorNumber": "",
                    "colony": "",
                    "municipality": "",
                    "state": "",
                    "country": "",
                    "postalCode": "",
                    "taxBill": "",
                    "typeOfSettlement": ""
                },
                "contacts": [
                    {
                        "name": "",
                        "surname": "",
                        "jobPost": "",
                        "email": "",
                        "officePhone": "",
                        "cellPhone": ""
                    }
                ]
            }
        ],
        "characteristics": {
            "typeJudgment": "",
            "noCourt": "",
            "noCaseFile": "",
            "federalEntity": "",
            "matter": "",
            "proceduralStatus": "",
            "mainLuck": ""
        },
        "documentation": {
            "label": "Documentación de litigio",
            "children": []
        },
        "description": [
            {
                "label": "RESUMEN DE PRESTACIONES ACCESORIAS",
                "valueLabel": "",
                "description": ""
            },
            {
                "label": "GARANTÍAS",
                "valueLabel": "",
                "description": ""
            },
            {
                "label": "PROBLEMÁTICA",
                "valueLabel": "",
                "description": ""
            },
            {
                "label": "DISPONIBILIDAD",
                "valueLabel": "",
                "description": ""
            }
        ]
    }
    callback(newJudment)
}

module.exports = {
    modelJudment
}
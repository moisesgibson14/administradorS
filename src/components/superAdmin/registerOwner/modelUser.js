function user(callback) {
    let userModel = {
        creationDate: new Date(),
        taxRegime: '',
        RFC: '',
        idOwner: '',
        socialReason: '',
        tradeName: '',
        legalRepresentative: '',
        taxDomicile: {
            street: '',
            outdoorNumber: '',
            interiorNumber: '',
            colony: '',
            municipality: '',
            state: '',
            country: '',
            postalCode: '',
            taxBill: '',
            typeOfSettlement: ''
        },
        contacts: [
            {
                label: 'CONTACTO OPERACIONES',
                name: '',
                surname: '',
                jobPost: '',
                email: '',
                officePhone: '',
                cellPhone: ''
            },
            {
                label: 'CONTACTO FINANZAS',
                name: '',
                surname: '',
                jobPost: '',
                email: '',
                officePhone: '',
                cellPhone: ''
            },
            {
                label: 'CONTACTO LEGAL',
                name: '',
                surname: '',
                jobPost: '',
                email: '',
                officePhone: '',
                cellPhone: ''
            }
        ],
        furnitures: {
            authorization: false,
            vehicles: {
                authorization: false,
                administration: {
                    authorization: false,
                    chargeForService: '',
                    billingPeriod: '',
                    billingDay: '',
                    paymentTime: '',
                    IVA: false
                },
                services: [
                    {
                        authorization: false,
                        label: 'SUBASTA',
                        percentage: '',
                        quantity: '',
                        IVA: false
                    },
                    {
                        authorization: false,
                        label: 'VENTA DIRECTA',
                        percentage: '',
                        quantity: '',
                        IVA: false
                    }
                ],
                gestures: {
                    authorization: false,
                    interiorPatios: [],
                    outdoorPatios: []
                },
                transfers: {
                    authorization: false,
                    lessThan: [],
                    largerThan: []
                },
                aesthetic: {
                    authorization: false,
                    typeAesthetic: [
                        {
                            typeVehicle: '',
                            priceFull: '',
                            priceHalf: '',
                            priceWashed: '',
                            iva: false 
                        }
                    ]
                },
            }
        },
        estate: {
            authorization: false,
            administration: {
                authorization: false,
                chargeForService: '',
                billingPeriod: '',
                billingDay: '',
                paymentTime: '',
                IVA: false
            },
            services: [
                {
                    authorization: false,
                    label: 'SUBASTA',
                    percentage: '',
                    quantity: '',
                    IVA: false
                },
                {
                    authorization: false,
                    label: 'VENTA DIRECTA',
                    percentage: '',
                    quantity: '',
                    IVA: false
                }
            ],
            gestures: {
                authorization: false,
                gesture: [
                    {
                        nameGesture: 'Avalúo',
                        percentage: '',
                        quantity: '',
                        iva: false
                    },
                    {
                        nameGesture: 'Certificaciones de No adeudo de Agua, Predial, Mejoras y Clave y valor catastral',
                        percentage: '',
                        quantity: '',
                        iva: false
                    },
                    {
                        nameGesture: 'Certificado de Libertad o existencia de Gravamen',
                        percentage: '',
                        quantity: '',
                        iva: false
                    },
                    {
                        nameGesture: 'Inscripción del crédito ante el instituto',
                        percentage: '',
                        quantity: '',
                        iva: false
                    },
                    {
                        nameGesture: 'Ingreso de documentación ante notario',
                        percentage: '',
                        quantity: '',
                        iva: false
                    },
                    {
                        nameGesture: 'Respaldo de principio a fin en la operación',
                        percentage: '',
                        quantity: '',
                        iva: false
                    },
                    {
                        nameGesture: 'Programación y firma ante notario',
                        percentage: '',
                        quantity: '',
                        iva: false
                    }
                ]
            }
        },
        bankAccounts: [
            {
                nameBank: '',
                numberAccount: '',
                clabe: '',
                statusAccountURL: '',
                noReference:''
            }
        ],
        documents: [
            {
                name: "ACTA CONSTUTIVA",
                urlFile: ""
            },
            {
                name: "IDENTIFICACIÓN OFICIAL (REPRESENTANTE LEGAL)",
                urlFile: ""
            },
            {
                name: "PODER NOTARIAL",
                urlFile: ""
            },
            {
                name: "COMPROBANTE DE DOMICILIO",
                urlFile: ""
            },
            {
                name: "CONTRATO",
                urlFile: ""
            }
        ],
        logo: ''
    }
    callback(userModel)
}

module.exports = {
    user
}
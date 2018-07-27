import uid from 'uid'

function modelAsset(callback) {
    let asset = {
        creationDate: new Date(),
        idOwner: '',
        socialReason: "",
        reviewDays:"",
        areas: [{
            label: "",
            value: ""
          },
          {
            label: "",
            value: ""
          },
          {
            label: "",
            value: ""
          },
          {
            label: "",
            value: ""
          },
          {
            label: "",
            value: ""
          },
          {
            label: "",
            value: ""
          }],
        deposito:{
           option:false,
           value:'',
           noReference:0 
        },
        kindOfGood: "",
        typeOfFurnitureOrProperty: "",
        typeOfAsset: "",
        idSates: uid(10),
        mainPhoto:'',
        mainGifPhoto:'',
        ids: [
            {
                label: "",
                value: ""
            },
            {
                label: "",
                value: ""
            },
            {
              label: "",
              value: ""
            },
            {
              label: "",
              value: ""
            },
            {
                label: "",
                value: ""
            },
            {
                label: "",
                value: ""
            }
        ],
        title: '',
        observations: '',
        destination: '',
        furniture: {
            highlightActive:false,
            vehicle: {
                serialNumber: '',
                engineNumber: '',
                guideEBC: false,
                year: '',
                brand: '',
                model: '',
                version: '',
                priceBuyEbc: '',
                priceSaleEbc: '',
                priceSaleMaxi: '',
                priceSaleTES: '',
                carPlates: '',
                administration: {
                    administrativeDocumentation: [
                        {
                            mainLabel: 'FACTURAS',
                            children: []
                        },
                        {
                            mainLabel: 'TENENCIAS',
                            children: []
                        },
                        {
                            mainLabel: 'BAJA DE PLACAS',
                            children: []
                        },
                        {
                            mainLabel: 'REPUVE',
                            children: []
                        },
                        {
                            mainLabel: 'TARJETA DE CIRCULACIÓN',
                            children: []
                        }
                    ],
                    videoLink: '',
                    extImages: false,
                    extActive:false,
                    externalImages: [
                        {
                            label: 'GENERALES',
                            images: []
                        },
                        {
                            label: 'DAÑOS',
                            images: []
                        },
                        {
                            label: 'REPARACIONES',
                            images: []
                        }
                    ],
                    revisions: []
                },
                Subasta:{
                    dateNow:new Date(),
                    DocumentaryStatusAsset:{
                        values: [
                            { 'label': 'EN TRÁMITE' }, { 'label': 'COMPROMETIDO' }, { 'label': 'CONCLUIDO' }
                        ],
                        value:''
                    },
                    eventNumber:'',
                    typeOfAuction:{
                        values: [
                            { 'label': 'ELECTRÓNICA' }, { 'label': 'PÚBLICA' }
                        ],
                        value:''
                    },
                    eventTitle:'',
                    locationEvent:{
                        values:[
                            {'label': 'Casa de subastas'},{'label':'Externo'}
                        ],
                        value:''
                    },
                    eventDate: new Date(),
                    lot:0,
                    warrantyColor:{
                        value:'',
                        code:'',
                        pints:0
                    },
                    startingPrice:'',
                    exchangeRate:'',
                    reservePrice:'',
                    coin:{
                        values:[
                            {'label':'MXN'},{'label': 'USD'},{'label': 'EUR'}, {'label':'Otros'}
                        ],
                        value:''
                    },
                    commissionOwner:'',
                    typeCommissionOwner:'',
                    commissionBuyer:'',
                    typeCommissionBuyer:'',
                    typeCommission:{
                        values:[
                            {'label':'%'}, {'label':'$'}
                        ]
                    },
                    comissionSpecial:{
                        option:false,
                        value:0,
                        values:[
                            {'label':'SI'}, {'label':'NO'}
                        ]
                    },
                    forHighlighting:'',
                    lotStatus:{
                        values:[
                            {'label':'ABIERTO'},{'label':'DESIERTO'},{'label':'RETIRADO'},{'label':'VENDIDO'}
                        ],
                        value:'',
                    },
                    observations:'',
                    specifications:{
                        asNew:false,
                        LowMileage:false,
                        agencyServices:false,
                        noReservePrice:false
                    }
                },
                directSale:{
                    dateNow:new Date(),
                    documentaryStatus:{
                        values: [
                            { 'label': 'EN TRÁMITE' }, { 'label': 'COMPROMETIDO' }, { 'label': 'CONCLUIDO' }
                        ],
                        value:''
                    },
                    lot:'',
                    coin:{
                        values:[
                            {'label':'MXN'},{'label': 'USD'},{'label': 'EUR'}, {'label':'Otros'}
                        ],
                        value:''
                    },
                    exchangeRate:'',
                    salePrice:'',
                    typeCommissionOwner:'',
                    commissionOwner:'',
                    typeCommissionBuyer:'',
                    commissionBuyer:'',
                    typeCommission:{
                        values:[
                            {'label':'%'}, {'label':'$'}
                        ]
                    },

                    forHighlighting:'',
                    lotStatus:{
                        values:[
                            {'label':'ABIERTO'},{'label':'DESIERTO'},{'label':'RETIRADO'},{'label':'VENDIDO'}
                        ],
                        value:''
                    },
                    observations:''
                }
            },
            location: {
                CP: "",
                street: "",
                nExterno: "",
                nInterno: "",
                colony: "",
                typeOfSettlement: "",
                municipality: "",
                state: "",
                country: "MÉXICO",
                lng: "",
                lat: ""
            }
        },
        states: {
            idGoverment: "",
            basicInformation:[
              {
              valueId:"",
              id:"",
              turn:"",
              name:"",
              director:"",
              typeService:"",
              stateService:"",
              other:{
                label:'',
                value:''
              }
            }
          ],
            location: {
                CP: "",
                street: "",
                nExterno: "",
                nInterno: "",
                colony: "",
                typeOfSettlement: "",
                municipality: "",
                state: "",
                country: "MÉXICO",
                lng:"",
                lat:""
            },
            assetData: {
                superficieTerreno: "",
                superficieConstrucion: "",
                indiviso: "",
                antiguedadConstrucion: ""
            },
            administration: {
                documentacionAdministrativa: [
                    {
                        mainLabel: "ESCRITURAS",
                        children: []
                    },
                    {
                        mainLabel: "TÍTULO DE PROPIEDAD",
                        children: []
                    },
                    {
                        mainLabel: "LIBERTAD DE GRAVAMEN",
                        children: []
                    },
                    {
                        mainLabel: "REGISTRO PÚBLICO DE PROPIEDAD",
                        children: []
                    },
                    {
                        mainLabel: "USO DE SUELO",
                        children: []
                    },
                    {
                        mainLabel: "PLANO",
                        children: []
                    },
                    {
                        mainLabel: "AVALÚOS",
                        children: []
                    },
                    {
                        mainLabel: "PREDIAL",
                        children: []
                    },
                    {
                        mainLabel: "SERVICIO DE AGUA",
                        children: []
                    },
                    {
                        mainLabel: "TRÁMITES CONDOMINALES",
                        children: []
                    }

                ]
            },
            extImages: false,
            imagesHigh: [
                {
                    mainLabel: "GENERALES",
                    children: [
                        {
                            label: "",
                            images: [],
                            notes: "",
                            date: ""
                        }
                    ]
                },
                {
                    mainLabel: "DAÑOS",
                    children: [
                        {
                            label: "",
                            images: [],
                            notes: "",
                            date: ""
                        }
                    ]
                }
            ],
            video: "",
            legal: {
                legalProcedures: {
                    activities: []
                },
                legalStatus: {
                    withProblems: 'false',
                    judgments: []
                }
            },
            accountantReports:{
                
            }
        }
    }

    callback(asset)
}

module.exports = {
    modelAsset
}

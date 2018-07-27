function modelSubasta(callback){
    let subasta = {
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
        lot:'',
        warrantyColor:{
            values:[
                {'label': 'PLATINUM'},{'label':'AMARILLA'},{'label':'ROJA'},{'label':'AZUL'},{'label':'OTRAS'}
            ],
            value:''
        },
        startingPrice:'',
        exchangeRate:'',
        reservePrice:'',
        coin:{
            values:[
                {'label':'MXN'},{'label': 'USD'}, {'label':'Otros'}
            ],
            value:''
        },
        commissionOwner:'',
        commissionBuyer:'',
        forHighlighting:'',
        lotStatus:{
            values:[
                {'label':'ABIERTO'},{'label':'DESIERTO'},{'label':'RETIRADO'},{'label':'VENDIDO'}
            ],
            value:''
        },
        observations:''
    }
    callback(subasta)
}

export default modelSubasta
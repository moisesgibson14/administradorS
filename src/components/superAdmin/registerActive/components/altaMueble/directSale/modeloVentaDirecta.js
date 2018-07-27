function modelVentaDirecta(callback){
    let ventaDirecta = {
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
                {'label':'MXN'},{'label': 'USD'}, {'label':'Otros'}
            ],
            value:''
        },
        exchangeRate:'',
        salePrice:'',
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
    callback(ventaDirecta)
}

export default modelVentaDirecta
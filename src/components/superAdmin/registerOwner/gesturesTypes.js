function interiorPatios(callback) {
    let interiorPatios = [
        {
            "nameProcess": "Pago tenencia",
            "priceCdmx": 375,
            "priceEdoMex": 440,
            "republicanInterior": 440,
            "iva": false
        },
        {
            "nameProcess": "Baja de placas",
            "priceCdmx": 700,
            "priceEdoMex": 850,
            "republicanInterior": 885,
            "iva": false
        },
        {
            "nameProcess": "Baja de placas de carga",
            "priceCdmx": 1300,
            "priceEdoMex": 0,
            "republicanInterior": 0,
            "iva": false
        },
        {
            "nameProcess": "Cambio de propietario",
            "priceCdmx": 550,
            "priceEdoMex": 650,
            "republicanInterior": 0,
            "iva": false
        },
        {
            "nameProcess": "Certificación de tenencia",
            "priceCdmx": 585,
            "priceEdoMex": 765,
            "republicanInterior": 765,
            "iva": false
        },
        {
            "nameProcess": "Acreditación de propiedad",
            "priceCdmx": 1875,
            "priceEdoMex": 1875,
            "republicanInterior": 1875,
            "iva": false
        },
        {
            "nameProcess": "Reposición de tarjeta de circulación",
            "priceCdmx": 495,
            "priceEdoMex": 495,
            "republicanInterior": 495,
            "iva": false
        },
        {
            "nameProcess": "Solicitud de sábana",
            "priceCdmx": 105,
            "priceEdoMex": 0,
            "republicanInterior": 0,
            "iva": false
        },
        {
            "nameProcess": "Acta por pérdida de placa y/o tarjeta de circulación",
            "priceCdmx": 0,
            "priceEdoMex": 0,
            "republicanInterior": 425,
            "iva": false
        },
        {
            "nameProcess": "Pago multas",
            "priceCdmx": 325,
            "priceEdoMex": 325,
            "republicanInterior": 325,
            "iva": false
        },
        {
            "nameProcess": "Constancia de no infracción",
            "priceCdmx": 490,
            "priceEdoMex": 490,
            "republicanInterior": 490,
            "iva": false
        },
        {
            "nameProcess": "Permiso para circular",
            "priceCdmx": 750,
            "priceEdoMex": 750,
            "republicanInterior": 750,
            "iva": false
        }
    ]
    callback(interiorPatios)
}

function outdoorPatios(callback) {
    let outdoorPatios = [
        {
            "placeOfPosition": "Norte",
            "price": 1900,
            "iva": false
        },
        {
            "placeOfPosition": "Centro",
            "price": 1200,
            "iva": false
        },
        {
            "placeOfPosition": "Sur",
            "price": 1600,
            "iva": false
        }
    ]
    callback(outdoorPatios)
}

function largerThan(callback) {
    let largerThan = [
        {
            "nameLess": "Rodando (Por kilómetro)",
            "priceCdmx": 11.5,
            "priceGdl": 11.5,
            "priceMty": 11.5,
            "iva": false
        },
        {
            "nameLess": "Grúa",
            "priceCdmx": 550,
            "priceGdl": 450,
            "priceMty": 450,
            "iva": false
        },
        {
            "nameLess": "Madrina",
            "priceCdmx": 550,
            "priceGdl": 450,
            "priceMty": 450,
            "iva": false
        }
    ]
    callback(largerThan)
}

function lessThan(callback) {
    let lessThan = [
        {
            "nameLess": "Rodando (Por kilómetro)",
            "priceCdmx": 9.5,
            "priceGdl": 9.5,
            "priceMty": 9.5,
            "iva": false
        },
        {
            "nameLess": "Grúa",
            "priceCdmx": 550,
            "priceGdl": 450,
            "priceMty": 450,
            "iva": false
        },
        {
            "nameLess": "Madrina",
            "priceCdmx": 550,
            "priceGdl": 450,
            "priceMty": 450,
            "iva": false
        }
    ]
    callback(lessThan)
}

function aesthetic(callback) {
    let aesthetic = [
        {
            "typeVehicle": "Chico",
            "priceFull": 2000,
            "priceHalf": 1300,
            "priceWashed": 250,
            "iva": false,
            "_id": "5a15c8c00326963bd6021989"
        },
        {
            "typeVehicle": "Mediano",
            "priceFull": 2400,
            "priceHalf": 1700,
            "priceWashed": 300,
            "iva": false,
            "_id": "5a15c8c00326963bd6021988"
        },
        {
            "typeVehicle": "Grande",
            "priceFull": 2700,
            "priceHalf": 2300,
            "priceWashed": 450,
            "iva": false,
            "_id": "5a15c8c00326963bd6021987"
        },
        {
            "typeVehicle": "Trabajo",
            "priceFull": 3200,
            "priceHalf": 2700,
            "priceWashed": 600,
            "iva": false,
            "_id": "5a15c8c00326963bd6021986"
        }
    ]
    callback(aesthetic)
}

module.exports = {
    interiorPatios,
    outdoorPatios,
    largerThan,
    lessThan,
    aesthetic
}
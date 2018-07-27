function types(callback) {
    let actives = [
        {
            label: "AMBULANCIA",
            value: "AMBULANCIA"
        },
        {
            label: "AUTO",
            value: "AUTO"
        },
        {
            label: "AUTOBÚS",
            value: "AUTOBÚS"
        },
        {
            label: "BUGGY",
            value: "BUGGY"
        },
        {
            label: "CAMIÓN",
            value: "CAMIÓN"
        },
        {
            label: "CAMIONETA",
            value: "CAMIONETA"
        },
        {
            label: "CAMPER",
            value: "CAMPER"
        },
        {
            label: "CARRITO DE GOLF",
            value: "CARRITO DE GOLF"
        },
        {
            label: "CHATARRA",
            value: "CHATARRA"
        },
        {
            label: "CUATRIMOTO",
            value: "CUATRIMOTO"
        },
        {
            label: "DOLLY",
            value: "DOLLY"
        },
        {
            label: "GOKART",
            value: "GOKART"
        },
        {
            label: "GUAYÍN",
            value: "GUAYÍN"
        },
        {
            label: "LIMUSINA",
            value: "LIMUSINA"
        },
        {
            label: "MICROBUS",
            value: "MICROBUS"
        },
        {
            label: "MINIBOOGIE",
            value: "MINIBOOGIE"
        },
        {
            label: "MINIMOTO",
            value: "MINIMOTO"
        },
        {
            label: "MINIVAN",
            value: "MINIVAN"
        },
        {
            label: "MOTOCICLETA",
            value: "MOTOCICLETA"
        },
        {
            label: "MOTONETA",
            value: "MOTONETA"
        },
        {
            label: "PICK UP",
            value: "PICK UP"
        },
        {
            label: "REMOLQUE",
            value: "REMOLQUE"
        },
        {
            label: "TOLVA",
            value: "TOLVA"
        },
        {
            label: "TRACTOCAMIÓN",
            value: "TRACTOCAMIÓN"
        },
        {
            label: "TRIMOTO",
            value: "TRIMOTO"
        },
        {
            label: "VAGONETA",
            value: "VAGONETA"
        },
        {
            label: "VAN",
            value: "VAN"
        },
        {
            label: "VAGÓN",
            value: "VAGÓN"
        },
        {
            label: "OTRO",
            value: "OTRO"
        }
    ]
    callback(actives)
}

function typeFurniture(callback) {
    let types = [
        {
            label: "VEHÍCULO",
            value: "VEHÍCULO"
        },
        {
            label: "AERONAVE",
            value: "AERONAVE"
        },
        {
            label: "EMBARCACIÓN",
            value: "EMBARCACIÓN"
        },
        {
            label: "INDUSTRIAL",
            value: "INDUSTRIAL"
        },
        {
            label: "MERCANCÍA DIVERSA",
            value: "MERCANCÍA DIVERSA"
        },
    ]
    callback(types)
}

module.exports = {
    types,
    typeFurniture
}
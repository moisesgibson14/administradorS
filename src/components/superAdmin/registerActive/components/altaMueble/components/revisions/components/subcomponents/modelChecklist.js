function Checklist(callback){
    let checklist = [
        {
        'groupName': 'GENERAL',
            'priority': 1,
                'numberReview': 0,
                    'childrens': [
                        {
                            'label': 'Fecha', 'value': '', 'type': 'date', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'Hora', 'value': '', 'type': 'time', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'Ubicación', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'ID Propietario', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'Propietario', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': '1. Área', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': '2. Área', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'Tipo de vehículo', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        }
                        ,
                        {
                            'label': 'Color', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'Año', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'Kilometraje', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': true,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'Odómetro', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': true,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'Marca', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'Número de serie', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': true,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'Modelo', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        }
                        ,
                        {
                            'label': 'Número de motor', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': true,
                            'showCamera': true,
                            'status': false

                        }                        
                        ,
                        {
                            'label': 'Versión', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        },
                        {
                            'label': 'ID Sates', 'value': '', 'type': 'text', 'values': [],
                            'subvalues': { 'value': '', 'type': 'radio', 'values': [] },
                            'imageArr': [],
                            'camera': false,
                            'showCamera': true,
                            'status': false

                        }
                    ]   
        },
        {
            'groupName': 'DOCUMENTACIÓN',
            priority: 2,
            'childrens': [
                {
                    'label': 'Tarjeta de Circulación', value: '', 'type': 'radio', values: [
                        { 'label': 'Vigente' }, { 'label': 'No' }],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false

                },
                {
                    'label': 'Placas', value: '', 'type': 'text', values: [],
                    'subvalues': { 'value': '', type: 'text', 'values': [] },
                    'imageArr': [],
                    'camera': true,
                    'showCamera': true,
                    'status': false

                },
                {
                    'label': 'Carnet de Servicios', value: '', 'type': 'radio', values: [
                        { 'label': 'Si' }, { 'label': 'No' }],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false

                },
                {
                    'label': 'Verificación', value: '', 'type': 'radio', values: [
                        { 'label': 'Vigente' }, { 'label': 'No' }],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false

                },
                {
                    'label': 'Manuales', value: '', 'type': 'radio', values: [
                        { 'label': 'Si' }, { 'label': 'No' }],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false

                }
            ]
        },
        {
            'groupName': 'FRONTAL',
            priority: 3,
            'childrens': [
                {
                    'label': 'Parabrisas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Limpiadores', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Plumas Limpiadoras', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Defensa/Fascia', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Emblemas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Faro Izquierdo', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Faro Derecho', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Faros de Niebla', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Molduras', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Cofre', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Parrilla', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Porta placa', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
            ]
        },
        {
            'groupName': 'LATERAL DERECHO',
            priority: 4,
            'childrens': [
                {
                    'label': 'Aletas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Cristales', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Costado', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Cuartos', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Chapas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Emblemas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Espejo Lateral', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Escribo', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Manijas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Molduras', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Puerta Delantera', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Puerta Trasera', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Rines', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Salpicadera', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Tapón de Rueda', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
            ]
        },
        {
            'groupName': 'POSTERIOR',
            priority: 5,
            'childrens': [
                {
                    'label': 'Brazo Limpiador', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Calaveras', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Chapa Cajuela', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Defensa/Fascia', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Emblemas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Escape', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Luz Stop', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Medallón', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Molduras', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Pluma Limpiadora', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
                ,
                {
                    'label': 'Porta Placa', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Tapa Cajuela', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
            ]
        },
        {
            'groupName': 'INTERIOR CAJUELA',
            priority: 6,
            'childrens': [
                {
                    'label': 'Reflejantes (Emergencia)', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Alfombra Cajuela', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Cable Pasa-Corriente', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Cartón Cajuela', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Gato', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Herramienta', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Llave de Ruedas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Llanta de Refacción', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
            ]
        },
        {
            'groupName': 'LATERAL IZQUIERDO',
            priority: 7,
            'childrens': [
                {
                    'label': 'Aletas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Cristales', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Costado', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Cuartos', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Chapas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Emblemas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Espejo Lateral', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Estribo', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Manijas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Molduras', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Molduras', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Puerta Delantera', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Puerta Trasera', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false
 
                },
                {
                    'label': 'Rines', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Salpicadera', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Tapón de Rueda', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
            ]
        }, 
        {
            'groupName': 'INTERIOR',
            priority: 8,
            'childrens': [
                {
                    'label': 'Alfombras', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'text', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Asientos Delanteros', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Asiento Trasero', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [{ 'label': 'M' }, { 'label': 'A' }] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Radio', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Botones Radio', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [{ 'label': 'M' }, { 'label': 'H' }] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bocinas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Encendedor', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Cenicero', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Cinturón de Seguridad', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],                    
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Coderas', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
                ,
                {
                    'label': 'Controles Eléctricos', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Controles A/C', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Defroster', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Tablero', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Botones del Tablero', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Emblemas', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Espejo Interior', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Freno Estacionamiento', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Guantera', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Intermitentes', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Manijas Interiores', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Palancas Volante', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Perilla de Palanca', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bolsas de Aire', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Seguros', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Switch de Encendido', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Volante', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Tapa de Volante', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Tapetes', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Viseras', value: '', valueText: '', 'type': 'radio', values: [
                       { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
            ]
        },       
        {
            'groupName': 'MOTOR',
            priority: 9,
            'childrens': [
                {
                    'label': 'Aceite', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'text', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bateria', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bayonetas de Aceite Motor', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [{ 'label': 'M' }, { 'label': 'A' }] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bayoneta de Aceite Motor', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bayoneta Aceite Transmisión', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [{ 'label': 'M' }, { 'label': 'H' }] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bocina de Claxon', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Compresora A/C', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Depósito de Agua', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Dirección Hidráulica', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Marcha', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Motor Limpiadores', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Tapones (Contenedores)', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Alternador', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bandas', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bobina', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bomba de Agua', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bomba de Gasolina', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Caja de Transmisión ', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Motor Ventilador', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Motor y Tren de Arrastre', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Computadora General', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Cilindros', value: '', valueText: '', 'type': 'radio', values: [
                         { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
            ]
        },        
        {
            'groupName': 'LLANTAS',
            priority: 10,
            'childrens': [
                {
                    'label': 'Delantera Derecha', value: '', valueText: '', valueBrand:'', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Trasera Derecha', value: '', valueText: '', valueBrand:'', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Delantera Izquierda', value: '', valueText: '', valueBrand:'', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Trasera Izquierda', value: '', valueText: '', valueBrand:'', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Refacción', value: '', valueText: '', valueBrand:'', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Medidas', value: '', 'type': 'text', values: [],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
            ]
        },
        {
            'groupName': 'NIVELES',
            priority: 11,
            'childrens': [
                {
                    'label': 'Gasolina', value: '', valueText: '', 'type': 'radio', values: [
                    { 'label': '1' }, { 'label': '3/4' }, { 'label': '1/2' }, { 'label': '1/4' } ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': true,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }, 
                {
                    'label': 'Aceite', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': '1' }, { 'label': '3/4' }, { 'label': '1/2' }, { 'label': '1/4' }],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': true,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
            ]
        },
        {
            'groupName': 'EXTRAS',
            priority: 12,
            'childrens': [
                {
                    'label': 'Alarma', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }, 
                {
                    'label': 'Antena', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Extintor', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Llaves de Encendido', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Tapa de Gasolina', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Tapón Gasolina', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Canastilla', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Quemacocos', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': '4X4', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Llave de Ruedas', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Sistema de Navegación', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Cámara de Reversa', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Bluetooth', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Vestiduras de Piel', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Gato Hidráulico', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                },
                {
                    'label': 'Blindaje', value: '', valueText: '', 'type': 'radio', values: [
                        { 'label': 'Sin daño' }, { 'label': 'Con Daño o Faltante' }, { 'label': 'No Aplica' }, { 'label': 'Sujeto a Revisión' }
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false,
                    'damage': false

                }
            ]
        },
        {
            'groupName': 'CONDICIONES GENERALES',
            priority: 13,
            'childrens': [
                {
                    value: '', 'type': 'radio', values: [
                        { 'label': 'EXCELENTES' }, { 'label': 'BUENAS' }, { 'label': 'REGULARES' }, { 'label': 'MALAS' }, {'label':'CHATARRA'}
                    ],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false

                }
            ]
        },
        {
            'groupName': 'DAÑOS RELEVANTES',
            priority: 13,
            'childrens': [
                {
                    'label': 'Daños Relevantes', value: '', 'type': 'textarea', values: [],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] }
                }
            ]
        },
        {
            'groupName': 'OBSERVACIONES',
            priority: 14,
            'childrens': [
                {
                    'label': 'Observaciones', value: '', 'type': 'textarea', values: [],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': true,
                    'status': false

                }
            ]
        },
        {
            'groupName': 'PRESENTA LA UNIDAD',
            priority: 15,
            'childrens': [
                {
                    'label': 'Nombre Completo', value: '', 'type': 'text', values: [],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': false,
                    'status': false

                },
                {
                    'label': 'Telefono', value: '', 'type': 'text', values: [],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': false,
                    'status': false

                },
                {
                    'label': 'Firma', value: '', 'type': 'signature', values: [],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': false,
                    'status': false

                },
                {
                    'label': 'Email', value: '', 'type': 'text', values: [],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': false,
                    'status': false

                }
            ]
        },
        {
            'groupName': 'INSPECTOR',
            priority: 16,
            'childrens': [
                {
                    'label': 'Nombre Completo', value: '', 'type': 'text', values: [],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': false,
                    'status': false

                },
                {
                    'label': 'Telefono', value: '', 'type': 'text', values: [],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': false,
                    'status': false

                },
                {
                    'label': 'Firma', value: '', 'type': 'signature', values: [],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': false,
                    'status': false

                },
                {
                    'label': 'Email', value: '', 'type': 'text', values: [],
                    'subvalues': { 'value': '', type: 'radio', 'values': [] },
                    'imageArr': [],
                    'camera': false,
                    'showCamera': false,
                    'status': false

                }
            ]
        }
    ]   
    callback(checklist)
}
export default Checklist
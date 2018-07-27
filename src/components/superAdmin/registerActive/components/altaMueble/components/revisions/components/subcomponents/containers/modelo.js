function ConditionsReport(callback) {
    let conditions = {
        idCrumb: '',
        reviewDate: new Date(),
        hour: '',
        location: '',
        idOwner: '',
        Owner: '',
        OneArea: '',
        TwoArea: '',
        mainPhoto:'',
        vehicle: {
            serialNumber: '',
            engineNumber: '',
            year: '',
            brand: '',
            model: '',
            version: '',
            odometer: '',
            color: '',
            typeVehicle: '',
            idActive: ''
        },
        vehicleDamage: [],
        generalMechanics:[
            {
                'label': 'HOJALATERÍA Y PINTURA', value: '', 'type': 'radio', values: [
                    { 'label': 'EXCELENTES' }, { 'label': 'BUENAS' }, { 'label': 'REGULARES' }, { 'label': 'MALAS' }
                ],
                'status': false,
            },
            {
                'label': 'MECÁNICA EN GENERAL', value: '', 'type': 'radio', values: [
                    { 'label': 'EXCELENTES' }, { 'label': 'BUENAS' }, { 'label': 'REGULARES' }, { 'label': 'MALAS' }
                ],
                'status': false,
            }
        ],
        observations: '',
        totalCost: ''
    }
    callback(conditions)
}

export default ConditionsReport

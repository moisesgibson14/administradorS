function ConditionsReport(callback) {
    let conditions = {
        idCrumb: '',
        reviewDate: new Date(),
        hour: '',
        location: '',
        idOwner:'',
        Owner: '',
        OneArea:'',
        TwoArea:'',
        vehicle:{
            serialNumber: '',
            engineNumber: '',
            year: '',
            brand: '',
            model: '',
            version: '',
            odometer:'',
            color:'',
            typeVehicle:'',
            idActive:''
        },
        vehicleDamage:{
            zone: '',
            part:'',
            hurt:'',
            observations:'',
            cost:''
        },
        tinAndPaint:'',
        generalMechanics:'',
        observations:'',
        totalCost:''
    }
    callback(conditions)
}

export default ConditionsReport

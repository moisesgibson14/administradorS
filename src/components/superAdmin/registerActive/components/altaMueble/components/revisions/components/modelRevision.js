function Revision(callback) {
    let revision = {
        idCrumb : '',
        extraRevision: false,
        revisionNumber: '',
        endReviewDate: new Date(),
        endReviewHour: '',
        reviewDate: new Date(),
        hour: '',
        nextRevision: new Date(),
        reviewTime: '',
        idQR: '',
        location: {
            street: '',
            nExterno: '',
            nInterno: '',
            colony: '',
            municipality: '',
            typeOfSettlement: '',
            state: '',
            country: 'MÉXICO',
            CP: '',
            lat: '',
            lng: ''
        },
        inspector: '',
        activeInUse: false,
        typePerson:'',
        moralPerson: false,
        moralPersonValue: '',
        moralPersonPhoto:'',
        governmentValue:'',
        governmentPhoto:'',
        responsablePhysic: {
            urlPhoto: '',
            name: '',
            surname: '',
            jobPosition: '',
            email: '',
            cellPhone: '',
            officePhone: ''
        },
        user: {
            urlPhoto: '',
            name: '',
            surname: '',
            jobPosition: '',
            email: '',
            cellPhone: '',
            officePhone: ''
        },
        images: [
            {
                label: 'RECEPCIÓN',
                urls:[]                     
            },
            {
                label: 'ESTÉTICA',
                urls: []
            }
            
        ],
        documentationInTheAsset: [
            {
                label: 'TARJETA DE CIRCULACIÓN',
                url: '',
                date: new Date(),
                note: '',
            },
            {
                label: 'VERIFICACIÓN',
                url: '',
                date: new Date(),
                note: ''
            },
            {
                label: 'MANUALES',
                url: '',
                date: new Date(),
                note: ''
            }
        ],
        checklist: [],
        conditionsReports:[]
    }

    callback(revision)
}

export default Revision
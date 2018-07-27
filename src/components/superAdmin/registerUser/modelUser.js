import Cryptr from 'cryptr'
var cryptr = new Cryptr('satesSeguro8102')

function NewUser(callback) {
    let userLocal = JSON.parse(localStorage.getItem('atadresu'))
    let registerUser = cryptr.decrypt(userLocal.one)


    let user = {
        name: '',
        user: '',
        tradename: '',
        job: '',
        email: '',
        officePhone: '',
        cellPhone: '',
        profile: '',
        avatar: '',
        registerUser: registerUser,
        active: true,
        creationDate: new Date(),
        authorization: [
            {
                'label': "Home",
                value: true
            },
            {
                'label':"Informes",
                value:true
            },
            {
                'label': "Activos",
                value: true,
                childrens: [
                    {
                        label: 'Editar',
                        value: true
                    },
                    {
                        label: 'Borrar',
                        value: true
                    },
                    {
                        label: 'Crear',
                        value: true
                    },
                    {
                        label: 'Inspeccionar',
                        value: true
                    }
                ]
            },
            {
                'label': "Legal",
                value: true,
                childrens: [
                    {
                        label: 'Documentación',
                        value: true
                    },
                    {
                        label: 'Tramites',
                        value: true
                    },
                    {
                        label: 'Situación jurídica',
                        value: true
                    }
                ]
            },
            {
                'label': "Contable",
                value: true
            },
            {
                'label': "Propietarios",
                value: true,
                childrens: [
                    {
                        label: 'Editar',
                        value: true
                    },
                    {
                        label: 'Borrar',
                        value: true
                    },
                    {
                        label: 'Nuevo',
                        value: true
                    }
                ]
            },
            {
                'label': "Usuarios",
                value: true,
                childrens: [
                    {
                        label: 'Editar',
                        value: true
                    },
                    {
                        label: 'Borrar',
                        value: true
                    },
                    {
                        label: 'Nuevo',
                        value: true
                    },
                    {
                        label: 'Acceso',
                        value: true
                    },
                ]
            }

        ]
    }

    callback(user)
}

export default NewUser;
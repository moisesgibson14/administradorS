function assignProfiles(callback) {
    let profiles = [
        {
            id: "administrator",
            label: "Administrador"
        },
        {
            id: "analyst",
            label: "Analista"
        },
        {
            id: "auditor",
            label: "Auditor"
        },
        {
            id: "query",
            label: "Consulta",
        },
        {
            id: "accountant",
            label: "Contador",
        },
        {
            id: "dictator",
            label: "Dictaminador",
        },
        {
            id: "documentation",
            label: "Documentación",
        },
        {
            id: "videoEditor",
            label: "Editor de vídeo",
        },
        {
            id: "income",
            label: "Ingresos",
        },
        {
            id: "inspector",
            label: "Inspector",
        },
        {
            id: "chiefInspector",
            label: "Lider inspectores",
        },
        {
            id: "marketing",
            label: "Mercadotecnia",
        },
        {
            id: "owner",
            label: "Propietario",
        },
        {
            id: "compiler",
            label: "Recopilador",
        },
        {
            id: "support",
            label: "Soporte",
        },
        {
            id: "supervisor",
            label: "Supervisor",
        },
        {
            id: "appraiser",
            label: "Valuador",
        }
    ]
    callback(profiles)
}

module.exports = {
    assignProfiles
}
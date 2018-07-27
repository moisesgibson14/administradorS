import dateFormat from 'dateformat'

function inmueble(callback) {
    let inmuebleB = {
        creationDate: dateFormat(new Date, 'dd/mm/yyyy h:MM TT'),
        idOwner: "",
        nameOwner:"",
        areas: [
          {
            label: "",
            value: ""
          },
          {
            label: "",
            value: ""
          },
          {
            label: "",
            value: ""
          },
          {
            label: "",
            value: ""
          }
        ],
        tipoBien: "",
        tipoActivo: "",
        identificadoresActivo: {
          idSates: "",
          numeroInmueble: "",
          numeroEscritura: "",
          ids: [
            {
              label: "",
              value: ""
            },
            {
              label: "",
              value: ""
            },
            {
              label: "",
              value: ""
            },
            {
              label: "",
              value: ""
            }
          ],
          idGobierno: ""
        },
        ubicacion: {
            CP: "",
            calle: "",
            nExterno: "",
            nInterno: "",
            colonia: "",
            tipoAsentamiento: "",
            municipio: "",
            estado: "",
            pais: ""
          },
        datosActivo: {
          titulo: "",
          superficieTerreno: "",
          superficieConstrucion: "",
          indiviso: "",
          antiguedadConstrucion: "",
          observaciones: "",
          destino: ""
        },
        administration: {
          documentacionAdministrativa: [
            {
              mainLabel: "Escrituras",
              children: [
                {

                }
              ]
            },
            {
                mainLabel: "Título de propietario",
                children: [
                  {

                  }
                ]
              },
              {
                mainLabel: "Libertad de gravamen",
                children: [
                  {

                  }
                ]
              },
              {
                mainLabel: "Registro público de propiedad",
                children: [
                  {

                  }
                ]
              },
              {
                mainLabel: "Planos",
                children: [
                  {

                  }
                ]
              },
              {
                mainLabel: "Avalúos",
                children: [
                  {

                  }
                ]
              },
              {
                mainLabel: "Predial",
                children: [
                  {

                  }
                ]
              },
              {
                mainLabel: "Servicio de agua",
                children: [
                  {

                  }
                ]
              },
              {
                mainLabel: "Trámites condominales",
                children: [
                  {

                  }
                ]
              }

          ],
          extImages: true,
          imagesHigh: [
            {
              mainLabel: "Generales",
              children: [
                {
                  label: "",
                  images: [],
                  notes: "",
                  date: ""
                }
              ]
            },
            {
              mainLabel: "Daños",
              children: [
                {
                  label: "",
                  images: [],
                  notes: "",
                  date: ""
                }
              ]
            }
          ],
          video: ""
        }
      }
    callback(inmuebleB)
}

export default inmueble

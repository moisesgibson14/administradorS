
function Revisions(callback) {
  let revision = {
    idSates: '',
    kindOfGood: '',
    idAsset: '',
    socialReason: '',
    idOwner: '',
    typeRevision: '',
    revisionNumber: '',
    idQR: '',
    dateRevision: '',
    hour: '',
    nextRevision: '',
    completionComments: '',
    sketch: '',
    firmResponsible: {
      name: '',
      firm: ''
    },
    firmLeader: {
      name: '',
      firm: ''
    },
    dataResponsable: [
      {
        fiscalRegimen: '',
        name: '',
        surnames: '',
        job: '',
        email: '',
        officePhone: '',
        cellPhone: '',
        photoUrl: '',
        federalEntity: ''
      }
    ],
    validations: {
      location: {
        CP: {
          status: true,
          value: ''
        },
        street: {
          status: true,
          value: ''
        },
        nExterno: {
          status: true,
          value: ''
        },
        nInterno: {
          status: true,
          value: ''
        },
        colony: {
          status: true,
          value: ''
        },
        typeOfSettlement: {
          status: true,
          value: ''
        },
        municipality: {
          status: true,
          value: ''
        },
        state: {
          status: true,
          value: ''
        },
        country: {
          status: true,
          value: ''
        },
        lng: {
          status: true,
          value: ''
        },
        lat: {
          status: true,
          value: ''
        }
      },
      assetData: {
        superficieTerreno: {
          status: true,
          value: ''
        },
        superficieConstrucion: {
          status: true,
          value: ''
        },
        indiviso: {
          status: true,
          value: ''
        },
        antiguedadConstrucion: {
          status: true,
          value: ''
        }
      }
    },
    activeUse: false,
    dataUser: [
      {
        fiscalReglamen: '',
        name: '',
        surnames: '',
        job: '',
        email: '',
        officePhone: '',
        cellPhone: '',
        photoUrl: '',
        federalEntity: ''
      }
    ],
    checkList: {
      numberBuildings: 0,
      buildings: []
    }
  }

  callback(revision)
}

function responsableCheck(callback) {
  let responsable = {
    fiscalRegimen: '',
    name: '',
    surnames: '',
    job: '',
    email: '',
    officePhone: '',
    cellPhone: '',
    photoUrl: '',
    federalEntity: ''
  }

  callback(responsable)
}

function revisionCheck(callback) {
  let building = {
    crumb: '',
    surfaceOfBuilding: '',
    typeOfMaterial: '',
    name: '',
    type: '',
    userCreate: '',
    dateCreation: '',
    userAssign: [],
    description: '',
    idQR: '',
    conditions: {
      label: '',
      photosUrl: []
    },
    numberlevels: '',
    levels: []
  }

  callback(building)
}

function levelsCheck(callback) {
  let levels = {
    crumb: '',
    numberLevel: '',
    name: '',
    userAssign: [],
    description: '',
    idQR: '',
    conditions: {
      label: '',
      photosUrl: []
    },
    numberAreas: '',
    areas: [],
    RealEstateAssets: []

  }
  callback(levels)
}

function areasCheck(callback) {
  let areas = {
    crumb: '',
    name: '',
    userCreate: '',
    dateCreation: '',
    description: '',
    idQR: '',
    conditions: {
      label: '',
      photosUrl: []
    },
    numberAssets: '',
    assets: []
  }

  callback(areas)
}

function assetsCheck(callback) {
  let assets = {
    crumb: '',
    name: '',
    userCreate: '',
    brand: '',
    model: '',
    dateCreation: new Date(),
    numberAsset: 1,
    price: 0,
    description: '',
    idQR: '',
    conditions: {
      label: '',
      photosUrl: []
    }
  }

  callback(assets)
}

function assets(callback) {
  let asset = [
    'ABACO',
    'ABBY PDT',
    'ABRELATAS',
    'ACCES POINT',
    'ACEITE PARA TROMPETA',
    'ACORDEON',
    'ACUMULADOR',
    'ADAPTADOR',
    'ADECUACION DE RED',
    'AEROMETRO',
    'AFILADORA',
    'AGITADOR',
    'AIR GRID',
    'AIRE ACONDICIONADO',
    'AJEDREZ',
    'ALACENA',
    'ALARMA',
    'ALBERCA',
    'ALCOHOLIMETRO',
    'ALIMENTADOR',
    'ALTAVOCES',
    'ALTIMETRO',
    'AMALGAMADOR',
    'AMASADORA',
    'AMPERIMETRO',
    'AMPLIFICADOR',
    'ANALIZADOR',
    'ANAQUEL',
    'ANATOMIA DORSO HUMANO',
    'ANDADERA',
    'ANEMOMETRO',
    'ANILLO',
    'ANIMALITOS',
    'ANTENA',
    'ANTIVIRUS',
    'ANTOLOGIA',
    'APARADOR',
    'APARATO',
    'APISONADORA',
    'APUNTADOR',
    'ARADO',
    'ARCHIVERO',
    'ARCO',
    'ARENERO',
    'ARETES',
    'ARGOYAS',
    'ARMARIO',
    'ARMONICA',
    'ARNES',
    'AROMATERAPIA',
    'AROS',
    'ARROCERA',
    'ARTICULO DEPORTIVO',
    'ARTICULOS DE BIBLIOTECA',
    'ARTICULOS MOVILES',
    'ASADOR',
    'ASPERSORA',
    'ASPIRADORA',
    'ASTA BANDERA',
    'ATINA Y APRENDE',
    'ATOMIZADOR',
    'ATRIL',
    'AUDIFONO',
    'AUDIO',
    'AUDIOMETRO',
    'AUTOBUS',
    'AUTO-CLE',
    'AUTOESTEREO',
    'AUTOMOVIL',
    'AUTOMOVIL VERSA',
    'AVION MUSICAL',
    'AVISERO',
    'BAFLE',
    'BAJO',
    'BALANCEADOR',
    'BALANCIN',
    'BALANZA',
    'BALON',
    'BANCA',
    'BANCO',
    'BANDA',
    'BANDA ANCHA',
    'BANDA DE GUERRA',
    'BANDEJA',
    'BANDERA',
    'BANDERIN',
    'BANQUILLO',
    'BANQUITO',
    'BAÑO MARIA',
    'BARANDILLA',
    'BARCO',
    'BAROMETRO',
    'BARRA',
    'BARRA DE EQUILIBRIO',
    'BARRA DE METAL',
    'BARRA INTERACTIVA',
    'BARRAS PARALELAS',
    'BARREDORA',
    'BARRENOS',
    'BASCULA',
    'BASE',
    'BASTIDOR',
    'BASTILLADORA',
    'BATERIA',
    'BATERIA PARA COCINA',
    'BATIDORA',
    'BAUL',
    'BAUMANOMETRO',
    'BERBIQUI',
    'BICICLETA',
    'BICICLETA ESTATICA',
    'BIOLOGIA',
    'BIOMBO',
    'BLUE-RAY',
    'BOBINA',
    'BOCINAS',
    'BOMBA',
    'BOMBO',
    'BONGO',
    'BOOMBOX',
    'BOQUILLA',
    'BORDADORA',
    'BORRADORA DE CASSETTE',
    'BOTADOR',
    'BOTE',
    'BOTE DE NIEVE',
    'BOTELLA',
    'BOTIQUIN',
    'BOYLER',
    'BRACERO',
    'BRAKETS',
    'BRAZO',
    'BRINCOLIN',
    'BROCA',
    'BRUJULA',
    'BRUNIDOR DE MANO',
    'BUDINERA',
    'BURETA',
    'BURO',
    'BURRO',
    'BUSTO',
    'BUTACA',
    'CABALLETE',
    'CABALLO DE PENDULO',
    'CABAÑA',
    'CABECEADOR',
    'CABEZA',
    'CABEZAL',
    'CABINA',
    'CABLE',
    'CACEROLA',
    'CAFETERA',
    'CAIMAN',
    'CAJA',
    'CAJA DE FRACCIONES',
    'CAJA DE SEGURIDAD',
    'CAJITA MAGICA',
    'CAJON',
    'CAJONERA',
    'CALADORA',
    'CALCULADORA',
    'CALDERA',
    'CALEFACTOR',
    'CALENDARIO',
    'CALENTADOR',
    'CALIBRADOR',
    'CALORIMETRO',
    'CAMA',
    'CAMARA',
    'CAMARA DE VIDEO',
    'CAMARA DIGITAL',
    'CAMARA FOTOGRAFICA',
    'CAMARA WEB',
    'CAMILLA',
    'CAMINADORA',
    'CAMION',
    'CAMIONETA',
    'CAMPANA',
    'CAMPANITAS',
    'CANASTA',
    'CANASTILLA',
    'CANDIL',
    'CANGREJERO',
    'CANGREJO',
    'CANTEADORA',
    'CAÑON',
    'CAPSULA',
    'CAPUCHINO',
    'CARD KEY',
    'CARDADORA',
    'CARETA',
    'CARGADOR',
    'CARPA',
    'CARRETE',
    'CARRETILLA',
    'CARRILLON',
    'CARRITO',
    'CARRO',
    'CARRO(ALMACENAMIENTO/COMPUTO/PATIN)',
    'CARRUCEL',
    'CARTUCHO',
    'CASA',
    'CASA CAMPAÑA',
    'CASA DE ALMACENAMIENTO',
    'CASA DE JUEGO',
    'CASA DE MADERA',
    'CASA DE SONIDO',
    'CASA INFANTIL',
    'CASEROLA',
    'CASETA',
    'CASETERA',
    'CASILLERO',
    'CASITA',
    'CASQUILLO',
    'CAUTIN',
    'CAZO',
    'CAZUELA',
    'CCTV',
    'CEGADORA',
    'CELULAR',
    'CENTRAL TELEFONICA',
    'CENTRIFUGA',
    'CENTRO',
    'CENTRO DE COMPUTO',
    'CENTRO DE ENTRETENIMIENTO',
    'CENTRO DE JUGAR',
    'CENTRO DE LAVADO',
    'CENTRO DE TRABAJO',
    'CEPILLADORA',
    'CEPILLADORA DE MADERA',
    'CEPILLO',
    'CEREBRO',
    'CERRADORA',
    'CHAISE',
    'CHALECO',
    'CHALUPA',
    'CHARANGO',
    'CHAROLA',
    'CHASIS',
    'CHECADOR',
    'CIENCUAS DE LA TIERRA',
    'CILINDRO',
    'CILINDRO DE GAS',
    'CIMBRA',
    'CINE',
    'CINTA',
    'CIRCUITO',
    'CIRCUITO CERRADO',
    'CIRCULO',
    'CIZALLA',
    'CLARIN',
    'CLASIFICADOR',
    'CLOSET',
    'COCINA',
    'COCINETA',
    'COJUNTO',
    'COLCHON',
    'COLCHONETA',
    'COLECCION',
    'COLORIMETRO',
    'COLUMNA',
    'COLUMPIO',
    'COMAL',
    'COMBI',
    'COMBO',
    'COMBO INFANTIL',
    'COMBO TRAMPOLIN',
    'COMEDOR',
    'COMODA',
    'COMPAC DISK',
    'COMPAS',
    'COMPENSADOR',
    'COMPENSADOR DE VOLTAJE',
    'COMPONENTE',
    'COMPONIBLE',
    'COMPRENSION LECTORA',
    'COMPRESA',
    'COMPRESIMETRO',
    'COMPRESOR',
    'COMPUTADORA',
    'COMPUTADORAS',
    'COMUNICADOR',
    'COMUNICADOR DEL SISTEMA',
    'CONCENTRADOR',
    'CONDEZADORES',
    'CONDUCIMETRO',
    'CONDUCTOR DE CALOR',
    'CONECTIVIDAD WIFI',
    'CONECTOR',
    'CONGELADOR',
    'CONGO',
    'CONJUNTO',
    'CONJUNTO DE MECANICA',
    'CONJUNTO DE PRACTICAS DE QUIMICA',
    'CONJUNTO EJECUTIVO',
    'CONJUNTO OPERATIVO',
    'CONJUNTO PRESIDENTE',
    'CONJUNTO SECRETARIAL',
    'CONJUNTO SEMIEJECUTIVO',
    'CONJUNTO SUBDIRECTOR',
    'CONJUTO SECRETARIAL',
    'CONMUTADOR',
    'CONO',
    'CONSOLA',
    'CONTADOR',
    'CONTRAGUIRO',
    'CONTRATIEMPO',
    'CONTROL',
    'CONTROL INALAMBRICO',
    'CONTROL REMOTO',
    'CONTROLADOR',
    'CONVERTIDOR',
    'CORAZON',
    'CORNETA',
    'CORRECTOR',
    'CORRECTOR DE VOLTAJE',
    'CORTADOR',
    'CORTAZETAS',
    'CORTINA',
    'CORTINERO',
    'CPU',
    'CREDENZA',
    'CRISTALIZADORES',
    'CROMO',
    'CRONOMETRO',
    'CROSSOVER',
    'CUADRO',
    'CUADRO DE PINTURA',
    'CUBA',
    'CUBETA',
    'CUBIAPRENDO 8-D',
    'CUBIERTA',
    'CUBO',
    'CUCHARA',
    'CUCHILLA',
    'CUELLO',
    'CUENTA REVOLUCIONES',
    'CUERPO',
    'CUJA',
    'CUNA',
    'CUP',
    'DECK',
    'DECODIFICADOR',
    'DENSIMETRO',
    'DESARMADORES',
    'DESBROZADORA',
    'DESCARBONIZADOR',
    'DESCREMADORA',
    'DESECADOR',
    'DESGRANADORA',
    'DESGROZADORA',
    'DESHIDRATADOR',
    'DESMAGNETIZADOR',
    'DESMALEZADORA',
    'DESORILLADORA',
    'DESPACHADOR',
    'DESPENSARIO',
    'DESPENSERO',
    'DESPULPADORA',
    'DESTRUCTORA',
    'DETECTOR',
    'DEVANADORA',
    'DIABLITO',
    'DIABLO',
    'DIABLO DE CARGA',
    'DIADEMA',
    'DIAPASON',
    'DICCIONARIO',
    'DIDACTICAS',
    'DIGITADOR',
    'DILATADOR',
    'DILATOMETRO',
    'DINAMOGRAFO',
    'DINAMOMETRO',
    'DISCO',
    'DISCO DURO',
    'DISPENSADOR',
    'DISPENSARIO',
    'DISPOSITIVO',
    'DISTRIBUIDOR',
    'DISTRIBUIDOR DE RED',
    'DOBLADORA',
    'DOMINO JUMBO',
    'DORSO',
    'DRIVER',
    'DUPLICADOR',
    'DVD',
    'DVR',
    'EATRIN',
    'ECUALIZADOR',
    'ELECTROFONO',
    'ELECTROIMAN',
    'ELECTROSCOPIO',
    'ELECTROSTATICA',
    'ELIMINADOR',
    'ELIPTICA',
    'EMBOBINADOR',
    'EMBUDO',
    'EMBUTIDORA',
    'EMPASTADOR',
    'ENARGOL',
    'ENCICLOPEDIA',
    'ENCUADERNADORA',
    'ENFRIADOR',
    'ENGARGOLADORA',
    'ENGRAPADORA',
    'ENGRASADORA',
    'ENLUCIDORA DE CAMINOS',
    'ENMICADORA',
    'ENTORCHADOS',
    'ENTRETENIMIENTO',
    'EPSON',
    'EQUIPO',
    'EQUIPO  DE DETECCION DE  INCENCIO',
    'EQUIPO DE COMPUTO',
    'EQUIPO DE COMUNICACION',
    'EQUIPO DE CONECTIVIDAD',
    'EQUIPO DE CREDENCIALIZACION',
    'EQUIPO DE HERRAMIENTA',
    'EQUIPO DE MANTENIMIENTO Y SEGURIDAD',
    'EQUIPO DE RADIOTRANSMISION',
    'EQUIPO DE RESPALDO DE ENERGIA',
    'EQUIPO DE SEGMENTACION ELECTRICA',
    'EQUIPO DE SEGURIDAD',
    'EQUIPO DE SONIDO',
    'EQUIPO PARA GIMNASIO',
    'EQUIPO PORTATIL MAC (45 A)',
    'EQUIPO SOBRE PROCESADO DE ALIMENTOS Y SERVICIOS GENERALES',
    'ESCALA',
    'ESCALADOR',
    'ESCALERA',
    'ESCALERILLA',
    'ESCANER',
    'ESCAREADORA',
    'ESCOCHEBRES',
    'ESCOPLO',
    'ESCRIMAN',
    'ESCRITORIO',
    'ESCULTURA',
    'ESCURRIDOR',
    'ESFERA',
    'ESFEROMETRO',
    'ESFIGMOMANOMETRO',
    'ESFUFON',
    'ESMERIL',
    'ESPALDERAS',
    'ESPECTROFOTOMETRO',
    'ESPEJO',
    'ESPIGADORA',
    'ESQUELETO HUMANO',
    'ESQUINERO',
    'EST. INDUSTRIAL',
    'ESTABILIZADOR POSTURAL',
    'ESTACION',
    'ESTADIMETRO',
    'ESTAMPADORA',
    'ESTANTE',
    'ESTEREO',
    'ESTERILIZADOR',
    'ESTEROSCOPIO',
    'ESTRACTOR',
    'ESTROBO',
    'ESTUCHE',
    'ESTUFA',
    'ESTUFON',
    'EVAPORADERA',
    'EXAGONO',
    'EXHIBIDOR',
    'EXPANSION DE VELOCIDAD',
    'EXPANSOR',
    'EXPLORADOR',
    'EXPRESS',
    'EXPRESS VAN',
    'EXPRIMIDOR',
    'EXTENSOR',
    'EXTINTOR',
    'EXTRACTOR',
    'FACTORIMETRO',
    'FAX',
    'FERTILIZADOR',
    'FICHERO',
    'FIGURAS GEOMETRICAS',
    'FILTRO',
    'FLAUTA',
    'FLEXOMETRO',
    'FLOPPY',
    'FOGON',
    'FOLIADOR',
    'FORMADOR DE AISLAMIENTO',
    'FORRADORA BOTONES',
    'FOTOCOPIADORA',
    'FOTOMETRO',
    'FRAGUA',
    'FRECUENCIMETRO',
    'FREGADERO',
    'FREIDORA',
    'FRESADORA',
    'FRIGOBAR',
    'FUENTE',
    'FUENTE DE ALIMENTACION',
    'FUENTE DE CHOCOLATE',
    'FUENTE DE PODER',
    'FUENTE DE POTENCIA',
    'FUMIGADOR',
    'FUNDIDOR',
    'GABETA',
    'GABETERO',
    'GABINETE',
    'GALVANOMETRO',
    'GARABATO',
    'GARBADORA',
    'GARRUCHA',
    'GATEADERO',
    'GATEWAYS',
    'GATO',
    'GAUSOMETRO-DEGAUSOMETRO',
    'GAVETA',
    'GENERADOR',
    'GENERADOR DE LUZ ',
    'GENERADOR ELECTRICO',
    'GENERADOR MONOFASICO',
    'GILLOTINA',
    'GIRO',
    'GIROSCOPIO',
    'GLOBLO',
    'GLOBO TERRAQUEO',
    'GONDOLA',
    'GRABADOR',
    'GRABADOR DE VOZ',
    'GRABADOR DIGITAL',
    'GRABADORA',
    'GRABADORA DE AUDIO',
    'GRABADORA PARA REPORTERO',
    'GRAFICADORA',
    'GRAMIL',
    'GRANADORA',
    'GROWLER EXTERNO ELECTRICO',
    'GUARDA ROPA',
    'GUARDA VISIBLE',
    'GUBIAS',
    'GUIA',
    'GUILLOTINA',
    'GUIÑOL',
    'GUIRO',
    'GUITARRA',
    'GUSANITO',
    'GUSANO',
    'GUSANO DIDACTICO',
    'GUSANO INFANTIL',
    'GUSANO METALICO',
    'GUSANO PARA GATEO',
    'GYM ABDOMINALES',
    'GYM AIRWALKER',
    'GYM BICICLETA',
    'GYM ELIMTICA',
    'GYM PANTORRILLA',
    'GYM PRESS PECHO',
    'GYM PRESS PIERNA',
    'GYM REMO',
    'HAPPY BEAR HOUSE',
    'HEMISFERIO',
    'HERRAMIENTA',
    'HERRAMIENTA DE CARPINTERIA Y EBANISTERIA',
    'HIDROGRAFO',
    'HIDROMETRO',
    'HIDRONEUMATICO',
    'HIELERA',
    'HOME TEATHER',
    'HORNO',
    'IDEAPAD',
    'ILUMINADOR DE TRANSPARENCIAS',
    'IMPLEMENTOS',
    'IMPRESORA',
    'INCUBADORA',
    'INDICADOR',
    'INGLES MARIA PASCUAL',
    'INSECTRONIC',
    'INSTRUMENTOS',
    'INSTRUMENTOS MUSICALES',
    'INTERCOMUNICADOR',
    'INTERFON',
    'INTERNETL',
    'INYECTOR',
    'IODO GIGANTE',
    'IPAD',
    'JERINGA',
    'JOYAS DEL F',
    'JUEGO',
    'JUEGO 4 EN LINEA',
    'JUEGO COMBINADO',
    'JUEGO DE BAF',
    'JUEGO DE BALONCESTO',
    'JUEGO DE BANDA',
    'JUEGO DE BICICLETAS',
    'JUEGO DE COLUMPIO',
    'JUEGO DE CUERDAS PARA VIOLIN',
    'JUEGO DE EQUILIBRIO',
    'JUEGO DE JARDIN',
    'JUEGO DE PATIO',
    'JUEGO DE QUIMICA',
    'JUEGO DE SEÑAL',
    'JUEGO DE TEMATICO',
    'JUEGO DIDACTICO DE ELEMENTOS',
    'JUEGO INFANTIL',
    'JUEGO INTEGRADO',
    'JUEGO INTERACTIVO',
    'JUEGO PARA EXTERIOR',
    'JUEGO RECREA',
    'JUEGO VOLANTE',
    'JUEGOS',
    'JUGUETERO',
    'JUGUETES',
    'JUNGLA DE AROS',
    'KARAOKE',
    'KARDEX',
    'KASPERSKY(ANTIVIRUS)',
    'KINECT',
    'KIT',
    'KIT CREDENCIALIZACION',
    'KIT DE BOCINAS',
    'KIT DE HERRAMIENTAS',
    'KIT DE SEGURIDAD',
    'KIT GIMNASIO',
    'KYOCERA',
    'LABORATORIO',
    'LABORATORIO DE BIOLOGÍA',
    'LABORATORIO DE FÍSICA',
    'LABORATORIO DE QUÍMICA',
    'LABORATORIO DE SONIDO',
    'LAHUD',
    'LAMINADORA',
    'LAMPARA',
    'LAPTOP',
    'LAVABO',
    'LAVADORA',
    'LAVAMANOS',
    'LAVAVAJILLAS',
    'LECTOR',
    'LECTOR DE CD',
    'LECTOR DE CD EXTERNO',
    'LECTOR DE HUELLA DIGITAL',
    'LECTOR EXTERNO',
    'LECTOR OPTICO',
    'LENTE',
    'LEROY',
    'LEVANTA VALVULAS',
    'LEVANTADOR',
    'LIBRERO',
    'LIBRO',
    'LICENCIA OFFICE',
    'LICENCIA WINDOWS',
    'LICUADORA',
    'LIENZO',
    'LIJADORA',
    'LIMA',
    'LIMPIADOR',
    'LINEA DE TIEMPO',
    'LINEA DE TRANSMISION',
    'LITERA',
    'LLAVE',
    'LOCKER',
    'LONCHERA',
    'LOTE',
    'LOVELY HOUSE',
    'LOZA',
    'LUNA',
    'LUPA',
    'LUZ OPTICA DE LABORATORIA',
    'MACBOOK',
    'MALACATES',
    'MALETIN',
    'MAMPARA',
    'MANDOLINA',
    'MANDRIL',
    'MANERAL',
    'MANGLE',
    'MANGO',
    'MANIQUI',
    'MANOMETRO',
    'MAPA',
    'MAPA DE LONA',
    'MAPERO',
    'MAQUINA',
    'MAQUINA CALCULADOR',
    'MAQUINA DE COSER',
    'MAQUINA DE ESCRIBIR',
    'MAQUINA ELECTRICA',
    'MAQUINA TORTILLADORA',
    'MAQUINARIA',
    'MARACAS',
    'MARCADOR',
    'MARCO',
    'MARIMBA',
    'MARMITA',
    'MARTERINA',
    'MARTILLO',
    'MATERIAL DIDACTICO',
    'MATRACA',
    'MATRAZ',
    'MECEDORA',
    'MECHERO',
    'MEDIDOR',
    'MEGAFONO',
    'MEGANOMETRO',
    'MEGAPHONE',
    'MEGATOSCOPIO',
    'MEGGER',
    'MEGOHMETRO',
    'MELODICA',
    'MELODION',
    'MEMORIA',
    'MEMORIA USB',
    'MESA',
    'METALICO',
    'METALOFONO',
    'METROMETRO',
    'METRONOMO',
    'MEZCLADORA',
    'MI SEMBLANZA CIVICA',
    'MI TIENDITA',
    'MICROBUS',
    'MICROCOMPONENTE',
    'MICROFONO',
    'MICROHONDAS',
    'MICROMETRO',
    'MICROSCOPIO',
    'MICROSOFT',
    'MICROTOMO',
    'MIMEOGRAFO',
    'MIMEOMETRO',
    'MIMIOBOARD',
    'MINI',
    'MINI CHEF',
    'MINI FST-GTK',
    'MININOTE',
    'MINISPLIT',
    'MINITOR',
    'MIXER',
    'MOBILIARIO  Y  EQUIPAMIENTO',
    'MOBILIARIO Y EQUIPO DE OFICINA',
    'MOCHILERO',
    'MODELO',
    'MODEM',
    'MODULAR',
    'MODULO',
    'MODULO   SECRETARIAL',
    'MODULO DE COMPUTO',
    'MODULO DE PUERTOS',
    'MODULO EJECUTIVO',
    'MODULO OPERATIVO',
    'MÓDULO OPERATIVO DOS ESPACIOS',
    'MÓDULO OPERATIVO PARA UNA PERSONA',
    'MODULO SECRETARIAL',
    'MODULO SEMIEJECUTIVO',
    'MOLANGO',
    'MOLDE',
    'MOLDE DE COCINA',
    'MOLINETE',
    'MOLINO',
    'MONITOR',
    'MONO',
    'MONTACARGAS',
    'MORTERO',
    'MOSTRADOR',
    'MOTOCICLETA',
    'MOTOGENERADOR CORRIENTE',
    'MOTOR',
    'MOTOSIERRA',
    'MOUSE',
    'MUEBLE',
    'MUEBLE DE COMPUTO',
    'MULTICHEF',
    'MULTICONTACTO',
    'MULTIFUNCIONAL',
    'MULTIMETRO',
    'MULTIPLEXOR',
    'MULTIPROBADOR',
    'MUNDO',
    'MUNDO GIRATORIO',
    'MUSICA',
    'NANO STATION',
    'NICHO',
    'NIVEL',
    'NO-BREAK',
    'NOTEBOOK',
    'NUCLEO DE OBSIDIANA',
    'OCA',
    'OFFICE',
    'OFTALMOSCOPIO',
    'OIDO',
    'OIDO GIGANTE',
    'OJALADORA',
    'OJILLADORA',
    'OJO HUMANO',
    'OLLA',
    'OPRESOR',
    'ORDENADORA',
    'ORGANIZADOR',
    'ORGANO',
    'OSCILOSCOPIO',
    'OTOSCOPIO',
    'OVERLOCK',
    'PAELLERA',
    'PAHIERA',
    'PALA',
    'PALILLOS',
    'PANDERO',
    'PANERA',
    'PANORAMICO',
    'PANTALA DE PROYECCION DE PARED TIPO RETRACTIL',
    'PANTALLA',
    'PAPELETA',
    'PAQUETE',
    'PAQUETE DE AUDIO',
    'PAQUETE DE BIOLOGIA',
    'PAQUETE DE CIENCIAS',
    'PAQUETE DE ELECTRICIDAD Y MECANICA',
    'PAQUETE DE INSTRUMENTAL DE MUSICA',
    'PAQUETE DE LABORATORIO',
    'PAQUETE ENSEÑANZA',
    'PAQUETE MUSICAL',
    'PARCHE PARA ARMAR CAJAS',
    'PARED',
    'PARLANTE',
    'PARRILLA',
    'PASA MANOS',
    'PASTEURIZADORA',
    'PATAS',
    'PATIN',
    'PATÍN HIDRÁULICO',
    'PAVERA',
    'PAYASO',
    'PEACHIMETRO',
    'PEDESTAL',
    'PEGADORA',
    'PEINAZO',
    'PENDULO',
    'PERCHERO',
    'PERFORADORA',
    'PERICO',
    'PERIQUERA',
    'PEROL',
    'PESAS',
    'PIANICA',
    'PIANO',
    'PICADORA',
    'PICKUP',
    'PICO',
    'PILA',
    'PINATARRON',
    'PINTAGENDA',
    'PINTARRAYA',
    'PINTARRON',
    'PINTURA',
    'PIROMETRO',
    'PISCINA',
    'PISTOLA',
    'PIZARRA DE SEGURIDAD',
    'PIZARRA DIGITAL INTERACTIVA',
    'PIZARRON',
    'PIZZARRA  PORTATIL INTERACTIVO',
    'PLACA',
    'PLANCHA',
    'PLANEACION INTERACTIV',
    'PLANERO',
    'PLANOS',
    'PLANTA',
    'PLANTA DE EMERGENCIA',
    'PLANTA DE LUZ',
    'PLANTA DE SOLDAR',
    'PLANTA ELECTRICA',
    'PLANTA P/S',
    'PLATILLO',
    'PLATINA',
    'PLATO',
    'PLUMA',
    'PODADORA',
    'PODER',
    'PODIUM',
    'POLIMETRO',
    'POLIPASTO',
    'PORTA CAJA',
    'PORTA CAÑON',
    'PORTA ELECTRODOS',
    'PORTA GARRAFON',
    'PORTA MAPAS',
    'PORTA MICROFONO',
    'PORTA MURAL',
    'PORTA OBJETOS',
    'PORTA TUBO',
    'PORTABANDERA',
    'PORTABLE',
    'PORTAFOLIO',
    'PORTARREVISTAS',
    'PORTATIL DE GASES',
    'PORTERIA',
    'POSTES PARA VOLEIBOL',
    'POTENCIADOR',
    'POTENCIOMETRO',
    'PRENSA',
    'PRENSA PARA PAPAS',
    'PRESECADOR',
    'PRESENTADOR',
    'PRESENTADOR LASER',
    'PRESURIZADOR',
    'PRIMEROS PASOS',
    'PRISMA',
    'PROBADOR',
    'PROBADOR DE CABLE DE RED',
    'PROCESADOR',
    'PROTECTOR',
    'PROYECTOR',
    'PUENTE',
    'PUERTA',
    'PULIDORA',
    'PULPO',
    'PULSOR',
    'PUNTEADORA',
    'PUNTO',
    'PUNZON',
    'PUPITRE',
    'PURIFICADOR',
    'QUEBRADORA',
    'QUEMADOR',
    'QUIMICA',
    'RACK',
    'RADIADOR',
    'RADIO',
    'RADIOCOMUNICADOR',
    'RADIOGRABADORA',
    'RADIOMETRO',
    'RADIOPLAYER',
    'RAMPA',
    'RAQUETA',
    'RASTRA',
    'RASTRILLO',
    'RAYADOR',
    'REBAJADORA',
    'REBANADOR',
    'RECEPTOR',
    'RECREACION',
    'RECREATIVO',
    'RECTIFICADOR',
    'RED',
    'REFLECTOR',
    'REFRESCADOR',
    'REFRIGERADOR',
    'REFRIGERANTE',
    'REGLA',
    'REGLETAS',
    'REGRESADORA',
    'REGULADOR',
    'RELOJ',
    'REMACHADORA',
    'REMOLQUE',
    'REOSTATO',
    'REPETIDOR',
    'REPISA',
    'REPISERO',
    'REPLICADOR',
    'REPRODUCTOR',
    'REQUINTO',
    'RESBALADILLA',
    'RESISTENCIA',
    'RESONADOR',
    'RESPALDO DE BATERIAS',
    'RESTIRADOR',
    'RESUCITADOR',
    'REVISTERO',
    'REVOLVEDORA',
    'RIEL',
    'RIMA AMPLIADORA',
    'RIOSTUTO',
    'RODILLO',
    'ROMETRO',
    'ROPERO',
    'ROTAFOLIO',
    'ROTOMARTILLO',
    'ROTULADOR',
    'ROUTER',
    'RUEDA',
    'SACABOCADOS',
    'SACAPUNTAS',
    'SALA',
    'SALCHICHA',
    'SALTERIO',
    'SAMSUNG',
    'SARGENTO',
    'SARTEN',
    'SATELITE',
    'SAX',
    'SAXOFON',
    'SAXOR',
    'SAXOR ALTO',
    'SECADORA',
    'SECUENCIOMETRO',
    'SEGADORA',
    'SELECTOR',
    'SELLADORA',
    'SEMBLANZA CIVICA II',
    'SEMBRADORA',
    'SEMILLERO',
    'SENTIDO DEL OIDO',
    'SEÑALAMIENTO',
    'SERPIENTES',
    'SERVIDOR',
    'SET',
    'SET DE DESCANSO',
    'SET DE ESTUDIO DE LAS CIENCIAS DE LA TIERRA',
    'SET DE FISICA',
    'SET DE MECANICA',
    'SET DE TELESCOPIO',
    'SET ELECTROMAGNETISMO',
    'SET INTERACTIVO',
    'SET PARA EL ESTUDIO',
    'SIERRA',
    'SILLA',
    'SILLON',
    'SILVERADO',
    'SIN CLASIFICACION',
    'SINCROGRAFO',
    'SINCRONIZADOR',
    'SINTONIZADOR',
    'SIRENA',
    'SISTEMA',
    'SISTEMA DE ALMACENAMIENTO',
    'SISTEMA DE AUDIO',
    'SISTEMA DE ENERGIA ININTERRUMPIDA',
    'SISTEMA DE INTERCOMUNICACION',
    'SISTEMA DE MICROFONOS',
    'SISTEMA DE SEGURIDAD',
    'SISTEMA DE SONIDO',
    'SISTEMA DE VIDEOVIGILANCIA',
    'SISTEMA DIGITAL DE COMUNICACION',
    'SISTEMA DOLBY DIGITAL',
    'SISTEMA INALAMBRICO',
    'SISTEMA PORTATIL',
    'SOBREHILADORA',
    'SOFA',
    'SOFTWARE',
    'SOLDADORA',
    'SONIDO',
    'SONOMETRO',
    'SOPLADORA',
    'SOPORTE',
    'SOUND BAR',
    'STAND',
    'STEREO',
    'STOCK',
    'SUAJADORA',
    'SUBE Y BAJA',
    'SUBWOOFER',
    'SUMADORA',
    'SUPRESOR',
    'SURCADORA',
    'SWITCH',
    'TABIQUERA',
    'TABLA',
    'TABLERO',
    'TABLERO ALFABETICO',
    'TABLERO DE BASQUETBOL',
    'TABLET',
    'TABLON',
    'TABURETE',
    'TACOMETRO',
    'TALADRO',
    'TAMBOR',
    'TANQUE',
    'TAPETE',
    'TAQUIMETRO',
    'TARIMA',
    'TARJA',
    'TARJETA',
    'TARJETERO',
    'TAROLA',
    'TARRAJA',
    'TAZA',
    'TAZA GIRATORIA',
    'TAZA LOCA',
    'TEATRIN',
    'TEATRO',
    'TEATRO DIGITAL',
    'TEATRO EN CASA',
    'TEATRO INFANTIL',
    'TECHADO',
    'TECLADO',
    'TEJEDORA',
    'TELEFONO',
    'TELESCOPIO',
    'TELESFERICO',
    'TELEVISION',
    'TEPONASTLE',
    'TERMINAL',
    'TERMINAL DE HUELLA',
    'TERMO',
    'TERMOGRAFO',
    'TERMOMETRO',
    'TIENDITA',
    'TIJERA',
    'TIMBALES',
    'TIMBRE',
    'TINA',
    'TINACO',
    'TITAN',
    'TITERES',
    'TOBOGAN',
    'TOCADISCO',
    'TOCADOR',
    'TOLOLOCHE',
    'TORNAMESA',
    'TORNILLO',
    'TORNO',
    'TORQUIMETRO',
    'TORRE',
    'TORSO HUMANO',
    'TORTILLERA',
    'TORTON',
    'TOSTADOR',
    'TRABADOR',
    'TRACTOR',
    'TRAFITAMBO',
    'TRAMPOLIN',
    'TRANCEPTOR',
    'TRANSFORMADOR',
    'TRANSMISOR',
    'TRAZADOR',
    'TRIANGULO',
    'TRICORDIOS',
    'TRILLADORA',
    'TRIPIE',
    'TRISCADOR',
    'TRITURADORA',
    'TROMBON',
    'TROMPETA',
    'TROMPO',
    'TROQUELADORA',
    'TROZADORA',
    'TUBA',
    'TUBO',
    'TUNEL DE GUSANO',
    'TUNGAR',
    'TURBINA',
    'UNIDAD',
    'UNIDAD DE ALMACENAMIENTO',
    'UNIDAD DE DISCO',
    'UNIDAD DENTAL',
    'UNIDAD OPTICA',
    'VAJILLA',
    'VALVULA',
    'VAPORERA',
    'VASO',
    'VENTILADOR',
    'VERNIER',
    'VERONA',
    'VERTEDEROS',
    'VESTIDURAS',
    'VIBRADOR',
    'VIBROGRAFO',
    'VIDEO',
    'VIDEOCASETERA',
    'VIDEOGRABADORA',
    'VIDEOPRODUCTOR',
    'VIDEOSCOPIO',
    'VIDEOTECA',
    'VIGA',
    'VIGA DE EQUILIBRIO',
    'VIHUELA',
    'VIOLIN',
    'VIOLONCELLO',
    'VIOPROYECT',
    'VISCOSIMETRO',
    'VITRINA',
    'VITROLERO',
    'VOLANTIN',
    'VOLTAMETRO',
    'VOLTAMPERIMETRO',
    'VOLTIMETRO',
    'WALKIE-TALKIE',
    'WATTHORIMETRO',
    'WATTIMETRO',
    'WEBCAM',
    'WECHSLER',
    'WINDOWS 8 PRO CAJA',
    'WOOFER',
    'XEROX',
    'XILOFONO',
    'YAMAHA',
    'YUNQUE'
  ]

  callback(asset)
}



export default {
  Revisions,
  revisionCheck,
  levelsCheck,
  areasCheck,
  assetsCheck,
  responsableCheck,
  assets
}
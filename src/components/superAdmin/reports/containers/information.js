import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { CardColumns, Card, CardHeader, CardBody } from 'reactstrap';
import { firestore } from 'firebase'

const line = (name) => ( {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: name,
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40,45,32,11,102,33]
    }
  ]
});

const bar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const doughnut = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};

const radar = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81, 56, 55, 40]
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100]
    }
  ]
};


const polar = {
  datasets: [{
    data: [
      11,
      16,
      7,
      3,
      14
    ],
    backgroundColor: [
      '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#E7E9ED',
      '#36A2EB'
    ],
    label: 'My dataset' // for legend
  }],
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue'
  ]
};

class Charts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: '',
      assets: '',
      countAsset1: '',
      countAsset2: '',
      refresh: '',
      ready: false
    }

  }
  componentWillMount() {

    let getAssetMueble = (callback) => {
      let assetsTMP = []
      firestore().collection('assets').where("kindOfGood", "==", "MUEBLES").orderBy("creationDate", "desc").onSnapshot(snap => {
        snap.forEach(asset => {
          assetsTMP.push({ ...asset.data(), id: asset.id })
        })
        this.state.countAsset1 = assetsTMP.length
        this.setState({ assets: assetsTMP, countAsset1: assetsTMP.length })
        console.log(assetsTMP);
        if (!assetsTMP) {
          callback(`No hay informacion por mostrar`, [])
        } else {
          callback(null, assetsTMP)
        }
      })
    }

    let getAssetInmueble = (data, callback) => {
      let assetsTMP2 = []
      firestore().collection('assets').where("kindOfGood", "==", "INMUEBLES").orderBy("creationDate", "desc").onSnapshot(snap => {
        snap.forEach(asset => {
          assetsTMP2.push({ ...asset.data(), id: asset.id })
        })
        this.setState({ refresh: '', ready: true, countAsset2: assetsTMP2.length })
        if (!assetsTMP2) {
          callback(`No se encontro informacion`)
        } else {
          callback(null, {
            count1: data,
            count2: assetsTMP2,
          })
        }
      })
    }

    getAssetMueble((err, data) => {
      if (err) {
        return console.log(err);
      } else {
        getAssetInmueble(data, (err, dataGeneral) => {
          if (err) {
            return console.log(err);
          }
          let pie = {
            labels: ['Muebles', 'Inmuebles'],
            datasets: [{
              data: [dataGeneral.count1.length, dataGeneral.count2.length],
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
              ]
            }]
          };
          this.setState({ data: pie,ready:true })
        })
      }
    })
  }


  render() {
    let { data, countAsset2, ready } = this.state
    if (!ready) return (<div>No </div>)
    return (
      <div className="animated fadeIn">
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-header">
              Activos de : <strong> SEIEM</strong>
            </div>
            <div className="card-body">
              <div className="chart-wrapper">
                <Pie data={data} />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <strong>Tiempo de inspección</strong>
            </div>
            <div className="card-body">
              <div className="chart-wrapper">
                <Line data={data}
                      options={{
                    maintainAspectRatio: false
                  }}
                />
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              Bar Chart
              <div className="card-actions">
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar}
                     options={{
                  maintainAspectRatio: false
                }}
                />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Doughnut Chart
              <div className="card-actions">
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Doughnut data={doughnut}/>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Radar Chart
              <div className="card-actions">
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Radar data={radar}/>
              </div>
            </CardBody>
          </Card>
         
          <Card>
            <CardHeader>
              Polar Area Chart
              <div className="card-actions">
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Polar data={polar}/>
              </div>
            </CardBody>
          </Card> 
        </div>
      </div>
    )
  }
}

export default Charts;

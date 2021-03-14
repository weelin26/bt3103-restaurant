import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            results: [],
            labels: [],
            datasets: [{ 
                data: [],
                label: "west",
                borderColor: "#3e95cd",
                fill: false
              }, { 
                data: [],
                label: "national",
                borderColor: "#8e5ea2",
                fill: false
              }, { 
                data: [],
                label: "east",
                borderColor: "#3cba9f",
                fill: false
              }, { 
                data: [],
                label: "central",
                borderColor: "#e8c3b9",
                fill: false
              }, { 
                data: [],
                label: "south",
                borderColor: "#c45850",
                fill: false
              }, { 
                data: [],
                label: "north",
                borderColor: "Orange",
                fill: false
              }
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly(By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            this.results = response.data.items
            for (let item in this.results) {
   
                this.datacollection.labels.push(this.results[item]['timestamp']) //x-axis 
                var readings = this.results[item]['readings']
                var psi = readings['psi_twenty_four_hourly']
         
                this.datacollection.datasets.forEach(set => {
                    var place = set.label
                    set.data.push(psi[place])
  
                })
                               
            }        
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}
import { Bar } from 'vue-chartjs'
import database from "../../firebase.js"

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "",
                backgroundColor: ["LightCoral", "Orange", "Pink", "Teal", "Blue", "Purple"],
                data: [0,0,0,0,0,0]
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of Each Dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }
                 }],
                 
            }
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('menu').get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
          this.datacollection.labels.push(doc.data().name)
        })
      })
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
            Object.entries(doc.data()).forEach(item => {
                if (item[1] > 0) {
                    for (var i = 0; i < this.datacollection.labels.length; i++) {
                        if (item[0] === this.datacollection.labels[i]) {
                            this.datacollection.datasets[0].data[i] += item[1]
                            break
                        }
                    }
                }
                
            })
        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  },
  mounted () {
    this.renderChart(this.datacollection, this.options)
  }
}

<template>
    <ul>
      <li>       
        <div v-for= "(dish, index) in datapacket[1]" :key= "index">
            <span> {{ dish[0] }}: {{ dish[1] }} </span>
            <p><input v-bind:id= "index" placeholder=0 type="number" min="0"></p>      
        </div>
        <button v-on:click= "updateOrder">Update Order</button>    
      </li>
    </ul>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            datapacket: [],
            subarray: [], //datapacket[1] => orders without doc id
        };
    },
    methods: {
        fetchItems: function() {
            const document_id = this.$route.params.id;
            this.datapacket[0] = [document_id];
            database
                .collection('orders')
                .doc(document_id)
                .get()
                .then((snapshot) => Object.entries(snapshot.data()).forEach(item => this.subarray.push(item)));           
            this.datapacket[1] = this.subarray;
        },
        updateOrder: function() {
            let doc_id = this.datapacket[0][0]; 
            let copy = new Object();
            this.subarray.forEach(item => copy[item[0]] = item[1]); //copy of subarray (with all the orders)
    
            for (var i = 0; i < this.subarray.length; i++) {
                var newQty = document.getElementById(i).value
                if (newQty === "") { //no new value
                    continue;
                } else {
                    copy[this.subarray[i][0]] = Number(newQty); //update new value
                }
            }

            database.collection('orders').doc(doc_id).set(copy).then(() => this.$router.push('orders'));
        }
    },
    created() {
        this.fetchItems();
    }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}

button {
  width: 100px;
  height: 40px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>


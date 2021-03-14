<template>
  <div id="itemsList">
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/orders" exact>Orders</router-link></li>
      <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <ul>
      <li v-for="item in items" :key="item.id">
        <span id="itemName"><b>{{ item.name }}</b></span><br>
        <img v-bind:src="item.imageURL" />
        <p id="price">${{ item.price }}</p>
        <qty-ctr v-bind:item="item" v-on:counter="onCounter"></qty-ctr>
      </li>
    </ul>
    <basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></basket>
  </div>
</template>

<script>
import QuantityCounter from "./QuantityCounter.vue";
import Basket from "./Basket.vue";
import database from "../firebase.js";

export default {
  data() {
    return {
      itemsSelected: [],
      items: [],
    };
  },
  components: {
    'qty-ctr': QuantityCounter,
    'basket': Basket,
  },
  methods: {
    fetchItems:function(){
      database.collection('menu').get().then(snapshot=>{
        snapshot.docs.forEach(doc=>{
          this.items.push(doc.data())
        })    
      })   
    },
    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          var present = false; //to indicate if item is present in basket
          if (item_name === item.name && count > 0) {
            // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
            this.itemsSelected.splice(i, 1, [item.name, count, item.price]);
            present = true;
            break;
          } else if (item_name === item.name && count === 0) {
            // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
            this.itemsSelected.splice(i, 1);
            present = true;
            break;
          }
        }
        if (!present) {
          // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
          this.itemsSelected.push([item.name, count, item.price]);
        }
      }
      //for items that have 0 count, add that to itemsSelected
      const is_length = this.itemsSelected.length;
      for (let i = 0; i < this.items.length; i++) {
        const name = this.items[i].name;
        const price = this.items[i].price;
        for (let c = 0; c < is_length; c++) {
          const itemSelected_name = this.itemsSelected[c][0];
          if (itemSelected_name === name) { //item has been in order already
            break;
          } else if ((itemSelected_name !== name) && (c + 1 == is_length)) { //reached the end of the itemsSelected 
            this.itemsSelected.push([name, 0, price]); //update itemsSelected with item that has 0 count
          }
        }
      }
    }
  },
  created(){
    this.fetchItems()
  },
};
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 300px; 
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
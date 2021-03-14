<template>
  <div id="shoppingBasket">
    Menu:
    <ul>
      <li v-for="item in itemsSelected" :key="item[0]">
        <span>{{ item[0] }} x {{ item[1] }}</span>
      </li>
    </ul>
    <button id="totalBtn" v-on:click = "findTotal(),sendOrder()">
      Calculate Total
    </button>
    <p v-show="showPrice">Subtotal: ${{ subTotal }}<br><br>Grand Total: ${{ grandTotal }}</p>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      showPrice: false,
      subTotal: 0,
      grandTotal: 0,
    };
  },
  props: {
    itemsSelected: Array,
  },
  methods: {
    findTotal: function() {
      this.subTotal = 0;
      for (var i = 0; i < this.itemsSelected.length; i++) {
        var item = this.itemsSelected[i];
          this.subTotal += item[1] * item[2];
      }
      this.showPrice = true;
    },
    sendOrder: function() {
      let orders = new Object()
      this.itemsSelected.forEach(item => orders[item[0]] = item[1])
      database.collection('orders').add(orders).then(() => location.reload());
    }
  },
  watch: {
    subTotal: function(value) {
      this.subTotal = value;
      this.grandTotal = this.subTotal * 1.07;
      this.grandTotal = this.grandTotal.toFixed(2);
    }
  }
};
</script>

<style scoped>
#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
  font-size: 25px;
}

#totalBtn {
  font-size: 25px;
  background-color: pink;
}
</style>

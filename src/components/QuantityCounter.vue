<template>
  <div>
    <button id="dec" v-on:click= "decrease">-</button>
    <span id="ctr"> {{ counter }} </span>
    <button id="inc" v-on:click= "increase">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increase: function () {
      if (this.counter == 10) {
        alert("You cannot buy more than 10 items.");
      } else {
        this.counter++;
      }
      this.$emit('counter', this.item, this.counter);
    },
    decrease: function () {
      if (this.counter > 0) {
        this.counter--;
      }
      this.$emit('counter', this.item, this.counter);
    },
  },
  props: {
    item: Object
  }
};
</script>

<style scoped>
#ctr {
  font-size: 40px;
}

button {
  text-align: center;
  font-size: 30px;
  width: 50px;
  height:50px;
  color: black;
  background-color: pink;
}
</style>
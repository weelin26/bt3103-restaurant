<template>
  <div id="app">
    <h1>WL's Zi Char</h1>
    <router-view></router-view> 
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style scoped>
h1 {
  font-size: 40px;
  text-align: center;
  background: lightsalmon;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

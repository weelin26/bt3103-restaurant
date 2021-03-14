<template>
    <div class="chart">
        <h1>Bar Chart</h1>
        <chart></chart>
    </div>
</template>

<script>
import Chart from "./BarChart.js";

export default {
  components: {
    Chart
  }
};
</script>

<style>
h1 {
  font-size: 40px;
  text-align: center;
  background: lightsalmon;
}
</style>
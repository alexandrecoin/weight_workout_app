<template>
  <div class="hello">{{ weights }}</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Weights',
  data() {
    return {
      weights: [],
    };
  },
  methods: {
    async getWeights() {
      const response = await axios.get(
        `http://localhost:6789/users/5e33f8ff97e8a70ec123e31a/weights`,
      );
      this.weights = response.data;
    },
  },
  mounted() {
    this.getWeights();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

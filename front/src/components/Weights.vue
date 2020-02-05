<template>
  <q-page class="flex flex-center">
    <ul v-for="(weight, index) in weights" v-bind:key="index">
      <li>{{ weight.value }}</li>
    </ul>
  </q-page>
</template>

<style></style>

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
        'http://localhost:6789/users/5e33f8ff97e8a70ec123e31a/weights',
      );
      this.weights = response.data;
    },
  },
  mounted() {
    this.getWeights();
  },
};
</script>

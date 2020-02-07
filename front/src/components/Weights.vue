<template>
  <q-page class="flex flex-center">
    <q-table title="Weights" :data="weights" :columns="columns" row-key="_id" />
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
      columns: [
        { name: 'value', label: 'Value', field: 'value' },
        { name: 'createdAt', label: 'Date', field: 'createdAt' },
      ],
    };
  },
  methods: {
    async getWeights() {
      const response = await axios.get(
        'http://localhost:6789/users/5e33f8ff97e8a70ec123e31a/weights',
      );
      this.weights = response.data;
      this.weights.map(
        (weight) =>
          (weight.createdAt = weight.createdAt.toString().slice(0, 10)),
      );
    },
  },
  mounted() {
    this.getWeights();
  },
};
</script>

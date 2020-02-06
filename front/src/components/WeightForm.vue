<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        type="number"
        v-model="weight"
        label="Your weight *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your weight',
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<style></style>

<script>
import axios from 'axios';
export default {
  name: 'WeightForm',
  data() {
    return {
      weight: null,
    };
  },

  methods: {
    async onSubmit() {
      // TODO Change route to get userId and remove from this.weight object
      this.weight = {
        userId: '5e33f8ff97e8a70ec123e31a',
        value: 58,
      };
      const response = await axios.post(
        'http://localhost:6789/weights/add',
        this.weight,
      );
      if (response.status == 201) {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted',
        });
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Impossible to record your weight. Please try again',
        });
      }
    },

    onReset() {
      this.weight = null;
    },
  },
};
</script>

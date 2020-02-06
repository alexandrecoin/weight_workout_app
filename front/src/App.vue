<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Weight tracking app
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list> </q-list>
    </q-drawer>

    <q-page-container>
      <WeightForm />
      <Weights />
    </q-page-container>
  </q-layout>
</template>

<script>
import Weights from './components/Weights.vue';
import WeightForm from './components/WeightForm';

export default {
  name: 'LayoutDefault',

  components: {
    Weights,
    WeightForm
  },

  data() {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>

<style></style>

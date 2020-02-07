import Vue from 'vue';

import './styles/quasar.scss';
import '@quasar/extras/material-icons/material-icons.css';
import { Quasar, QTable, Notify } from 'quasar';

Vue.use(Quasar, {
  config: {
    notify: {
      /* Notify defaults */
    },
  },
  components: {
    QTable
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {
    Notify,
  },
});

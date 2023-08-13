import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VuetifyDateAdapter } from 'vuetify/labs/date/adapters/vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    date: {
      adapter: VuetifyDateAdapter,
    },
  });
  

  nuxtApp.vueApp.use(vuetify);
});


import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import App from "./App.vue";
import store from "@/store";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  vuetify,
  store,
  render: (h) => h(App),
});

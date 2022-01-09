<template>
  <v-app>
    <header-vue />
    <list-vue />
    <snackbar />
  </v-app>
</template>

<script>
import HeaderVue from "./components/Header.vue";
import ListVue from "./components/List.vue";
import Snackbar from "../components/Snackbar.vue";

export default {
  name: "App",
  components: {
    HeaderVue,
    ListVue,
    Snackbar,
  },
  created() {
    this.$store.dispatch("loadAuths");
  },
};
</script>

<style lang="scss">
html {
  width: 500px;
  height: 500px;
}

.v-application {
  p {
    margin: 0;
  }
}
</style>

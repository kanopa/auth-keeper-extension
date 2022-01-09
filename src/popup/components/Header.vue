<template>
  <header>
    <v-btn @click="addItem" small color="primary" elevation="2">Add new</v-btn>
    <h2>Auth keeper</h2>
  </header>
</template>

<script>
export default {
  methods: {
    addItem() {
      this.$store.dispatch("addNewAuth");
    },
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #dbdbdb;

  h2 {
    margin-left: 1rem;
  }
}
</style>

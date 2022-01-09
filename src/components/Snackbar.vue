<template>
  <v-snackbar
    outlined
    v-model="$store.getters.getSnackbar.isOpen"
    :timeout="3000"
    color="primary"
  >
    {{ $store.getters.getSnackbar.message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        @click="$store.dispatch('addSnackbar', { isOpen: false, message: '' })"
        color="blue"
        text
        v-bind="attrs"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {};
</script>

<style></style>

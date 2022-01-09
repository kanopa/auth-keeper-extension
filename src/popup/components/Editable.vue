<template>
  <v-chip style="flex: 0 0 auto" color="primary" outlined>
    <v-icon left> mdi-fire </v-icon>
    <p ref="editable" contenteditable v-on="listeners" />
  </v-chip>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.onInput };
    },
  },
  emits: ["input"],
  watch: {
    value(current) {
      if (!this.$refs.editable.innerText) {
        this.$refs.editable.innerText = current;
      }
    },
  },
  mounted() {
    this.$refs.editable.innerText = this.value;
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.innerText);
    },
  },
};
</script>
<style scoped lang="scss">
p {
  outline: none;
  margin: 0;
  min-width: 15px;
}
</style>

<template>
  <v-expansion-panels multiple>
    <v-expansion-panel v-for="auth in auths" :key="auth.id">
      <list-item
        :item="auth"
        @on-changed="changeItem"
        @on-remove="removeItem"
      />
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters } from "vuex";
import ListItem from "./ListItem.vue";

export default {
  components: { ListItem },
  computed: {
    ...mapGetters({
      auths: "getAuths",
    }),
  },
  methods: {
    changeItem(value) {
      this.$store.dispatch("changeAuth", value);
    },
    removeItem(value) {
      this.$store.dispatch("removeAuth", value);
    },
  },
};
</script>

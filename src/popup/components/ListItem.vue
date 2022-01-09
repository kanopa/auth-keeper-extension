<template>
  <div>
    <v-expansion-panel-header @dblclick="addRequest">
      <editable v-model="auth.name" @input="changeItemName" />
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form ref="form" class="wrapper">
        <div class="content-wrapper">
          <div>
            <v-text-field
              :rules="[rules.required]"
              v-model="auth.sendTo"
              @input="changeItem"
              dense
              label="Send to"
              hide-details
            ></v-text-field>
          </div>
          <div class="auth-field">
            <v-text-field
              class="mr-2"
              :rules="[rules.required]"
              v-model="auth.email"
              @input="changeItem"
              label="Email"
              hide-details
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              v-model="auth.password"
              @input="changeItem"
              label="Password"
              hide-details
            ></v-text-field>
          </div>
        </div>
        <div class="action-field">
          <v-btn @click="addRequest" small color="primary" elevation="2">
            <v-icon left> mdi-send </v-icon>
            Send</v-btn
          >
          <v-btn @click="removeItem" small color="primary" elevation="2">
            <v-icon left>mdi-close</v-icon>
            Remove</v-btn
          >
        </div>
      </v-form>
    </v-expansion-panel-content>
  </div>
</template>

<script>
import axios from "axios";
import Editable from "./Editable.vue";

export default {
  components: {
    Editable,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    item() {
      this.auth = { ...this.item };
    },
  },
  emits: ["on-changed", "on-remove"],
  mounted() {
    this.auth = { ...this.item };
  },
  data: () => ({
    auth: {},
    rules: {
      required: (value) => !!value || "Required field",
    },
  }),
  methods: {
    changeItemName(value) {
      this.auth.name = value;
      console.log(this.auth);
      this.changeItem();
    },
    changeItem() {
      this.$emit("on-changed", this.auth);
    },
    removeItem() {
      this.$emit("on-remove", this.auth);
    },
    async addRequest() {
      if (!this.$refs.form.validate()) {
        this.$store.dispatch("addSnackbar", {
          isOpen: true,
          message: "All data not entered",
        });
        return;
      }
      try {
        const { data } = await axios({
          method: "post",
          url: this.auth.sendTo,
          data: {
            email: this.auth.email,
            password: this.auth.password,
          },
        });
        await navigator.clipboard.writeText(`Bearer ${data.access_token}`);
        this.$store.dispatch("addSnackbar", {
          isOpen: true,
          message: `Token ${this.auth.name} copied to clipboard`,
        });
      } catch (e) {
        this.$store.dispatch("addSnackbar", {
          isOpen: true,
          message: e.response?.data.message ?? "Something went wrong",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex: 1;
  .content-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 0.5rem;
    margin-right: 1.25rem;

    .auth-field {
      display: flex;
      flex: 1;
    }
  }

  .action-field {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
}
</style>

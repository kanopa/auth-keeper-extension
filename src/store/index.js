import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

const state = {
  auths: [],
  snackbar: {
    isOpen: false,
    message: "",
  },
};

const mutations = {
  addNew(state) {
    state.auths.unshift({
      id: uuidv4(),
    });
  },
  load: (state, payload) => (state.auths = payload),
  setSnack: (state, snackbar) => (state.snackbar = { ...snackbar }),
  change(state, payload) {
    const index = state.auths.findIndex(({ id }) => payload.id === id);
    Object.assign(state.auths[index], payload);
    chrome.storage.sync.set({ auths: state.auths });
  },
  remove(state, payload) {
    const index = state.auths.findIndex(({ id }) => payload.id === id);
    state.auths.splice(index, 1);
    chrome.storage.sync.set({ auths: state.auths });
  },
};

const getters = {
  getAuths: (state) => state.auths,
  getSnackbar: (state) => state.snackbar,
};

const actions = {
  addNewAuth: ({ commit }) => commit("addNew"),
  addSnackbar: ({ commit }, snackbar) => commit("setSnack", snackbar),
  changeAuth: ({ commit }, value) => commit("change", value),
  removeAuth: ({ commit }, value) => commit("remove", value),
  loadAuths({ commit }) {
    chrome.storage.sync.get("auths", (data) => {
      commit("load", data?.auths ?? []);
    });
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

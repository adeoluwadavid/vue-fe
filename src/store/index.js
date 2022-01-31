import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    message: null,
    jobs: null,

    editJob: null,

    signIn: false,

    title: null,
    technologies: null,
    budget: null,
    description: null,
    contact_email: null,
  },
  mutations: {
    setFirstName(state, value) {
      state.firstName = value;
    },
    setLastName(state, value) {
      state.lastName = value;
    },
    setUsername(state, value) {
      state.username = value;
    },
    setPassword(state, value) {
      state.password = value;
    },
    setMessage(state, value) {
      state.message = value;
    },
    setJob(state, value) {
      state.token = value;
    },

    setTitle(state, value) {
      state.title = value;
    },
    setTechnologies(state, value) {
      state.technologies = value;
    },
    setBudget(state, value) {
      state.budget = value;
    },
    setDescription(state, value) {
      state.description = value;
    },
    setContactEmail(state, value) {
      state.contact_email = value;
    },
  },
  actions: {},
  modules: {},
});

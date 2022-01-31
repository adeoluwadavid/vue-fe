<template>
  <div class="app">
    <div class="custom">
      <span v-if="signIn === true"
        ><router-link to="/addjobs" class="text underline"
          >Add Jobs</router-link
        ></span
      >
      <span v-if="signIn === true"
        ><router-link to="/dashboard" class="text underline"
          >All Jobs</router-link
        ></span
      >
      <span v-if="signIn === true">
        <router-link
          to="/login"
          @click.native="removeItemFromStorage"
          class="text underline"
          >Sign Out</router-link
        >
      </span>
    </div>
    <div class="app2">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    signIn: {
      get() {
        return this.$store.state.signIn;
      },
    },
  },
  methods: {
    removeItemFromStorage() {
      this.$store.state.signIn = false;
      localStorage.removeItem("id");
      localStorage.removeItem("token");
    },
  },
};
</script>
<style scoped>
.app {
  background-image: url("./assets/showcase.jpg");
  opacity: 0.9;
  min-height: 100vh;
  width: 100%;
  color: white;
  padding: 1.3rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.app2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
.custom {
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}
</style>

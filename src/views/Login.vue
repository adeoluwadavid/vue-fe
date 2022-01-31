<template>
  <div>
    <h1 class="text-xl text-center mb-8">Please Sign In</h1>
    <form class="flex flex-col" @submit="handleSubmit">
      <div class="mb-8 flex justify-end">
        <label class="self-center" for="">Username:</label>
        <input
          class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
          v-model="username"
          type="text"
        />
      </div>
      <div class="mb-8 flex justify-end">
        <label class="self-center" for="">Password:</label>
        <input
          class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
          v-model="password"
          type="text"
        />
      </div>
      <div class="mb-4 self-center text-black">
        <input
          class="border-solid border-2 border-black p-1 rounded-xl"
          type="submit"
          value="Sign In"
        />
      </div>
    </form>
    <div class="flex flex-col items-center">
      <p>Don't have an account ?</p>
      <p class="underline text-center">
        <router-link to="/">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import util from "../util";
export default {
  name: "Login",
  props: {},
  computed: {
    username: {
      get() {
        return this.$store.state.username;
      },
      set(value) {
        this.$store.commit("setUsername", value);
      },
    },
    password: {
      get() {
        return this.$store.state.password;
      },
      set(value) {
        this.$store.commit("setPassword", value);
      },
    },
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      let response = await axios.post(util.port + "login", {
        username: this.$store.state.username,
        password: this.$store.state.password,
      });

      if (response.data.username && response.data.id) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        setTimeout(() => {
          this.$router.push("Dashboard");
        }, 500);
      }
      this.$store.state.signIn = true;
      this.$store.state.username = null;
      this.$store.state.password = null;
    },
  },
};
</script>

<template>
  <div class="">
    <h1 class="text-3xl text-center mb-8">Welcome to Job Connect</h1>
    <form class="flex flex-col" @submit="handleSubmit">
      <div class="mb-8 flex justify-end">
        <label class="self-center">First Name: </label>
        <input
          class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
          v-model="firstName"
          type="text"
          required
        />
      </div>
      <div class="mb-8 flex justify-end">
        <label class="self-center">Last Name: </label>
        <input
          class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
          v-model="lastName"
          type="text"
          required
        />
      </div>
      <div class="mb-8 flex justify-end">
        <label class="self-center">Username: </label>
        <input
          class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
          v-model="username"
          type="text"
          required
        />
      </div>
      <div class="mb-8 flex justify-end">
        <label class="self-center">Password: </label>
        <input
          class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
          v-model="password"
          type="password"
          required
        />
      </div>
      <div class="mb-4 self-center text-black">
        <input
          class="border-solid border-2 border-black p-1 rounded-xl"
          type="submit"
          value="Sign Up"
        />
      </div>
    </form>
    <div class="flex flex-col items-center">
      <div>{{ message }}</div>

      <div>
        <p>Already Have an account ?</p>
        <p class="underline text-center">
          <router-link to="/login">Sign In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import util from "../util";
export default {
  name: "Register",

  computed: {
    firstName: {
      get() {
        return this.$store.state.firstName;
      },
      set(value) {
        this.$store.commit("setFirstName", value);
      },
    },
    lastName: {
      get() {
        return this.$store.state.lastName;
      },
      set(value) {
        this.$store.commit("setLastName", value);
      },
    },
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
    message: {
      get() {
        return this.$store.state.message;
      },
      set(value) {
        this.$store.commit("setMessage", value);
      },
    },
  },
  props: {},
  components: {},
  methods: {
    async handleSubmit(e) {
      e.preventDefault();

      let response = await axios.post(util.port + "register", {
        firstName: this.$store.state.firstName,
        lastName: this.$store.state.lastName,
        username: this.$store.state.username,
        password: this.$store.state.password,
      });

      if (response.data.message === "Registration successful") {
        this.$store.state.message = response.data.message;
        setTimeout(() => {
          this.$router.push("Login");
        }, 500);
      }
      this.$store.state.firstName = null;
      this.$store.state.lastName = null;
      this.$store.state.username = null;
      this.$store.state.password = null;
    },
  },
};
</script>

<template>
  <div class="">
    <h3 class="text-xl text-center mb-8">Add Jobs</h3>
    <form @submit="handleAddJobs" class="text-black flex flex-col justify-end">
      <div class="mb-2 flex justify-end">
        <label class="text-white self-center" for="">Title: </label>
        <input
          class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
          type="text"
          v-model="title"
          required
        />
      </div>
      <div class="mb-2 flex justify-end">
        <label class="text-white self-center" for="">Technologies:</label>
        <input
          class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
          type="text"
          v-model="technologies"
          required
        />
      </div>
      <div class="mb-2 flex justify-end">
        <label class="text-white self-center" for="">Budget: </label>
        <input
          class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
          type="number"
          v-model="budget"
          required
        />
      </div>
      <div class="mb-2 flex justify-end">
        <label class="text-white self-center" for="">Email: </label>
        <input
          class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
          type="email"
          v-model="contact_email"
          required
        />
      </div>
      <div class="mb-2 flex justify-end">
        <label class="text-white self-center" for="">Description:</label>
        <textarea
          class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
          name=""
          id=""
          cols="30"
          rows="5"
          v-model="description"
          required
        ></textarea>
      </div>

      <div class="text-center mb-6">
        <input
          class="border-solid border-2 border-black p-1 rounded-xl cursor-pointer"
          type="submit"
          name=""
          id=""
          value="Submit"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import util from "../util";
import getJobs from "../api/api";
export default {
  name: "AddJobs",
  props: {},
  computed: {
    title: {
      get() {
        return this.$store.state.title;
      },
      set(value) {
        this.$store.commit("setTitle", value);
      },
    },
    technologies: {
      get() {
        return this.$store.state.technologies;
      },
      set(value) {
        this.$store.commit("setTechnologies", value);
      },
    },
    budget: {
      get() {
        return this.$store.state.budget;
      },
      set(value) {
        this.$store.commit("setBudget", value);
      },
    },
    description: {
      get() {
        return this.$store.state.description;
      },
      set(value) {
        this.$store.commit("setDescription", value);
      },
    },
    contact_email: {
      get() {
        return this.$store.state.contact_email;
      },
      set(value) {
        this.$store.commit("setContactEmail", value);
      },
    },
  },
  methods: {
    async handleAddJobs(e) {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const tokenId = localStorage.getItem("id");

      let response = await axios.post(
        util.port + `postjobs/${tokenId}`,
        {
          title: this.$store.state.title,
          technologies: this.$store.state.technologies,
          description: this.$store.state.description,
          budget: this.$store.state.budget,
          contact_email: this.$store.state.contact_email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setTimeout(() => {
          this.$router.push("Dashboard");
          getJobs();
        }, 500);
      }
      this.$store.state.title = null;
      this.$store.state.technologies = null;
      this.$store.state.description = null;
      this.$store.state.budget = null;
      this.$store.state.contact_email = null;
    },
  },
};
</script>

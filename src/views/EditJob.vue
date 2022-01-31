<template>
  <form @submit="updateJob" class="text-black flex flex-col justify-end">
    <div class="mb-2 flex justify-end">
      <label class="text-white self-center" for="">Title: </label>
      <input
        class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
        v-model="newTitle"
        type="text"
        name=""
        id=""
      />
    </div>
    <div class="mb-2 flex justify-end">
      <label class="text-white self-center" for="">Description: </label>
      <textarea
        class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
        name=""
        id=""
        cols="20"
        rows="5"
        v-model="newDescription"
      ></textarea>
    </div>
    <div class="mb-2 flex justify-end">
      <label class="text-white self-center" for="">Budget: </label>
      <input
        class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
        v-model="newBudget"
        type="number"
        name=""
        id=""
      />
    </div>
    <div class="mb-2 flex justify-end">
      <label class="text-white self-center" for="">Technologies: </label>
      <input
        class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
        v-model="newTechnologies"
        type="text"
        name=""
        id=""
      />
    </div>
    <div class="mb-2 flex justify-end">
      <label class="text-white self-center" for="">Email: </label>
      <input
        class="border-solid border-2 border-black p-1 rounded-xl text-black flex-auto"
        v-model="newContact_email"
        type="text"
        name=""
        id=""
      />
    </div>
    <div class="text-center mb-6">
      <input
        class="border-solid border-2 border-black p-1 rounded-xl cursor-pointer"
        type="submit"
        value="Submit"
        id=""
      />
    </div>
  </form>
</template>
<script>
import axios from "axios";
import util from "../util";
import getJobs from "../api/api";
export default {
  name: "EditJob",
  props: [
    "jobId",
    "title",
    "technologies",
    "description",
    "budget",
    "contact_email",
  ],
  computed: {
    newTitle: {
      get() {
        return this.title;
      },
      set(value) {
        this.$store.commit("setTitle", value);
      },
    },
    newTechnologies: {
      get() {
        return this.technologies;
      },
      set(value) {
        this.$store.commit("setTechnologies", value);
      },
    },
    newBudget: {
      get() {
        return this.budget;
      },
      set(value) {
        this.$store.commit("setBudget", value);
      },
    },
    newDescription: {
      get() {
        return this.description;
      },
      set(value) {
        this.$store.commit("setDescription", value);
      },
    },
    newContact_email: {
      get() {
        return this.contact_email;
      },
      set(value) {
        this.$store.commit("setContactEmail", value);
      },
    },
  },
  methods: {
    async updateJob(e) {
      e.preventDefault();
      const token = localStorage.getItem("token");

      let response = await axios.put(
        util.port + `updatejobs/${this.jobId}`,
        {
          title: this.$store.state.title || this.title,
          technologies: this.$store.state.technologies || this.technologies,
          description: this.$store.state.description || this.description,
          budget: this.$store.state.budget || this.budget,
          contact_email: this.$store.state.contact_email || this.contact_email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        getJobs();
        this.$store.state.editJob = null;
      }
    },
  },
};
</script>

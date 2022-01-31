<template>
  <div class="">
    <h3 class="text-xl text-center mb-8">All Jobs</h3>
    <div>
      <div v-for="(job, key) in jobs" :key="key">
        <div
          v-if="job.id !== edit"
          class="flex flex-col flex-wrap bg-white text-black p-3 rounded-lg"
        >
          <div class="text-xl mb-1" v-if="job.id !== edit">{{ job.title }}</div>
          <div class="mb-1" v-if="job.id !== edit">{{ job.description }}</div>
          <div class="mb-1" v-if="job.id !== edit">
            <label class="underline" for="">Budget:</label>
            ${{ job.budget }}
          </div>
          <div class="mb-1" v-if="job.id !== edit">
            <div class="mb-1">
              <label class="underline" for="">Technologies: </label>
              {{ job.technologies }}
            </div>
            <div class="mb-1">
              <label class="underline" for="">Email: </label>
              <span>{{ job.contact_email }}</span>
            </div>
          </div>
        </div>
        <form>
          <div v-if="job.id === edit">
            <EditJob
              v-bind:jobId="job.id"
              v-bind:title="job.title"
              v-bind:description="job.description"
              v-bind:budget="job.budget"
              v-bind:technologies="job.technologies"
              v-bind:contact_email="job.contact_email"
            />
          </div>
        </form>
        <div class="flex justify-around mb-4">
          <div v-if="job.id !== edit">
            <button class="hover:underline" @click="handleEdit(job.id)">
              Edit
            </button>
          </div>
          <div v-if="job.id === edit">
            <button class="hover:underline" @click="cancelEdit()">
              Cancel
            </button>
          </div>
          <div>
            <button class="hover:underline" @click="handleDelete(job.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import util from "../util";
import getJobs from "../api/api";
import EditJob from "./EditJob.vue";

export default {
  components: { EditJob },
  name: "Dashboard",
  props: {},
  computed: {
    jobs: {
      get() {
        return this.$store.state.jobs;
      },
    },
    edit: {
      get() {
        return this.$store.state.editJob;
      },
    },
  },
  methods: {
    async handleDelete(jobId) {
      const token = localStorage.getItem("token");

      let response = await axios.delete(util.port + `deletejob/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.message === "Job deleted successfully") {
        getJobs();
      }
    },

    handleEdit(jobId) {
      this.$store.state.editJob = jobId;
    },
    cancelEdit() {
      this.$store.state.editJob = null;
    },
  },
  created() {
    getJobs();
  },
};
</script>

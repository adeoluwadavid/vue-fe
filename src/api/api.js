import store from "../store";
import util from "../util";
import axios from "axios";
export default async function getJob() {
  const token = localStorage.getItem("token");
  const jobId = localStorage.getItem("id");
  let response = await axios.get(util.port + `getjobs/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  store.state.jobs = response.data;
}

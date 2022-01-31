import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import AddJobs from "../views/AddJobs.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { auth: true },
  },
  {
    path: "/addjobs",
    name: "AddJobs",
    component: AddJobs,
    meta: { auth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.auth) &&
    !localStorage.getItem("token")
  ) {
    next({
      path: "/login",
    });
  } else {
    next();
  }
});
export default router;

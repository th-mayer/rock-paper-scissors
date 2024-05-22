import Layout from "../views/Layout.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

export default {
  path: "/accout",
  component: Layout,
  children: [
    { path: "", redirect: "login" },
    { path: "login", component: Login },
    { path: "register", component: Register },
  ],
};

import Layout from "../views/account/Account-Layout.vue";
import Login from "../views/account/Login.vue";
import Register from "../views/account/Register.vue";

export default {
  path: "/accout",
  component: Layout,
  children: [
    { path: "", redirect: "login" },
    { path: "login", component: Login },
    { path: "register", component: Register },
  ],
};

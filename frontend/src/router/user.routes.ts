import Edit from "../views/user/Edit.vue";
import UserLayout from "../views/user/User-Layout.vue";

export default {
  path: "/user",
  component: UserLayout,
  children: [
    { path: "edit/:id", component: Edit}
  ]
}
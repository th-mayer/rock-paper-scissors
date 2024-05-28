import AddEdit from "../views/user/AddEdit.vue";
import UserLayout from "../views/user/User-Layout.vue";

export default {
  path: "/user",
  component: UserLayout,
  children: [
    { path: "", component: List },
    { path: "add", component: AddEdit},
    { path: "edit/:id", component: AddEdit}
  ]
}
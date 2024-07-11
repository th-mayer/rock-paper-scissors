import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { useAlertStore } from "../stores/alert.store";
import { useAuthStore } from "../stores/auth.store";
import AccountLayout from "../views/account/AccountLayout.vue";
import Login from "../views/account/Login.vue";
import Register from "../views/account/Register.vue";
import Edit from "../views/user/AccountEdit.vue";
import Game from "../views/game/Game.vue";
import ItemEdit from "../views/user/ItemEdit.vue";

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: [
    { path: "/", component: Home },
    {
      path: "/account",
      component: AccountLayout,
      children: [
        { path: "login", component: Login },
        { path: "register", component: Register },
      ],
    },
    { path: "/edit/:id", component: Edit },
    { path: "/game", component: Game },
    { path: "/:id/itemEdit", component: ItemEdit },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach(async (to) => {
  // clear alerts when route change
  const alertStore = useAlertStore();
  alertStore.clear();

  //redirect to login page if not logged in
  const publicPages = ["/account/login", "/account/register"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnURL = to.fullPath;
    return "/account/login";
  }
});

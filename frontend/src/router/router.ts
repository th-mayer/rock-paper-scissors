import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import accountRoutes from "./account.routes";
import userRoutes from "./user.routes";
import { useAlertStore } from "../stores/alert.store";
import { useAuthStore } from "../stores/auth.store";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    { path: "/", component: Home },
    { ...accountRoutes },
    { ...userRoutes },
  ],
});

router.beforeEach(async (to) => {
  // clear alerts when route change
  const alertStore = useAlertStore();
  alertStore.clear();

  //redirect to login page if not logged in
  const publicPages = ["/account/login", "account/register"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return "/account/login";
  }
});

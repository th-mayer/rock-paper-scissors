import { defineStore } from "pinia";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { router } from "../router/router";
import { useAlertStore } from "./alert.store";
import { ref } from "vue";

const baseURL = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore("auth", () => {
  const user = ref();
  const returnURL = ref("");

  async function login(username: string, hash: string) {
    try {
      const fetchUser = await fetchWrapper.post(`${baseURL}/authenticate`, {
        username,
        hash,
      });
      // this.user refers to state user prop
      user.value = fetchUser;
      localStorage.setItem("user", JSON.stringify(user));
      // redirect to prev URL or home page
      router.push(returnURL.value || "/");
    } catch (err) {
      const alertStore = useAlertStore();
      alertStore.error(err);
    }
  }

  async function logout() {
    user.value = null;
    localStorage.removeItem("user");
    router.push("/account/login");
  }

  return { user, returnURL, login, logout };
});

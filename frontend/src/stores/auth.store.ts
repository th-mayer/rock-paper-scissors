import { defineStore } from "pinia";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { router } from "../router/router";
import { useAlertStore } from "./alert.store";
import { ref } from "vue";

const baseURL = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore("auth", () => {
  // checks localStorage on page refresh, keeps user loggen in if token is present
  // || check necessary bc ts : https://stackoverflow.com/questions/67700374/use-localstorage-getitem-with-typescript
  const user = ref(JSON.parse(localStorage.getItem("user") || '""'));
  const returnURL = ref("");

  async function login(username: string, hash: string) {
    try {
      const fetchUser = await fetchWrapper.post(`${baseURL}/authenticate`, {
        username,
        hash,
      });
      user.value = fetchUser;
      localStorage.setItem("user", JSON.stringify(user.value));
      // redirect to prev URL or home page
      router.push(returnURL.value || "/");
    } catch (error) {
      const alertStore = useAlertStore();
      alertStore.error(error);
    }
  }

  async function logout() {
    user.value = null;
    localStorage.removeItem("user");
    router.push("/account/login");
  }

  return { user, returnURL, login, logout };
});

import { defineStore } from "pinia";
import { fetchWrapper } from "../helpers/httpRequestWrapper";
import { router } from "../router/router";
import { useAlertStore } from "./alert.store";

const baseURL = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    /**
     * || check necessary bc ts : https://stackoverflow.com/questions/67700374/use-localstorage-getitem-with-typescript
     * holds currently logged in user + keeps user from logging out on page refresh
     *
     * user prop contains currently logged in user
     * returnURL : redirect URL to previous after successful login
     * */
    user: JSON.parse(localStorage.getItem("user") || '""'),
    returnUrl: null as string | null,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const user = await fetchWrapper.post(`${baseURL}/authenticate`, { username, password });
        // this.user refers to state user prop
        this.user = user;
        localStorage.setItem("user", JSON.stringify(user));
        // redirect to prev URL or home page
        router.push(this.returnUrl || "/");
      } catch (err) {
        const alertStore = useAlertStore();
        alertStore.error(err);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/account/login");
    },
  },
});

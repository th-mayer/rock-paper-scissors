import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {},
  actions: {
    register(email: string, username: string, password: string) {},
  },
});

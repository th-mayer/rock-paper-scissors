import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // or check necessary bc ts : https://stackoverflow.com/questions/67700374/use-localstorage-getitem-with-typescript
    user: JSON.parse(localStorage.getItem('user') || '""'),
    returnUrl: null as string | null
  }),
  actions: {
    async login(username: string, password: string){

    },
    logout(){

    }
  }
});

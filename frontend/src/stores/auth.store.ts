import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // || check necessary bc ts : https://stackoverflow.com/questions/67700374/use-localstorage-getitem-with-typescript
    // holds currently logged in user + keeps user from logging out on page refresh
    user: JSON.parse(localStorage.getItem('user') || '""'),
    returnUrl: null as string | null
  }),
  actions: {
    async login(username: string, password: string){
      try {
        const user = 
      }
    },
    logout(){

    }
  }
});

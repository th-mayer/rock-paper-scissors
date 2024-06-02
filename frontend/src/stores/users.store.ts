import { defineStore } from "pinia";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { useAuthStore } from "./auth.store";

const baseURL = `${import.meta.env.VITE_API_URL}/users`;

export const useUserStore = defineStore("users", {
  state: () => ({
    allUsers: {},
    user: {}
  }),
  actions: {
    async register(user: any) {
      await fetchWrapper.post(`${baseURL}/register`, user);
    },
    async getAll(){
      this.allUsers = { loading: true };
      try{
        this.allUsers = await fetchWrapper.get(baseURL);
      } catch (err) {
        this.allUsers = { err };
      }
    },
    async getById(id: any){
      this.user = { loading: true };
      try {
        this.user = await fetchWrapper.get(`${baseURL}/${id}`);
      } catch (err) {
        this.user = { err }
      }
    },
    async update(id: any, params: any){
      await fetchWrapper.put(`${baseURL}/${id}`, params);

      // if logged in user updates their profile, update user saved in localStorage
      const authStore = useAuthStore();
      if (id === authStore.user.id) {
        const user = { ...authStore.user, ...params };
        localStorage.setItem("user", JSON.stringify(user));

        authStore.user = user;
      }
    },
    async delete(id: any){
      // TODO
      // for deleting a specific item
      // TODO in BE as well! 
    }

  },
});

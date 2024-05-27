import { defineStore } from "pinia";

export const useUserStore = defineStore("users", {
  state: () => ({
    allUsers: {},
    user: {}
  }),
  actions: {
    async register(user) {
      
    },
    async getAll(){},
    async getById(id){},
    async update(id, params){},
    async delete(id){}

  },
});

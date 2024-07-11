import { defineStore } from "pinia";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { useAuthStore } from "./auth.store";
import { Ref, ref } from "vue";

const baseURL = `${import.meta.env.VITE_API_URL}/users`;

export const useUserStore = defineStore("users", () => {
  const user: Ref<null | any> = ref(null);
  const users: Ref<null | any> = ref(null);

  async function register(user: any) {
    await fetchWrapper.post(`${baseURL}/register`, user);
  }

  async function getById(id: any) {
    user.value = { loading: true };
    try {
      user.value = await fetchWrapper.get(`${baseURL}/${id}`);
    } catch (err) {
      user.value = { err };
    }
  }

  async function getCurrentUser() {
    user.value = { loading: true };
    try {
      user.value = await fetchWrapper.get(`${baseURL}/current`);
    } catch (err) {
      user.value = { err };
    }
  }

  async function getLeaderboard() {
    users.value = { loading: true };
    try {
      users.value = await fetchWrapper.get(`${baseURL}/leaderboard`);
    } catch (err) {
      users.value = { err };
    }
  }

  async function generateItems(id: any) {
    user.value = { loading: true };
    try {
      user.value = await fetchWrapper.get(`${baseURL}/${id}/generateItems`);
    } catch (err) {
      user.value = { err };
    }
  }

  async function update(id: any, params: any) {
    await fetchWrapper.put(`${baseURL}/${id}`, params);
    // if logged in user updates their profile, update user saved in localStorage
    const authStore = useAuthStore();
    if (id === authStore.user.id) {
      const user = { ...authStore.user, ...params };
      localStorage.setItem("user", JSON.stringify(user));
      authStore.user = user;
    }
  }

  async function updateItemCoin(id: any) {
    await fetchWrapper.put(`${baseURL}/${id}/updateWin`);
    // if logged in user updates their profile, update user saved in localStorage
    const authStore = useAuthStore();
    if (id === authStore.user.id) {
      const user = { ...authStore.user };
      localStorage.setItem("user", JSON.stringify(user));
      authStore.user = user;
    }
  }

  return {
    user,
    users,
    register,
    getById,
    getCurrentUser,
    getLeaderboard,
    generateItems,
    update,
    updateItemCoin,
  };
});

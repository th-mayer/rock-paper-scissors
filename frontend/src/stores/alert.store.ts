import { defineStore } from "pinia";

// global alert
export const useAlertStore = defineStore("alert", {
  state: () => ({
    alert: null as any | null,
  }),
  actions: {
    success(message: string) {
      this.alert = { message, type: "alert-success" };
    },
    error(message: string) {
      this.alert = { message, type: "alert-danger" };
    },
    clear() {
      this.alert = null;
    },
  },
});

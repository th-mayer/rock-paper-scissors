import { defineStore } from "pinia";

type AlertData = {
  message: string;
  // appearance comes from bootstrap alerts!
  type: "alert-success" | "alert-danger";
};

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

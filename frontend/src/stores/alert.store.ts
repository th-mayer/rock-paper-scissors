import { defineStore } from "pinia";
import { Ref, ref } from "vue";

// global alert
export const useAlertStore = defineStore("alert", () => {
  const alert: Ref<null | any> = ref(null);

  function success(message: string) {
    alert.value = { message, type: "alert-success" };
  }

  function error(message: string) {
    alert.value = { message, type: "alert-danger" };
  }
  
  function clear() {
    alert.value = null;
  }
  return { alert, success, error, clear };
});

import { defineNuxtPlugin } from "#app";
import { getActivePinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export default defineNuxtPlugin(() => {
  const pinia = getActivePinia();
  if (pinia) {
    pinia.use(piniaPluginPersistedstate);
  }
});

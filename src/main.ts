// Core
import { createApp } from "vue";
import App from "@/App.vue";

// Styles
import "./style.scss";
import "primevue/resources/themes/lara-dark-blue/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

// Plugins
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import pinia from "./plugins/pinia";
import router from "./plugins/router";
import axios from "@/plugins/axios";

export const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(pinia);
app.use(router);

app.mount("#app");

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
import router from "./plugins/router";
import pinia from "./plugins/pinia";

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.use(router);
app.use(pinia);

app.mount("#app");

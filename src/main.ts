// Core
import { createApp } from "vue";
import App from "@/App.vue";

// Styles
import "./style.scss";
import "primevue/resources/themes/lara-dark-green/theme.css";

// Plugins
import PrimeVue from "primevue/config";
import router from "./plugins/router";

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(router);

app.mount("#app");

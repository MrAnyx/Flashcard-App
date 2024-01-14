import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", name: "home", component: () => import("../views/Home.vue") },
    { path: "/login", name: "login", component: () => import("../views/Login.vue") },
    { path: "/about", name: "about", component: () => import("../views/About.vue") },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

import { useUserStore } from "@/stores/user.store";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/login",
        name: "login",
        meta: {
            auth: "unauthenticated",
        },
        component: () => import("../views/Authentication/Login.vue"),
    },
    {
        path: "/register",
        name: "register",
        meta: {
            auth: "unauthenticated",
        },
        component: () => import("../views/Authentication/Register.vue"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/About.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (to.meta.auth === "unauthenticated" && userStore.isConnected) {
        next({ name: "home" });
    } else if (to.meta.auth === "user" && !userStore.isConnected) {
        next({ name: "login" });
    } else if (to.meta.auth === "admin" && !userStore.isAdmin) {
        next({ name: "home" });
    } else {
        next();
    }
});

export default router;

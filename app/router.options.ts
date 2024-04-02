import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes

    routes: (_routes: any) => [
        {
            name: "landing",
            path: "/",
            component: () => import("@/pages/Landing.vue")
        },
        {
            name: "application",
            path: "/app",
            component: () => import("@/pages/application/_layout.vue"),
            children: [
                {
                    name: "home",
                    path: "",
                    component: () => import("@/pages/application/Home.vue")
                },
                {
                    name: "topics",
                    path: "topics",
                    component: () => import("@/pages/application/Topics.vue")
                },
                {
                    name: "practice",
                    path: "practice",
                    component: () => import("@/pages/application/Practice.vue")
                },
                {
                    name: "settings",
                    path: "settings",
                    component: () => import("@/pages/application/Settings.vue")
                }
            ]
        },
        {
            name: "authentication",
            path: "/auth",
            component: () => import("@/pages/authentication/_layout.vue"),
            children: [
                {
                    name: "login",
                    path: "login",
                    component: () => import("@/pages/authentication/Login.vue")
                },
                {
                    name: "register",
                    path: "register",
                    component: () => import("@/pages/authentication/Register.vue")
                }
            ]
        }
    ]
};

import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes

    routes: (_routes: any) => [
        {
            name: "home",
            path: "/",
            component: () => import("@/pages/Home.vue")
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

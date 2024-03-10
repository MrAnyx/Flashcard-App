import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    routes: (_routes: any) => [
        {
            name: "home",
            path: "/",
            component: () => import("@/pages/Home.vue")
        }
    ]
};

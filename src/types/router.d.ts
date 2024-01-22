import "vue-router";

// To ensure it is treated as a module, add at least one `export` statement
export {};

declare module "vue-router" {
    interface RouteMeta {
        /**
         * Empty is equivalent to "public"
         */
        auth?: "unauthenticated" | "public" | "user" | "admin";
    }
}

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    if (!authStore.isConnected) {
        useStandardToast("unauthorized", {
            description: "You must login before accessing this page"
        });
        return navigateTo({
            name: "login"
        });
    }
});

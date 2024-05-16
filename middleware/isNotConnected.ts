export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    if (authStore.isConnected) {
        useStandardToast("info", {
            description: "You are already logged in."
        });

        return navigateTo({
            name: "dashboard"
        });
    }
});

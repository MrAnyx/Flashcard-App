export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    const toast = useToast();

    if (authStore.isConnected) {
        toast.add({
            title: "Already connected",
            description: "You are already logged in.",
            color: "primary"
        });

        return navigateTo({
            name: "dashboard"
        });
    }
});

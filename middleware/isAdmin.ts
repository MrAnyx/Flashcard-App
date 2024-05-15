export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    const toast = useToast();

    if (!authStore.isConnected) {
        toast.add({
            title: "Unauthorized",
            description: "You must login before accessing this page",
            color: "orange"
        });
        return navigateTo({
            name: "login"
        });
    } else if (!authStore.isAdmin) {
        toast.add({
            title: "Forbidden",
            description: "You can now access this page",
            color: "red"
        });
        return navigateTo({
            name: "dashboard"
        });
    }
});

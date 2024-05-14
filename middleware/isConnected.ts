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
    }
});

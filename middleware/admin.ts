export default defineNuxtRouteMiddleware(() =>
{
    const authStore = useAuthStore();

    if (!authStore.isConnected)
    {
        useStandardToast("error", {
            description: "You must login before accessing this page"
        });
        return navigateTo({
            name: "login"
        });
    }
    else if (!authStore.isAdmin)
    {
        useStandardToast("error", {
            description: "You can now access this page"
        });
        return navigateTo({
            name: "overview"
        });
    }
});

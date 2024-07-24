export default defineNuxtRouteMiddleware(() =>
{
    const authStore = useAuthStore();
    if (!authStore.isConnected)
    {
        useStandardToast("warning", {
            description: "You must login before accessing this page"
        });
        return navigateTo({
            name: "login"
        });
    }
});

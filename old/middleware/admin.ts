export default defineNuxtRouteMiddleware(() =>
{
    const authStore = useAuthStore();

    if (!authStore.isAdmin)
    {
        useStandardToast("error", {
            description: "You can't access this page."
        });
        return navigateTo({
            name: "overview"
        });
    }
});

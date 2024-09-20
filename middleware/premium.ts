export default defineNuxtRouteMiddleware((to, from) =>
{
    const authStore = useAuthStore();

    if (!authStore.isPremium)
    {
        useStandardToast("error", {
            description: "You must be a premium member to access this page."
        });
        return navigateTo({
            name: "overview"
        });
    }
});

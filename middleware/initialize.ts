export default defineNuxtRouteMiddleware(async (to) =>
{
    const applicationStore = useApplicationStore();

    if (!applicationStore.initialized)
    {
        return navigateTo({
            name: "initialize",
            query: {
                forward: to.fullPath
            }
        });
    }
});

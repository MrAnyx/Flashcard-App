export default defineNuxtRouteMiddleware(async (to, _from) =>
{
    const applicationStore = useApplicationStore();

    if (!applicationStore.initialized)
    {
        return navigateTo({
            name: "initialize",
            query: {
                forward: to.path
            }
        });
    }
});

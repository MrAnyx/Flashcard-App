export default defineNuxtRouteMiddleware((to, _from) =>
{
    const token = useToken();
    const applicationStore = useApplicationStore();

    console.log(token.value);

    if (!token.value)
    {
        return navigateTo({
            name: "login",
            query: {
                forward: to.path
            }
        });
    }

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

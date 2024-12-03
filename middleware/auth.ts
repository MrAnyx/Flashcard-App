export default defineNuxtRouteMiddleware((to, _from) =>
{
    const token = useToken();

    if (!token.value)
    {
        return navigateTo({
            name: "login",
            query: {
                forward: to.path
            }
        });
    }
});

export default defineNuxtRouteMiddleware(async (to) =>
{
    const token = useToken();

    if (!token.value)
    {
        return navigateTo({
            name: "login",
            query: {
                forward: to.fullPath
            }
        });
    }
});

export default defineNuxtRouteMiddleware(async () =>
{
    const token = useToken();

    if (token.value)
    {
        return redirectToForwardedRoute("overview");
    }
});

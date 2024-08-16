export default defineNuxtRouteMiddleware(() =>
{
    const token = useToken();
    if (!token.value)
    {
        useStandardToast("warning", {
            description: "You must login before accessing this page"
        });
        return navigateTo({
            name: "login"
        });
    }
});

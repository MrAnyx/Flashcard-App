export default defineNuxtRouteMiddleware(async (to, from) =>
{
    // const applicationStore = useApplicationStore();
    // if (applicationStore.initialized)
    // {
    //     return;
    // }

    setTimeout(() =>
    {
        useApplicationStore().initialized = true;
    }, 3000);
});

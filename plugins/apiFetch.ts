export default defineNuxtPlugin(() =>
{
    const config = useRuntimeConfig().public;
    const token = useToken();

    const $apiFetch = $fetch.create({
        baseURL: config.apiBaseUrl,
        keepalive: true,
        retry: false,
        responseType: "json",
        headers: {
            Accept: "application/json+std",
            ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
        },
        onRequest()
        {
        },
        onRequestError()
        {
            // useStandardToast("error", {
            //     description: "An error occured while send a request, please try again or contact the administrator."
            // });
        },
        onResponseError()
        {
            // if (response.status === 500)
            // {
            //     useStandardToast("error");
            // }

            // TODO Gestion globale des erreurs
            // useStandardToast("error");
        }
    });

    return {
        provide: {
            apiFetch: $apiFetch
        }
    };
});

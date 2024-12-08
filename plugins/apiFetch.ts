export default defineNuxtPlugin(() =>
{
    const config = useRuntimeConfig().public;

    const $apiFetch = $fetch.create({
        baseURL: config.apiBaseUrl,
        keepalive: true,
        retry: false,
        responseType: "json",
        headers: {
            Accept: "application/json"
        },
        onRequest({ options })
        {
            const token = useToken();
            if (token.value)
            {
                options.headers.append("Authorization", `Bearer ${token.value}`);
            }
        },
        onRequestError()
        {
            useStandardToast("error", {
                description: "An error occured while send a request, please try again or contact the administrator."
            });
        },
        onResponseError()
        {
            // if (response.status === 500)
            // {
            //     useStandardToast("error");
            // }

            // TODO Gestion globale des erreurs
            useStandardToast("error");
        }
    });

    return {
        provide: {
            apiFetch: $apiFetch
        }
    };
});

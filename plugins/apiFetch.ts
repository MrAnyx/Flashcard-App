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
        onRequestError({ error })
        {
            console.error(error);
            useStandardToast("error", {
                description: "An error occured while send a request, please try again or contact the administrator."
            });
        },
        onResponseError({ error })
        {
            // if (response.status === 500)
            // {
            //     useStandardToast("error");
            // }

            console.error(error);

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

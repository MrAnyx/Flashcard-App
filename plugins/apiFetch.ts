export default defineNuxtPlugin(() => {
    // const userAuth = useCookie("token");
    const config = useRuntimeConfig().public;
    const authStore = useAuthStore();

    const $apiFetch = $fetch.create({
        baseURL: config.apiBaseUrl,
        onRequest({ options }) {
            if (authStore.token !== null) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${authStore.token}`
                };
            }
        },
        onRequestError() {
            useStandardToast("error", {
                description: "An error occured while send a request, please try again or contact the administrator."
            });
        },
        onResponseError({ response }) {
            if (response.status === 500) {
                useStandardToast("error", {
                    description: "An error occured on the server, please try again or contact the administrator."
                });
            }
        }
    });

    return {
        provide: {
            apiFetch: $apiFetch
        }
    };
});

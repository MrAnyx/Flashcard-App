export default defineNuxtPlugin(() => {
    // const userAuth = useCookie("token");
    const config = useRuntimeConfig().public;
    const toast = useToast();
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
            toast.add({
                description: "An error occured while send a request, please try again or contact the administrator.",
                title: "Internal error",
                color: "red"
            });
        },
        onResponseError({ response }) {
            if (response.status === 500) {
                toast.add({
                    description: "An error occured on the server, please try again or contact the administrator.",
                    title: "Internal error",
                    color: "red"
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

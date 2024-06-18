import type { UseFetchOptions } from "nuxt/app";
import type { JsonStandard } from "~/types/request";

export function useApi<T>(url: string | (() => string), options: UseFetchOptions<JsonStandard<T>> = {})
{
    return useFetch<JsonStandard<T>>(url, {
        ...options,
        retry: false,
        $fetch: useNuxtApp().$apiFetch
    });
}

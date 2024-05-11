import type { JsonStandard } from "~/types/request";

type ApiRequestOption = {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    headers?: Record<string, string>,
    timeout?: number,
    mode?: RequestMode
}

export const useApi = <TResponse>(url: string, options: ApiRequestOption, body: BodyInit | Record<string, any> | null | undefined) => {
    const config = useRuntimeConfig();

    return $fetch<JsonStandard<TResponse>>(url, {
        baseURL: config.public.apiBaseUrl,
        method: options.method,
        headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer bad30e54ab7039982330691e9cb3ea0afc19432bf8a31ece43ca8bfb97ee20b6902e1d80",
            ...options.headers
        },
        timeout: options.timeout,
        mode: options.mode,
        body
    });
};

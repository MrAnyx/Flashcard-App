export type JsonStatus = "invalid" | "valid";

export type JsonPagination = {
    total: number,
    count: number,
    offset: number,
    items_per_page: number,
    total_pages: number,
    current_page: number,
    has_next_page: boolean,
    has_previous_page: boolean
}

export type JsonStandard<TData> = {
    "@timestamp": string,
    "@pagination": JsonPagination | null,
    "@status": string,
    data: TData
}

export type Pagination = {
    total: number;
    count: number;
    offset: number;
    items_per_page: number;
    total_pages: number;
    current_page: number;
    has_next_page: boolean;
    has_previous_page: boolean;
};

export type Paginated<TData> = {
    pagination: Pagination;
    data: TData;
};

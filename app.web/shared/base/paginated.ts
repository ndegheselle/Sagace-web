export enum SortDirection {
    ASC,
    DESC,
}

export class PaginationOptions {
    page: number;
    limit: number;
    orderBy?: string;
    orderDirection?: SortDirection;

    constructor(page: number, limit: number, orderBy: string | undefined = undefined, orderDirection: SortDirection | undefined = undefined) {
        this.page = page;
        this.limit = limit;
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }
}

export class Paginated<T> {
    data: T[];
    total: number;
    options: PaginationOptions;

    constructor(data: T[], total: number, options: PaginationOptions) {
        this.data = data;
        this.total = total;
        this.options = options;
    }
}
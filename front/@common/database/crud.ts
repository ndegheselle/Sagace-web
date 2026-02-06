export enum SortDirection {
    ASC = '+',
    DESC = '-',
}

export class PaginationOptions {
    /**
     * Current page number (starting from 1)
     */
    page: number;
    perPage: number;
    orderBy?: string;
    orderDirection?: SortDirection;

    constructor(page: number, perPage: number, orderBy: string | undefined = undefined, orderDirection: SortDirection | undefined = undefined) {
        this.page = page;
        this.perPage = perPage;
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

export interface IDataCrud<TResponse extends {id: string}> {
    create(data: TResponse): Promise<string>;
    update(id: string, data: TResponse): Promise<void>;
    delete(id: string): Promise<void>;

    getById(id: string): Promise<TResponse | null>;
    getAll(options: PaginationOptions): Promise<Paginated<TResponse>>;
    search(search: string, options: PaginationOptions): Promise<Paginated<TResponse>>;
}
export var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["ASC"] = 1] = "ASC";
    SortDirection[SortDirection["DESC"] = -1] = "DESC";
})(SortDirection || (SortDirection = {}));
export class PaginationOptions {
    constructor(page, limit, orderBy = undefined, orderDirection = undefined) {
        this.page = page;
        this.limit = limit;
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }
}
export class Paginated {
    constructor(data, total, options) {
        this.data = data;
        this.total = total;
        this.options = options;
    }
}

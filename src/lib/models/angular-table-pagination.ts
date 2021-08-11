export class AngularTablePagination {
    /** The current page number. */
    pageNumber: number;
    /** The current page size */
    pageSize: number;
    /** The current total number of items being paged */
    total: number;
    /** The filter of items */
    // filter: any[];
    /** Total page*/
    totalPage: number;

    constructor(params: any){
        this.pageNumber = (params.pageNumber) ? params.pageNumber : 1;
        this.pageSize = (params.pageSize) ? params.pageSize : 10;
        this.total = (params.total) ? params.total : 0;
        // this.filter = (params.filter) ? params.filter : [];
    }

    getTotalPage(){
        let temp = Math.ceil(this.total / this.pageSize);
        return (temp)? temp: 1;
    }
}
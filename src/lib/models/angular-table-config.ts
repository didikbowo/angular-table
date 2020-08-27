import { AngularTableColumn } from './angular-table-column';
import { AngularTableButton } from './angular-table-button';
import { AngularTablePagination } from './angular-table-pagination';

export interface AngularTableConfig {

    primaryKey?: string;
    dataSource: any[];
    displayedColumns: string[];
    columnOption: AngularTableColumn[];
    pageSizeOption?: number[];
    paginateOption?: AngularTablePagination;
    filter?: any;
    buttonOption?: AngularTableButton[];
    checkboxOption?: {
        buttonOption: { label: string, icon: string, btnClass: string, dataEmit: string }[];
        itemCheckbox: { key: number, isSelected: boolean }[];
    };
    expandRowConfig?: {
        typeContent: 'approval' | 'table';
        dataApproval?: { no_step: number, step_description: string, approval_date: string, pass: number, approval_pic: string }[];
        dataTable?: {
            label: any,
            column: string[],
            row: any[]
        }
    };
    showEditButton?: boolean[];
    advanceOption?: {
        showActionColumn?: boolean;
        showNumberColumn?: boolean;
        showPagination?: boolean;
        showHeader?: boolean;
        showExpandable?: boolean;
        showFilterColumn?: boolean;
        isEditableTable?: boolean;
        showDropzone?: boolean;
        showDeleteButton?: boolean;
        showEditButton?: boolean;
        showHorizontalScroll?: boolean;
    };
}

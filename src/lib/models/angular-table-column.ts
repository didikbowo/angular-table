import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

export interface AngularTableColumn {
    column: string;
    label: string;
    labelValue?: any;
    showFilter?: boolean;
    setDownloadButton?: 'direct' | 'tableBackblaze' | 'tableWasabi';
    setPipe?: 'string' | 'number' | 'decimal' | 'date' | 'year' | 'datetime' | 'currency' | 'phone';
    editable?: boolean;
    inputType?: 'date' | 'text' | 'typehead' | 'select' | 'number' | 'file' | 'datetime' | 'period';
    listOption?: any[];
    dropzoneConfig?: DropzoneConfigInterface;
    contentType?: 'profile' | 'imgPath';
    align?: string;
    prefixFileInput?: string;
    tableTarget?: string;
}

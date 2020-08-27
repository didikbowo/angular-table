import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';
import { AngularTableConfig } from './models/angular-table-config';
import { GlobalService } from './global.service';
import { faFilter, faSync, faMortarPestle, faEdit, faForward, faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'angular-table',
  templateUrl: './angular-table.component.html',
  styleUrls: ['./angular-table.component.scss'],
})
export class AngularTableComponent implements OnInit {

  faFilter = faFilter;
  faSync = faSync;
  faEdit = faEdit;
  faRight = faAngleRight;
  faDown = faAngleDown;

  @Input() config: AngularTableConfig;
  @Input() loading: boolean;

  // tslint:disable-next-line: no-inferrable-types
  currentRow: number = 0;
  currentPageSize: number;
  currentEdit: any = {};
  currentDeleted: any = {};

  // tslint:disable-next-line: no-inferrable-types
  expandedElement: boolean = false;
  // tslint:disable-next-line: no-inferrable-types
  onEdit: boolean = false;

  // tslint:disable-next-line: no-inferrable-types
  checkboxAll: boolean = false;

  api_url: string;
  api_version_url: string;

  @ViewChild(DropzoneComponent, { read: true }) componentRef?: DropzoneComponent;

  @Output() currentPageSizeEvent = new EventEmitter<number>();
  @Output() currentPageEvent = new EventEmitter<number>();
  @Output() filterInput = new EventEmitter<number>();
  @Output() checkboxAction = new EventEmitter<any>();
  @Output() rowEdited = new EventEmitter<any>();
  @Output() rowDeleted = new EventEmitter<any>();
  @Output() rowCancelEdit = new EventEmitter<any>();
  @Output() expandRow = new EventEmitter<any>();
  @Output() rowAction = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal,
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.api_url = this.globalService.apiHost;
    this.api_version_url = this.globalService.apiVersionHost;
    this.currentPageSize = this.config.paginateOption.pageSize;
  }

  resetCheckbox() {
    this.checkboxAll = false;
    if (this.config.checkboxOption) {
      for (const item of this.config.checkboxOption.itemCheckbox) {
        item.isSelected = false;
      }
    }
  }

  checkboxAllTriggered() {
    for (const item of this.config.checkboxOption.itemCheckbox) {
      item.isSelected = this.checkboxAll;
    }
  }

  changePageSize() {
    // this.currentPageEvent.emit(1);
    this.currentPageSizeEvent.emit(this.currentPageSize);
    this.resetCheckbox();
  }

  changePage(page: number, allow: boolean) {
    if (!allow) {
      this.currentPageEvent.emit(page);
      this.resetCheckbox();
    }
  }

  submitFilter() {
    this.currentPageEvent.emit(1);
    this.filterInput.emit(this.config.filter);
  }

  resetFilter() {
    this.currentPageEvent.emit(1);
    this.filterInput.emit(0);
  }

  expandToogle(id) {
    this.expandedElement = (this.currentRow === id) ? !this.expandedElement : true;
    this.currentRow = id;
    this.expandRow.emit({ expand: this.expandedElement, id: this.currentRow });
  }

  buildRoute(row, route, param) {
    const newRoute: string[] = [];
    newRoute.push(route);
    // tslint:disable-next-line: forin
    for (const key in param) {
      let temp = row[param[key]];
      if (!temp) {
        temp = param[key];
      }
      newRoute.push(temp);
    }
    return newRoute;
  }

  extractParam(row, obj) {
    const param = {};
    // tslint:disable-next-line: forin
    for (const key in obj) {
      param[key] = row[obj[key]];
    }
    return param;
  }

  openModal(param, componentModal, modalOption: any = { size: 'lg' }) {
    const modalRef = this.modalService.open(componentModal, modalOption);

    // tslint:disable-next-line: forin
    for (const key in param) {
      modalRef.componentInstance[key] = param[key];
    }
  }

  sendParam(param, action) {
    const data = { param, action };
    if (action === 'view' || action === 'edit' || action === 'download' || action === 'other') {
      this.rowAction.emit(data);
    }
    if (action === 'delete') {
      Swal.fire({
        title: 'Are you sure ?',
        text: 'You won\'t be able to revert this!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.rowAction.emit(data);
        }
      });


    }
  }

  parseColumnOption(obj, find, val, get) {
    const temp = obj.filter(el => el[find] === val);
    return temp[0][get];
  }

  checkboxActionTrigger(event) {
    this.checkboxAction.emit({ message: event, data: this.config.checkboxOption.itemCheckbox });
  }

  edit(row) {
    const id = row[this.config.primaryKey];
    this.onEdit = (this.currentRow === id) ? !this.onEdit : true;
    this.currentRow = id;
    this.currentEdit = row;

    const inputDate = this.config.columnOption.filter(el => el.inputType === 'date');
    for (const input of inputDate) {
      const tempDate = new Date();
      let tempObjDate = { year: tempDate.getFullYear(), month: tempDate.getMonth() + 1, day: tempDate.getDate() };
      this.currentEdit[input.column] = (this.currentEdit[input.column]) ? this.dateParse(this.currentEdit[input.column]) : tempObjDate;
    }
  }

  save() {
    const inputDate = this.config.columnOption.filter(el => el.inputType === 'date');
    for (const input of inputDate) {
      this.currentEdit[input.column] = this.formatDate(this.currentEdit[input.column]);
    }
    this.rowEdited.emit(this.currentEdit);
    this.onEdit = false;
  }

  cancelEdit() {
    this.onEdit = false;
    this.rowCancelEdit.emit();
  }

  delete(row) {
    const id = row[this.config.primaryKey];
    this.currentRow = id;
    this.currentDeleted = row;
    Swal.fire({
      title: 'Are you sure ?',
      text: 'You won\'t be able to revert this!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.rowDeleted.emit(this.currentDeleted);
      }
    });
  }

  getSelectedTypehead($event, col) {
    this.currentEdit[col] = $event.key;
  }

  getSelectedSelect(val, col) {
    this.currentEdit[col] = val;
  }

  dateParse(date) {
    const _date = new Date(date);
    return { year: _date.getFullYear(), month: _date.getMonth() + 1, day: _date.getDate() };
  }

  formatDate({ year, month, day }) {

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  onSuccess($event, col) {
    this.currentEdit[col] = $event.wasabiRowId;
  }

}

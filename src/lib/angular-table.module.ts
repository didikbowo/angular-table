import { NgModule } from '@angular/core';
import { AngularTableComponent } from './angular-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormatValuePipe } from './pipes/format-value.pipe';
import { GlobalService } from './global.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AngularTableComponent,
    FormatValuePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [AngularTableComponent],
  providers: [GlobalService]
})
export class AngularTableModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsDocumentsRoutingModule } from './accounts-documents-routing.module';
import { AccountsDocumentsComponent } from './accounts-documents.component';
import { CustomerDocumentsComponent } from '../customer-documents/customer-documents.component';
import { MaterialModule } from 'src/app/material/material';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocumentsComponent } from '../documents/documents.component';


@NgModule({
  declarations: [AccountsDocumentsComponent, DocumentsComponent],
  imports: [
    CommonModule,
    AccountsDocumentsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountsDocumentsModule { }

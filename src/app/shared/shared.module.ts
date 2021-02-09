import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import {MenuModule} from 'primeng/menu';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {FileUploadModule} from 'primeng/fileupload';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    TableModule,
    MenuModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule, 
    ReactiveFormsModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MultiSelectModule ,
    DropdownModule,
    MatListModule,
    ToolbarModule,
    DialogModule,
    HttpClientModule,
    InputTextareaModule,
    InputNumberModule,
    FileUploadModule
  ],
  exports : [
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    TableModule,
    MenuModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule, 
    ReactiveFormsModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MultiSelectModule,
    MatListModule,
    DropdownModule,
    ToolbarModule,
    DialogModule,
    HttpClientModule,
    InputTextareaModule,
    InputNumberModule,
    FileUploadModule
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
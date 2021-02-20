import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {DropdownModule} from 'primeng/dropdown';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import {MenuModule} from 'primeng/menu';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import { MatListModule } from '@angular/material/list';
import { NbCardModule, NbSelectModule } from '@nebular/theme';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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
    DropdownModule,
    ToolbarModule,
    DialogModule,
    HttpClientModule,
    InputTextareaModule,
    InputNumberModule,
    CalendarModule,
    MatListModule,
    NbSelectModule,
  ],
  exports : [
    CommonModule,
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
    DropdownModule,
    ToolbarModule,
    DialogModule,
    HttpClientModule,
    InputTextareaModule,
    InputNumberModule,
    NbCardModule,
    CalendarModule,
    MatListModule,
    NbSelectModule,
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
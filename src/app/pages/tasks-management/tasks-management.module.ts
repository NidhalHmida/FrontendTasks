import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TasksManagementComponent } from './tasks-management.component';
import { TasksManagementRoutingModule } from './tasks-managment-routing.module';


@NgModule({
  declarations: [TasksManagementComponent],
  imports: [
    SharedModule,
    TasksManagementRoutingModule
  ]
})
export class TasksManagementModule { }

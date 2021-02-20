import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksManagementComponent } from './tasks-management.component';



const routes: Routes = [  {
  path : '' , component : TasksManagementComponent ,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksManagementRoutingModule { }

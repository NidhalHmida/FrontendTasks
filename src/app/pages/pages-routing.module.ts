import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path : '' , component : PagesComponent ,
    children : [   
      {path : 'todo' ,  loadChildren :() => import('./tasks-management/tasks-management.module').then(m =>m.TasksManagementModule)},
      {path :'',redirectTo :'todo', pathMatch : 'full'},
      {path : '**',redirectTo :'todo'}
    ]},
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

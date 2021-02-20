import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path : 'pages' , loadChildren :() => import('./pages/pages.module').then(m =>m.PagesModule)
  },
  {path :'',redirectTo :'/pages/todo', pathMatch : 'full'},
  {path : '**',redirectTo :'pages/todo'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

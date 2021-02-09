import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramGroupsComponent } from './ProgramGroups.component';


const routes: Routes = [  {
  path : '' , component : ProgramGroupsComponent ,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramGroupsRoutingModule { }

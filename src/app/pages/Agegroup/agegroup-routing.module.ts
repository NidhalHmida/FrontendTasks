import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgeGroupComponent } from './agegroup.component';

const routes: Routes = [{
  path : '' , component : AgeGroupComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgeGroupRoutingModule { }

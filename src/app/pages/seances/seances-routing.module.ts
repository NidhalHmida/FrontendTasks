import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeancesComponent } from './seances.component';

const routes: Routes = [
  {
    path : '' , component : SeancesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeancesRoutingModule { }

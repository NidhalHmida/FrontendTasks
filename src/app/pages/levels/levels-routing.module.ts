import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LevelsComponent } from './levels.component';

const routes: Routes = [
  {
    path : '' , component : LevelsComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevelsRoutingModule { }

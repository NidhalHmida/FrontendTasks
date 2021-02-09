import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideochallengesComponent } from './videochallenges.component';

const routes: Routes = [{path : '' , component : VideochallengesComponent ,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideochallengesRoutingModule { }

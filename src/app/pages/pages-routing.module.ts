import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path : '' , component : PagesComponent ,
    children : [
      {path : 'exercices' ,  loadChildren :() => import('./exercices/exercices.module').then(m =>m.ExercicesModule)},
      {path : 'agegroups' ,  loadChildren :() => import('./Agegroup/agegroup.module').then(m =>m.AgeGroupModule)},
      {path : 'levels' ,  loadChildren :() => import('./levels/levels.module').then(m =>m.LevelsModule)},
      {path : 'categories' ,  loadChildren :() => import('./categories/categories.module').then(m =>m.CategoriesModule)},
      {path : 'seances' ,  loadChildren :() => import('./seances/seances.module').then(m =>m.SeancesModule)},
      {path : 'programs' ,  loadChildren :() => import('./programs/programs.module').then(m =>m.ProgramsModule)},
      {path : 'programgroups' ,  loadChildren :() => import('./programGroup/programGroups.module').then(m =>m.ProgramGroupsModule)},
      {path : 'users' ,  loadChildren :() => import('./users/users.module').then(m =>m.UsersModule)},
      {path : 'badges' ,  loadChildren :() => import('./badges/badges.module').then(m =>m.BadgesModule)},
      {path : 'trainings' ,  loadChildren :() => import('./trainings/trainings.module').then(m =>m.TrainingsModule)},
      {path : 'videochallenges' ,  loadChildren :() => import('./videochallenges/videochallenges.module').then(m =>m.VideochallengesModule)},
      {path :'',redirectTo :'exercices', pathMatch : 'full'},
      {path : '**',redirectTo :'exercices'}
    ]},
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

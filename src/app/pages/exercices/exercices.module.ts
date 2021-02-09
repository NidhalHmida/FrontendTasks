import { NgModule } from '@angular/core';
import { ExercicesRoutingModule } from './exercices-routing.module';
import { ExercicesComponent } from './exercices.component';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [ExercicesComponent],
  imports: [
    SharedModule,
    ExercicesRoutingModule
  ]
})
export class ExercicesModule { }

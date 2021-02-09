import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TrainingsRoutingModule } from './trainings-routing.module';
import { TrainingsComponent } from './trainings.component';


@NgModule({
  declarations: [TrainingsComponent],
  imports: [
    SharedModule,
    TrainingsRoutingModule
  ]
})
export class TrainingsModule { }

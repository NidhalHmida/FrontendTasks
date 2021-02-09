import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SeancesRoutingModule } from './seances-routing.module';
import { SeancesComponent } from './seances.component';


@NgModule({
  declarations: [SeancesComponent],
  imports: [
    SharedModule,
    SeancesRoutingModule
  ]
})
export class SeancesModule { }

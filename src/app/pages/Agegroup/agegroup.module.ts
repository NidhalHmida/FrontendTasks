import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AgeGroupRoutingModule } from './agegroup-routing.module';
import { AgeGroupComponent } from './agegroup.component';



@NgModule({
  declarations: [AgeGroupComponent ],
  imports: [
    AgeGroupRoutingModule,
     SharedModule
  ]
})
export class AgeGroupModule { }

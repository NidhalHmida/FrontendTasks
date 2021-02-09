import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs.component';


@NgModule({
  declarations: [ProgramsComponent],
  imports: [
    SharedModule,
    ProgramsRoutingModule
  ]
})
export class ProgramsModule { }

import { NgModule } from '@angular/core';
import { ProgramGroupsRoutingModule } from './programGroups-routing.module';
import { ProgramGroupsComponent } from './ProgramGroups.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ProgramGroupsComponent],
  imports: [
    SharedModule,
    ProgramGroupsRoutingModule
  ]
})
export class ProgramGroupsModule { }

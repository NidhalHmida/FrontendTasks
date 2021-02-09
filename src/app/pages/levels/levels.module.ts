import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LevelsRoutingModule } from './levels-routing.module';
import { LevelsComponent } from './levels.component';


@NgModule({
  declarations: [LevelsComponent],
  imports: [
   SharedModule,
    LevelsRoutingModule
  ]
})
export class LevelsModule { }

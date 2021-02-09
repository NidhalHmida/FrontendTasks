import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { VideochallengesRoutingModule } from './videochallenges-routing.module';
import { VideochallengesComponent } from './videochallenges.component';


@NgModule({
  declarations: [VideochallengesComponent],
  imports: [
    SharedModule,
    VideochallengesRoutingModule
  ]
})
export class VideochallengesModule {
  length: number;
}

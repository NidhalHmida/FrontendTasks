import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { BadgesRoutingModule } from './badges-routing.module';
import { BadgesComponent } from './badges.component';


@NgModule({
  declarations: [BadgesComponent],
  imports: [
    SharedModule,
    BadgesRoutingModule
  ]
})
export class BadgesModule { }

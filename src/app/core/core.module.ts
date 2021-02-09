import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachfootballService } from './coachfootball.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SharedModule} from '../shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component'


@NgModule({
  declarations: [SidemenuComponent, ToolbarComponent],
  providers : [{provide : CoachfootballService , useClass : CoachfootballService},
  {provide : ConfirmationService},
  {provide : MessageService}
],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports : [SidemenuComponent, ToolbarComponent]
})
export class CoreModule { }

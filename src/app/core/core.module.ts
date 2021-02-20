import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SharedModule} from '../shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component'
import { TodoTasksService } from './todotasks.service';


@NgModule({
  declarations: [SidemenuComponent, ToolbarComponent],
  providers : [{provide : TodoTasksService , useClass : TodoTasksService},
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

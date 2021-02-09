import { Component, OnInit } from '@angular/core';
import { CoachfootballService } from 'src/app/core/coachfootball.service';
import { Training } from 'src/app/models/training.model';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {

  operation : boolean = false 
  id : string
  trainings : Training [] = [] 
  selectedTraining : Training
  
  constructor(private service :CoachfootballService) { }

  ngOnInit(): void {
   
    if(this.service.seanceexerces.length ==0)
    {
    
      this.service.get("/trainings").subscribe((data : Training[])=>{ 
        this.trainings= data
        console.log(this.trainings)
        this.service.serviceSeanceexerce(this.trainings)  
         });
    }
    else
    this.trainings = this.service.seanceexerces
  }

  trainingDetails(data)
  {
    this.selectedTraining = data
  }
}
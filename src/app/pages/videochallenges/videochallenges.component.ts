import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoachfootballService } from 'src/app/core/coachfootball.service';
import { Badge } from 'src/app/models/badge.model';
import { Videochallenge } from 'src/app/models/videochallenge.model';

@Component({
  selector: 'app-videochallenges',
  templateUrl: './videochallenges.component.html',
  styleUrls: ['./videochallenges.component.scss']
})
export class VideochallengesComponent implements OnInit {

 
  endPoint ="/challengevideos"
  id : string
  videochallenges : Videochallenge [] = []
  selectedVideochallenge : Videochallenge
  badges: Badge[];
  dataDialog: boolean;
  submitted: boolean;
  
  constructor(private messageService: MessageService,private router: Router,private formBuilder : FormBuilder,private service :CoachfootballService,private confirmationService: ConfirmationService) { }
  ngOnInit(): void {

   if(this.service.videochallenges.length ==0)
     {
      this.service.get(this.endPoint).subscribe((data :  Videochallenge[])=>{ 
        this.videochallenges = data
        this.service.serviceVideoChallenge(this.videochallenges)  
         });
     }
     else
     this.videochallenges = this.service.videochallenges
     this.getBadges()
    }

   getBadges()
  {
    if(this.service.badges.length ==0)
    {
    this.badges= JSON.parse(localStorage.getItem("badges"))
    this.service.serviceBadge(this.badges)
    }
    else
    this.badges = this.service.badges
  }
   selectVideoChallenge(data)
   {
    this.selectedVideochallenge = data
     this.submitted = false;
    this.dataDialog = true;
   }
    

hideDialog() {
  this.dataDialog = false;
  this.submitted = false;
}
   onSubmit()
   {
    this.service.modify(this.endPoint,this.selectedVideochallenge).subscribe((data)=>{
      if(data != undefined)
      {
      this.dataDialog = false;
      this.submitted = true;
      var indice = this.service.getData(this.selectedVideochallenge,this.videochallenges)
      this.videochallenges.splice(indice,1)
      this.videochallenges.splice(indice,0,this.selectedVideochallenge)
      this.service.serviceSeance(this.videochallenges)
      this.messageService.add({severity:'success', summary: 'Succés', detail: "ce vidéo est maintenant évalué", life: 3000});
    }
      else  
      this.messageService.add({severity:'error', summary: 'Probléme', detail: "ce vidéo  n'est pas  évalué", life: 3000});
    }); 
     
     
   }
 }
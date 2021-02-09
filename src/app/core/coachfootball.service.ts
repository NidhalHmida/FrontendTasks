import { Injectable } from '@angular/core';
import { Badge } from '../models/badge.model';
import { Category } from '../models/category.model';
import { Exercice } from '../models/exercice.model';
import { Level } from '../models/level.model';
import { Program } from '../models/program.model';
import { Seance } from '../models/seance.model';
import { Training } from '../models/training.model';
import { ProgramGroup } from '../models/programGroup.model';
import { AgeGroup } from '../models/agegroup.model';
import { User } from '../models/user.model';
import { Videochallenge } from '../models/videochallenge.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoachfootballService {
  bprogramGroupsadges: ProgramGroup;
  programGroups: any;
  exercices : Exercice [] = []
  tranches  : AgeGroup [] = []
  levels : Level[] = []
  categories : Category[] = []
  seances : Seance[] =[] 
  programmes : Program []=[]
  suiteprogrammes: ProgramGroup[] = []
  users: User []=[]
  seanceexerces: Training[]=[]
  badges:Badge[]=[]
  videochallenges:Videochallenge[]=[]
  optionRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin': '*',
      'Acces-Control-Expose-Headers':'*',
      'Acces-Control-Allow-Methods' : '*'
    })
  };
  path:string ="http://vps597745.ovh.net/footBallCoachApi/public/api"
  constructor(private httpClient: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    
      // Server-side errors
      errorMessage = `Error Code: ${error.status}`;
    return (errorMessage);
  }
  

  // CATEGORIES

  get(endPoint)
  {

    return this.httpClient.get(this.path+endPoint,this.optionRequete).pipe(shareReplay(1));
  }

  add(endPoint,data)
  {
     console.log(data)
    return this.httpClient.post(this.path+endPoint,data,this.optionRequete);
  }

  modify(endPoint,data)
  {
    console.log(data)
    return this.httpClient.put(this.path+endPoint+"/"+data.id,data,this.optionRequete);   
  }

  delete(endPoint,id : string)
  {
    
   return  this.httpClient.delete(this.path+endPoint+"/"+id,this.optionRequete)
  }

  getData(id ,exers)
  {
   
    for(var i=0;i<exers.length;i++) 
    {
      if(id== parseInt(exers[i]["id"]))
      return(i)
    }
    return(-1)
  }

 // AgeGroup

  
   
    modifyVideoChallenge(exercice : Videochallenge,exercices :  Videochallenge[])
    {

      var indice = this.getData(exercice,exercices)
      exercices.splice(indice,1)
      exercices.splice(indice,0,exercice)
      localStorage.setItem("videochallenges",JSON.stringify(exercices))
    }
   
    modifyUser(exercice : User,exercices : User[])
    {
       
       var indice = this.getData(exercice,exercices)
       exercices.splice(indice,1)
       exercices.splice(indice,0,exercice)
       localStorage.setItem("users",JSON.stringify(exercices))
    }
    
       
    deleteSeance(exercice : Seance,exercices :Seance[])
    {
       
       var indice = this.getData(exercice,exercices)
       exercices.splice(indice,1)
       localStorage.setItem("seances",JSON.stringify(exercices))
    }
    deleteProgramme(exercice : Program,exercices :Program[])
    {
       
       var indice = this.getData(exercice,exercices)
       exercices.splice(indice,1)
       localStorage.setItem("programmes",JSON.stringify(exercices))
    }
    deleteSuiteprogramme(exercice : ProgramGroup,exercices : ProgramGroup[])
    {
       
       var indice = this.getData(exercice,exercices)
       exercices.splice(indice,1)
       localStorage.setItem("suiteprogramme",JSON.stringify(exercices))
    }
 
    
    serviceExercies(data)
    {
     this.exercices = data
    }

    serviceTranche(data)
    {
     this.tranches = data
    }

    serviceLevel(data)
    {
     this.levels = data
    }
    serviceCategory(data)
    {
     this.categories = data
    }  
    serviceSeance(data)
    {
     this.seances = data
    }  
   
   serviceProgramme(data)
   {
    this.programmes = data
   } 
   serviceSuiteprogramme(data)
   {
    this.suiteprogrammes = data
   } 
   serviceUser(data)
   {
     this.users=(data)
   }
   serviceSeanceexerce(data)
   {
     this.seanceexerces=(data)
   }
   serviceBadge(data)
   {
     this.badges=(data)
   }

   serviceVideoChallenge(data)
   {
     this.videochallenges=(data)
   }
}

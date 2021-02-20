import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoTasksService {
  

  optionRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin': '*',
      'Acces-Control-Expose-Headers':'*',
      'Acces-Control-Allow-Methods' : '*'
    })
  };
  path:string ="http://localhost:8080/api/todotasks"

  
  constructor(private httpClient: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    
      // Server-side errors
      errorMessage = `Error Code: ${error.status}`;
    return (errorMessage);
  }
  
  get(endPoint)
  {

    return this.httpClient.get(this.path+endPoint,this.optionRequete).pipe(shareReplay(1));
  }

  add(endPoint,data)
  {
    
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

  getData(id ,elements)
  {
   
    for(var i=0;i<elements.length;i++) 
    {
      if(id== elements[i]["id"])
      return(i)
    }
    return(-1)
  }

}

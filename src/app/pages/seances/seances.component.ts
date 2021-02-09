import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService} from 'primeng/api';
import { CoachfootballService } from 'src/app/core/coachfootball.service';
import { Exercice } from 'src/app/models/exercice.model';
import { Program } from 'src/app/models/program.model';
import { Seance } from 'src/app/models/seance.model';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.scss']
})

export class SeancesComponent implements OnInit {

  endPoint ="/seances"
  operation : boolean = false 
  form : FormGroup
  id : string
  seances : Seance []= []
  exercices: Exercice[]; 
  dataDialog: boolean;
  seance : Seance  = new Seance()
  submitted: boolean;
  programmes :  Program[] =[]

  constructor(private messageService: MessageService,private formBuilder : FormBuilder,private service :CoachfootballService,private confirmationService: ConfirmationService) { }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'title' : [null,Validators.compose([Validators.required,this.noWhitespaceValidator])],
      'description' : [null,Validators.compose([Validators.required,this.noWhitespaceValidator])],  
      'program' : [null,Validators.compose([Validators.required])], 
      'file' : [null,Validators.compose([Validators.required])], 
      
    })
    if(this.service.seances.length ==0)
    {
     this.service .get(this.endPoint).subscribe((data : Seance[])=>{  
      this.seances= data
      this.service.serviceSeance(this.seances)   
       });
    }
    else
    this.seances = this.service.seances
    this.getPrograms()
  }
  
  getPrograms()
  {
    if(this.service.programmes.length ==0)
    {
      this.service.get("/programs").subscribe((data : Program[])=>{  
        this.programmes = data.map(val => ({
          "id": val.id,
          "title" :val.title,
          "description" : val.description
        }))
        this.service.serviceProgramme(this.programmes)  
         });
    }
    else
    this.programmes = this.service.programmes
  }

  resetValues()
  {
    this.form.reset()
  }

  openNew() {
  
    this.submitted = false;
    this.dataDialog = true;
    this.resetValues()
    this.operation =false
}

hideDialog() {
  this.dataDialog = false;
  this.submitted = false;
  this.resetValues()
}


  onSubmit()
  {
    this.seance= new Seance(undefined, this.form.get("title").value,this.form.get("description").value)
    this.seance.programs =this.form.get("program").value.map(val => ({
    "id": val.id,
  }))
    if(!this.operation)
    {
    this.service.add(this.endPoint,this.seance).subscribe((data : Seance)=>{
      if(data != undefined)
      {
    this.seances.splice(0,0,this.seance)
    this.messageService.add({severity:'success', summary: 'Succés', detail: "La séance est ajoutée", life: 3000});
     this.dataDialog = false;
     this.submitted = true; 
     this.seance = new Seance()
      }
      else
      this.messageService.add({severity:'error', summary: 'Probléme', detail: "La séance n'est pas ajoutée, veuillez vérifiez les informations saisies", life: 3000});
    });  
  }
    else
    {
      this.seance= new Seance(this.id, this.form.get("title").value,this.form.get("description").value)
   this.seance.programs =this.form.get("program").value.map(val => ({
    "id": val.id,
  }))
      this.service.modify(this.endPoint,this.seance).subscribe((data)=>{
        if(data != undefined)
        {
        this.operation = false
        this.dataDialog = false;
        this.submitted = true;
        this.seance.programs =this.form.get("program").value
        var indice = this.service.getData(this.seance.id,this.seances)
        this.seances.splice(indice,1)
        this.seances.splice(indice,0,this.seance)
        this.service.serviceSeance(this.seances)
        this.messageService.add({severity:'success', summary: 'Succés', detail: "Les informations de la séance sont modifiées", life: 3000});
        this.seance = new Seance()
        }
        else  
        this.messageService.add({severity:'error', summary: 'Probléme', detail: "Les informations de la séance ne sont pas modifiées, veuillez vérifiez les informations saisies", life: 3000});
      });    
    }
  
  }

    onModify(exer: Seance)
    {
      this.seance = exer
      this.dataDialog = true;
       this.operation= true
       this.id=exer.id
       this.form.get("title").setValue(exer.title)
       this.form.get("description").setValue(exer.description)
       this.form.get("program").setValue(exer.programs)
       console.log(exer.programs)
    }
  
    onDelete(exer: Seance)
    {
    this.seance = exer
     this.confirmationService.confirm({
      message: "Êtes vous sur que vous voulez supprimer la séance  " + exer.title + ' ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
  });
    }

    delete()
    {
      this.service.delete(this.endPoint,this.seance.id).subscribe(()=>{
        var indice = this.service.getData(this.seance.id,this.seances)
        this.seances.splice(indice,1)
        this.service.serviceSeance(this.seances)
        this.seances = this.service.seances
        this.messageService.add({severity:'success', summary: 'Succés', detail: "La séance est supprimée", life: 3000}); 
        this.close()  
      },
          (error) => {
            this.messageService.add({severity:'error', summary: 'Probléme', detail: "La séance n'est supprimée", life: 3000});
          })
        
    }

    close()
    {
      this.confirmationService.close()
    }
}

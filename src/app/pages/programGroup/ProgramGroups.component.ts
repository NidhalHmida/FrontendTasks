import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { CoachfootballService } from 'src/app/core/coachfootball.service';
import { ProgramGroup } from 'src/app/models/programGroup.model';

@Component({
  selector: 'app-programGroups',
  templateUrl: './programGroups.component.html',
  styleUrls: ['./programGroups.component.scss']
})

export class ProgramGroupsComponent implements OnInit {
  
  endPoint= "/program_groups"
  operation : boolean  
  form : FormGroup
  id : string
  suiteprogrammes : ProgramGroup [] = []
  dataDialog: boolean;
  suiteprogramme : ProgramGroup  = new ProgramGroup()
  submitted: boolean;

  constructor(private messageService: MessageService,private router: Router,private formBuilder : FormBuilder,private service :CoachfootballService,private confirmationService: ConfirmationService) { }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'title' : [null,Validators.compose([Validators.required,this.noWhitespaceValidator])],   
      'file' : [null,Validators.compose([Validators.required])]
    })
    
    
    if(this.service.suiteprogrammes.length ==0)
    {
     this.service.get(this.endPoint).subscribe((data: ProgramGroup [])=>{  
      this.suiteprogrammes = data
      this.service.serviceSuiteprogramme(this.suiteprogrammes) 
         });
    }
    else
    this.suiteprogrammes = this.service.suiteprogrammes
  }
  
  
  resetValues()
  {
    this.form.reset()
  }

  openNew() {
  
    this.submitted = false;
    this.dataDialog = true;
    this.form.reset()
    this.operation = false
}

hideDialog() {
  this.dataDialog = false;
  this.submitted = false;
  this.form.reset()
}


  onSubmit()
  {
    if(!this.operation)
    {
         this.suiteprogramme =new ProgramGroup(undefined,this.form.get("title").value)
         this.service.add(this.endPoint,this.suiteprogramme).subscribe((data: ProgramGroup )=>{
          if(data != undefined)
          {
            this.suiteprogrammes.push(data)
            this.messageService.add({severity:'success', summary: 'Succés', detail: "Le plan d'entrainement est ajouté", life: 3000});
         this.dataDialog = false;
         this.submitted = true; 
         this.suiteprogramme = new ProgramGroup()
          }
          else
          this.messageService.add({severity:'error', summary: 'Probléme', detail: "Le plan d'entrainement n'est pas ajouté, veuillez vérifiez les informations saisies", life: 3000});
        });  
  }
    else
    {
      this.suiteprogramme= new ProgramGroup (this.id,this.form.get("title").value)
      this.service.modify(this.endPoint,this.suiteprogramme).subscribe((data: ProgramGroup )=>{
        if(data != undefined)
        {
        this.operation = false
        this.dataDialog = false;
        this.submitted = true;
        var indice = this.service.getData(data["id"],this.suiteprogrammes)

        this.suiteprogrammes.splice(indice,1)
        this.suiteprogrammes.splice(indice,0,data)
        this.service.serviceSuiteprogramme(this.suiteprogrammes)
        this.suiteprogramme = new ProgramGroup()
        this.messageService.add({severity:'success', summary: 'Succés', detail: "Les informations du plan sont modifiées", life: 3000});
      }
        else  
        this.messageService.add({severity:'error', summary: 'Probléme', detail: "Les informations de niveau ne sont pas modifiées, veuillez vérifiez les informations saisies", life: 3000});
      });      
     
        
    }
    this.dataDialog = false;
    this.submitted = true;
    this.suiteprogramme = new ProgramGroup()  }
  
  onModify(exer: ProgramGroup)
    {
      this.suiteprogramme = exer
      this.dataDialog = true;
       this.operation= true
       this.id=exer.id
       this.form.get("title").setValue(exer.title)
     
    }
    onDelete(exer: ProgramGroup)
    {
     
     this.confirmationService.confirm({
      message: "Êtes vous sur que vous voulez supprimer le plan " + exer.title + ' ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
  });
    }


    delete()
    {
      this.service.delete(this.endPoint,this.suiteprogramme.id).subscribe((data)=>{
        var indice = this.service.getData(this.suiteprogramme.id,this.suiteprogrammes)
        this.suiteprogrammes.splice(indice,1)
        this.service.serviceSuiteprogramme(this.suiteprogrammes)
        this.messageService.add({severity:'success', summary: 'Succés', detail: "Le plan d'entrainement est supprimé", life: 3000});
          },
          (error) => {
            this.messageService.add({severity:'error', summary: 'Probléme', detail: "Le plan d'entrainement n'est supprimé", life: 3000});
          })
        
    }

    close()
    {
      this.confirmationService.close()
    }
}




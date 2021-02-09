import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { CoachfootballService } from 'src/app/core/coachfootball.service';
import { Program } from 'src/app/models/program.model';
import { ProgramGroup } from 'src/app/models/programGroup.model';
import { Seance } from 'src/app/models/seance.model';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})

export class ProgramsComponent implements OnInit{

  endPoint = "/programs"
  form : FormGroup
  cols: any[];
  programmes :  Program[] =[]
  operation : boolean
  id : string
  suiteprogrammes : ProgramGroup [] = []
  dataDialog: boolean;
  programme : Program  = new Program()
  submitted: boolean;

  constructor(private messageService: MessageService,private formBuilder : FormBuilder,private service :CoachfootballService,private confirmationService: ConfirmationService) {
  }

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
    
    if(this.service.programmes.length ==0)
    {
      this.service.get(this.endPoint).subscribe((data : Program[])=>{  
        this.programmes = data
        this.service.serviceProgramme(this.programmes)  
         });
    }
    else
    this.programmes = this.service.programmes
    this.getProgramGroups()
  }

  getProgramGroups()
  {
    if(this.service.suiteprogrammes.length ==0)
    {
     this.service.get("/program_groups").subscribe((data :  ProgramGroup [])=>{  
      this.suiteprogrammes = data.map(val => ({
        "id": val.id,
        "title" :val.title,
      }))
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
    if(!this.operation)
    {
      this.programme= new Program(undefined, this.form.get("title").value,this.form.get("description").value)
      this.programme.programGroups = this.form.get("program").value.map(val => ({
        "id": val.id,
      }))
      this.service.add(this.endPoint,this.programme).subscribe((data : Program)=>{
        if(data != undefined)
        {
      this.programmes.splice(0,0,data)
      this.messageService.add({severity:'success', summary: 'Succés', detail: "Le programme est ajouté", life: 3000});
       this.dataDialog = false;
       this.submitted = true; 
       this.programme = new Program()
        }
        else
        this.messageService.add({severity:'error', summary: 'Probléme', detail: "Le programme n'est pas ajoutée, veuillez vérifiez les informations saisies", life: 3000});
      });  
  }
    else
    {

      this.programme= new Program(this.id , this.form.get("title").value,this.form.get("description").value)
      this.programme.programGroups = this.form.get("program").value.map(val => ({
        "id": val.id,
      }))
      this.service.modify(this.endPoint,this.programme).subscribe((data)=>{
        if(data != undefined)
        {
        this.operation = false
        this.dataDialog = false;
        this.submitted = true;
        this.programme.programGroups = this.form.get("program").value
        var indice = this.service.getData(this.programme.id,this.programmes)
        this.programmes.splice(indice,1)
        this.programmes.splice(indice,0,this.programme)
        this.service.serviceProgramme(this.programmes)
        this.messageService.add({severity:'success', summary: 'Succés', detail: "Les informations du programmes sont modifiées", life: 3000});
        this.programme = new Program()  
      }
        else  
        this.messageService.add({severity:'error', summary: 'Probléme', detail: "Les informations du programmes ne sont pas modifiées, veuillez vérifiez les informations saisies", life: 3000});
      });      
    }
  }

    onModify(exer: Program)
    {
      this.programme = exer
      this.dataDialog = true;
       this.operation= true
       this.id=exer.id
       this.form.get("title").setValue(exer.title)
       this.form.get("description").setValue(exer.description)
       this.form.get("program").setValue(exer.programGroups) 
    }
    
    onDelete(exer: Seance)
    {
    this.programme = exer
     this.confirmationService.confirm({
      message: "Êtes vous sur que vous voulez supprimer le programme  " + exer.title + ' ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
  });
    }

    delete()
    {
      this.service.delete(this.endPoint,this.programme.id).subscribe((data)=>{
        var indice = this.service.getData(this.programme.id,this.programmes)
        this.programmes.splice(indice,1)
        this.service.serviceProgramme(this.programmes)
        this.messageService.add({severity:'success', summary: 'Succés', detail: "Le programme est supprimé", life: 3000});
          },
          (error) => {
            this.messageService.add({severity:'error', summary: 'Probléme', detail: "Le programme n'est supprimé", life: 3000});
          })
        
    }

    close()
    {
      this.confirmationService.close()
    }
}

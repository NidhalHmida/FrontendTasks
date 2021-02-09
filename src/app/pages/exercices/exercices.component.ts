import { Component, OnInit, SimpleChanges } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms'
import { CoachfootballService } from 'src/app/core/coachfootball.service';
import { Exercice } from 'src/app/models/exercice.model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Category } from 'src/app/models/category.model';
import { Level } from 'src/app/models/level.model';
import { AgeGroup } from 'src/app/models/agegroup.model';
import { Seance } from 'src/app/models/seance.model';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.scss']
})

export class ExercicesComponent implements OnInit {

  endPoint ="/exercises"
  form : FormGroup
  cols: any[];
  exercices :Exercice[] =[]
  operation : boolean = false
  id : string
  categories: Category[]
  levels:  Level[]
  tranches:AgeGroup[]; 
  dataDialog: boolean;
  exercice : Exercice  = new Exercice()
  seances : Seance [] = []
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
      'path' : [null,Validators.compose([Validators.required])],
      'agegroup' : [null,Validators.compose([Validators.required])], 
      'level' : [null,Validators.compose([Validators.required])],
      'category' : [null,Validators.compose([Validators.required])], 
      'seance' : [null,Validators.compose([Validators.required])],   
      'file': [null,Validators.compose([Validators.required])]
    })

    if(this.service.exercices.length ==0)
    {
      this.service .get(this.endPoint).subscribe((data : Exercice[])=>{  
        this.exercices = data
        this.service.serviceExercies(this.exercices)
         });
    }
    else
    this.exercices = this.service.exercices
    this.getCategories()
    this.getLevels()
    this.getTranches()
    this.getSeances()
  }

  getSeances()
  {
    if(this.service.seances.length ==0)
    {
     this.service .get("/seances").subscribe((data: Seance[])=>{  
      this.seances=data.map(val => ({
        "id": val.id,
        "title" :val.title,
        "description" : val.description
      }))
      this.service.serviceSeance(this.seances)  
       });
    }
    else
    this.seances = this.service.seances
  }

  getCategories()
  {
    if(this.service.categories.length ==0)
    {
    this.service.get("/categories").subscribe((data : Category[])=>{    
    this.categories=data
    this.service.serviceCategory(this.categories)

   });
    }
    else
    this.categories = this.service.categories
  }

  getLevels()
  {
    if(this.service.levels.length ==0)
    {
    this.service.get("/levels").subscribe((data : Level[])=>{    
     this.levels=data
     this.service.serviceLevel(this.levels)
    });
    }
    else
    this.levels = this.service.levels
  }

  getTranches()
  {
    if(this.service.tranches.length ==0)
    {
    this.service.get("/age_groups").subscribe((data : AgeGroup[])=>{    
      this.tranches=data
      this.service.serviceTranche(this.tranches)
     });
    }
    else
    this.tranches = this.service.tranches
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
  
    this.exercice = new Exercice(undefined, this.form.get("title").value,this.form.get("description").value,this.form.get("path").value)
    this.exercice.ageGroups = this.form.get("agegroup").value.map(val => ({
      "id": val.id,
    }))
    this.exercice.categories = this.form.get("category").value.map(val => ({
      "id": val.id,
    }))
    this.exercice.levels =  this.form.get("level").value.map(val => ({
      "id": val.id,
    }))
    this.exercice.seances =  this.form.get("seance").value.map(val => ({
      "id": val.id,
    }))
    if(!this.operation)
    {
     
      this.service.add(this.endPoint,this.exercice).subscribe((data : Exercice)=>{
        if(data != undefined)
        {
      this.exercice.ageGroups= this.form.get("agegroup").value
      this.exercice.categories=  this.form.get("category").value
      this.exercice.levels=this.form.get("level").value
      this.exercice.seances=this.form.get("seance").value
       this.exercices.splice(0,0,data)
       this.hideDialog()
       this.messageService.add({severity:'success', summary: 'Succés', detail: "L'exercice est ajouté", life: 3000});   
      
        }
        else
        this.messageService.add({severity:'error', summary: 'Probléme', detail: "L'exercice n'est pas ajouté", life: 3000});
      });
  }
    else
    {
      this.exercice = new Exercice(this.id , this.form.get("title").value,this.form.get("description").value,this.form.get("path").value)
      this.exercice.ageGroups = this.form.get("agegroup").value.map(val => ({
        "id": val.id,
      }))
      this.exercice.categories = this.form.get("category").value.map(val => ({
        "id": val.id,
      }))
      this.exercice.levels =  this.form.get("level").value.map(val => ({
        "id": val.id,
      }))
      this.exercice.seances =  this.form.get("seance").value.map(val => ({
        "id": val.id,
      }))
      this.service.modify(this.endPoint,this.exercice).subscribe((data)=>{
        if(data != undefined)
        {
        this.operation = false
        var indice = this.service.getData(this.exercice.id,this.exercices)
        this.exercices.splice(indice,1)
        this.exercice.ageGroups= this.form.get("agegroup").value
        this.exercice.categories=  this.form.get("category").value
        this.exercice.levels=this.form.get("level").value
        this.exercice.seances=this.form.get("seance").value
        this.exercices.splice(indice,0,this.exercice)
        this.service.serviceExercies(this.exercices)
        this.hideDialog()
        this.exercice = new Exercice() 
        this.messageService.add({severity:'success', summary: 'Succés', detail: "Les informations de l'exercice sont modifiées", life: 3000});
        }
        else  
        this.messageService.add({severity:'error', summary: 'Probléme', detail: "Les informations de l'exercice ne sont pas modifiées", life: 3000});
      });
    }
 
  }
  onModify(exer: Exercice)
  {
   this.exercice = exer
   this.dataDialog = true;
   this.operation= true
   this.id=exer.id
   this.form.get("title").setValue(exer.title)
   this.form.get("description").setValue(exer.description)
   this.form.get("path").setValue(exer.path)
   this.form.get("agegroup").setValue(exer.ageGroups)
   this.form.get("category").setValue(exer.categories)
   this.form.get("level").setValue(exer.levels)
   this.form.get("seance").setValue(exer.seances)
  }

    
  onDelete(exer: Exercice)
  {
  this.exercice = exer
   this.confirmationService.confirm({
    message: "Êtes vous sur que vous voulez supprimer l'exercice  " + exer.title + ' ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
});
  }

  delete()
  {
    this.service.delete(this.endPoint,this.exercice.id).subscribe((data)=>{
      var indice = this.service.getData(this.exercice.id,this.exercices)
      this.exercices.splice(indice,1)
      this.service.serviceExercies(this.exercices)
      this.messageService.add({severity:'success', summary: 'Succés', detail: "L'exercice est supprimé", life: 3000});
     
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Probléme', detail: "L'exercice n'est supprimé", life: 3000});
        })
      
  }

  close()
  {
    this.confirmationService.close()
  }

}

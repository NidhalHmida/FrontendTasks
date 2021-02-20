import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TodoTasksService } from 'src/app/core/todotasks.service';
import {Task} from 'src/app/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-management.component.html',
  styleUrls: ['./tasks-management.component.scss']
})

export class TasksManagementComponent implements OnInit {
  
  endPoint= "/tasks"
  operation : boolean  
  form : FormGroup
  id : string
  tasks : Task[]=[]
  dataDialog: boolean;
  task : Task = new Task()
  submitted: boolean;
  status = [{"name":"ouverte"},{"name":"fermée"},{"name":"échouée"}]

  constructor(private messageService: MessageService,private formBuilder : FormBuilder,private service :TodoTasksService,private confirmationService: ConfirmationService) { }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  public validDate(control: FormControl) {
  
    const isValid =  new Date(control.value) > new Date();
    return isValid ? null : { 'valid': true };
  }

  public  groupValidator(group: AbstractControl): ValidationErrors | null {
    const fromCtrl = group.get('startDate');
    const toCtrl = group.get('endDate');
    const isValid =  new Date(fromCtrl.value) < new Date(toCtrl.value)
    console.log(isValid)
    return isValid ? null: { 'before' : true } ;
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'title' : [null,Validators.compose([Validators.required, Validators.pattern("^[a-zA-Zéàè:' ]+$"),this.noWhitespaceValidator])],
      'description' : [null,Validators.compose([Validators.required,this.noWhitespaceValidator])],
      'startDate' : [null,Validators.compose([Validators.required,this.validDate])] ,
      'endDate' : [null,Validators.compose([Validators.required])],
      'status' : []      
    }, {validator:this.groupValidator})
  this.getTasks()
  }
  
  
  resetValues()
  {
    this.form.reset()
  }

  openNew() {
  
    this.submitted = false;
    this.dataDialog = true;
    this.form.reset()
    this.form.get("status").setValue(this.status[0]);
    this.operation = false
}

hideDialog() {
  this.dataDialog = false;
  this.submitted = false;
  this.form.reset()
}

  getTasks()
  {
    this.service.get(this.endPoint).subscribe((data: Task [])=>{  
      this.tasks = data
         });
  }

  onSubmit()
  {
    if(!this.operation)
    {
        this.task =new Task(this.form.get("title").value,this.form.get("description").value,new DatePipe("fr-FR").transform(this.form.get("startDate").value, "yyyy-MM-dd"),new DatePipe("fr-FR").transform(this.form.get("endDate").value, "yyyy-MM-dd"),this.form.get("status").value["name"],undefined)
        this.service.add(this.endPoint,this.task).subscribe((data: Task )=>{
          if(data != null)
          {
        
            this.hideDialog()
            this.messageService.add({severity:'success', summary: 'Succés', detail: "La tâche est ajoutée", life: 3000}); 
            this.tasks.splice(0,0,data)
            this.task = new Task()
          }
          else
          this.messageService.add({severity:'error', summary: 'Probléme', detail: "La tâche n'est pas ajoutée, veuillez vérifiez les informations saisies", life: 3000});
        });  
  }
    else
    {
      this.task= new Task (this.form.get("title").value,this.form.get("description").value,new DatePipe("fr-FR").transform(this.form.get("startDate").value, "yyyy-MM-dd"),new DatePipe("fr-FR").transform(this.form.get("endDate").value, "yyyy-MM-dd"),this.form.get("status").value["name"],this.id)
      this.service.modify(this.endPoint,this.task).subscribe((data: Task )=>{
        if(data != null)
        {
        this.operation = false
        this.hideDialog()
        this.messageService.add({severity:'success', summary: 'Succés', detail: "Les informations de la tâche sont modifiées", life: 3000});
        var indice = this.service.getData(this.task.id,this.tasks)
        this.tasks.splice(indice,1)
        this.tasks.splice(indice,0,this.task)
        this.task = new Task()
        
      }
        else  
        this.messageService.add({severity:'error', summary: 'Probléme', detail: "Les informationsde la tâche ne sont pas modifiées, veuillez vérifiez les informations saisies", life: 3000});
      });      
    }
     }
  
  onModify(task : Task)
    {
      this.task=task;
      this.dataDialog = true;
       this.operation= true
       this.id=task.id
       this.form.get("title").setValue(this.task.title)
       this.form.get("description").setValue(this.task.description)
       this.form.get("startDate").setValue(this.task.startDate)
       this.form.get("endDate").setValue(this.task.endDate)
       this.form.get("status").setValue(this.task.status)
    }
    onDelete(task: Task)
    {
     this.task=task
     this.confirmationService.confirm({
      message: "Êtes vous sur que vous voulez supprimer la tâche " + task.title + ' ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
  });
    }


    delete()
    {
      this.service.delete(this.endPoint,this.task.id).subscribe((data)=>{
        var indice = this.service.getData(this.task.id,this.tasks)
        this.tasks.splice(indice,1)
        this.messageService.add({severity:'success', summary: 'Succés', detail: "La tâche est supprimée", life: 3000});
        this.close()
      },
          (error) => {
            this.messageService.add({severity:'error', summary: 'Probléme', detail: "La tâche n'est supprimée", life: 3000});
            this.close()
          })        
    }

    close()
    {
      this.confirmationService.close()
    }
}




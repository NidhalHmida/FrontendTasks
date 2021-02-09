import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoachfootballService } from 'src/app/core/coachfootball.service';
import { Level } from 'src/app/models/level.model';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {
  
  endPoint ="/levels"
  operation : boolean = false 
  form : FormGroup
  id : string
  levels : Level [] = []
  dataDialog: boolean;
  level : Level  = new Level()
  submitted: boolean;
  constructor(private messageService: MessageService,private router: Router,private formBuilder : FormBuilder,private service :CoachfootballService,private confirmationService: ConfirmationService) { }
  
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'title' : [null,Validators.compose([Validators.required, this.noWhitespaceValidator])],  
    })
    if(this.service.levels.length ==0)
    {
    this.service.get(this.endPoint).subscribe((data :Level[])=>{    
     this.levels=data
     this.service.serviceLevel(this.levels)
    });
    }
    else
    this.levels = this.service.levels
  
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
      this.level = new Level (undefined,this.form.get("title").value)
    this.service.add(this.endPoint,this.level).subscribe((data:Level)=>{
      if(data != undefined)
      {
     this.levels.splice(0,0,data)
     this.messageService.add({severity:'success', summary: 'Succés', detail: "Le niveau est ajouté", life: 3000});
     this.hideDialog()
     this.level = new Level()
      }
      else
      this.messageService.add({severity:'error', summary: 'Probléme', detail: "Le niveau n'est pas ajouté", life: 3000});
    });
   
  }
    else
    { 
      this.level = new Level (this.id,this.form.get("title").value)
      this.service.modify(this.endPoint,this.level).subscribe((data)=>{
        if(data != undefined)
        {
        var indice = this.service.getData(this.level.id,this.levels)
        this.levels.splice(indice,1)
        this.levels.splice(indice,0,this.level)
        this.service.serviceLevel(this.levels)
        this.operation = false
        this.hideDialog()
        this.level = new Level()
        this.messageService.add({severity:'success', summary: 'Succés', detail: "Les informations de niveau sont modifiées", life: 3000});
        }
        else  
        this.messageService.add({severity:'error', summary: 'Probléme', detail: "Les informations de niveau ne sont pas modifiées", life: 3000});
      });
    }
  
  }

  onModify(lv : Level)
  {
    this.level = lv
    this.dataDialog = true;
     this.operation= true
     this.id=lv.id
     this.form.get("title").setValue(lv.title)
  }

  onDelete(lv : Level)
  {
    this.level = lv
    this.confirmationService.confirm({
      message: 'Êtes vous sur que vous voulez supprimer ' + lv.title + ' ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
     
  });
  }

  delete()
  {
    this.service.delete(this.endPoint,this.level.id).subscribe((data)=>{
      var indice = this.service.getData(this.level.id,this.levels)
      this.levels.splice(indice,1)
      this.service.serviceLevel(this.levels)
      this.messageService.add({severity:'success', summary: 'Succés', detail: "Le niveau est supprimé", life: 3000});
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Probléme', detail: "Le niveau n'est pas supprimé", life: 3000});
        })
  }

  close()
  {
    this.confirmationService.close()
  }
}

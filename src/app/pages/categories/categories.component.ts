import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService,SelectItem } from 'primeng/api';
import { CoachfootballService } from 'src/app/core/coachfootball.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  endPoint = "/categories"
  operation : boolean = false 
  form : FormGroup
  id : string
  categories : Category [] = []
  dataDialog: boolean;
  category : Category  = new Category()
  submitted: boolean;
 

  constructor(private renderer : Renderer2 ,private messageService: MessageService,private router: Router,private formBuilder : FormBuilder,private service :CoachfootballService,private confirmationService: ConfirmationService) { }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'title' : [null,Validators.compose([Validators.required, this.noWhitespaceValidator])],  
    })
    if(this.service.categories.length ==0)
    {
   this.service.get(this.endPoint).subscribe((data:Category[])=>{    
    this.categories=data
    this.service.serviceCategory(this.categories)
   });
    }
    else
    this.categories = this.service.categories  
  }

  resetValues()
{
  this.form.reset()
}

openNew() {
  
  this.submitted = false;
  this.dataDialog = true;
  this.resetValues()
  this.operation =true
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
    this.category = new Category(undefined,this.form.get("title").value)
    this.service.add(this.endPoint,this.category).subscribe((data:Category)=>{
      if(data != undefined)
      {
      this.categories.push(data)
      this.hideDialog()
      this.category = new Category()
      this.messageService.add({severity:'success', summary: 'Succés', detail: "La catégorie est ajoutée", life: 3000});
      }
      else
      this.messageService.add({severity:'error', summary: 'Probléme', detail: "La catégorie n'est pas ajoutée", life: 3000});
    });
  }
    else
    {
    this.category = new Category(this.id,this.form.get("title").value)  
    this.service.modify(this.endPoint,this.category).subscribe((data:Category)=>{
      if(data != undefined)
      {
        var indice = this.service.getData(data["id"],this.categories)
    this.categories.splice(indice,1)
    this.categories.splice(indice,0,data)
    this.service.serviceCategory(this.categories)
    this.operation = false
    this.hideDialog()
    this.category = new Category()
    this.messageService.add({severity:'success', summary: 'Succés', detail: "Les informations de la catégorie sont modifiées", life: 3000});
      }
      else  
      this.messageService.add({severity:'error', summary: 'Probléme', detail: "Les informations de la catégorie ne sont pas modifiées", life: 3000});
    });

  }
  }

  onModify(lv : Category)
  {
  this.form.get("title").setValue(lv.title)
  this.dataDialog = true;
   this.operation= true
   this.id=lv.id
  
  }

  onDelete(lv : Category)
  {
    this.category =lv
   this.confirmationService.confirm({
    message: 'Êtes vous sur que vous voulez supprimer ' + lv.title + ' ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
   
});
  }

  
  delete()
  {
    this.service.delete(this.endPoint,this.category.id).subscribe((data)=>{
      var indice = this.service.getData(this.category.id,this.categories)
      this.categories.splice(indice,1)
      this.service.serviceCategory(this.categories)
      this.messageService.add({severity:'success', summary: 'Succés', detail: "La catégorie est supprimée", life: 3000});
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Probléme', detail: "La catégorie n'est pas supprimée", life: 3000});
        })
  }

  close()
  {
    this.confirmationService.close()
  }
}

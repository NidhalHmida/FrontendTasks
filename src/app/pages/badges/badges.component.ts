import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoachfootballService } from 'src/app/core/coachfootball.service';
import { Badge } from 'src/app/models/badge.model';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {

  endPoint="/badges"
  @ViewChild("fileInput") fileInput;
  operation : boolean = false 
  form : FormGroup
  id : string
  badges :  Badge []= []
  dataDialog: boolean;
  badge : Badge  = new Badge()
  submitted: boolean;

  constructor(private messageService: MessageService,private formBuilder : FormBuilder,private service :CoachfootballService,private confirmationService: ConfirmationService) { }
  
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  } 

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'title' : [null,Validators.compose([Validators.required,this.noWhitespaceValidator])],  
      'file' : [null,Validators.compose([Validators.required])],  
    })
    if(this.service.badges.length ==0)
    {
      this.service.get(this.endPoint).subscribe((data:Badge[])=>{    
        this.badges= data
    this.service.serviceBadge(this.badges)
       });
  
    }
    else
    this.badges = this.service.badges

  }

  
  openNew() {
  
    this.submitted = false;
    this.dataDialog = true;
    this.resetValues()
    this.operation =false
}

resetValues()
{
  this.form.reset()
}


hideDialog() {
  this.dataDialog = false;
  this.submitted = false;
  this.resetValues()
}

/*addFile(): void {
  let fi = this.fileInput.nativeElement;
  if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      console.log(fileToUpload)
      this.service.addBadge(this.endPoint,fileToUpload)
          .subscribe(res => {
              console.log(res);
          });
  }
}*/



  onSubmit()
  {

    if(!this.operation)
    {
      let fi = this.fileInput.nativeElement;
 /* if (fi.files && fi.files[0]) {
   /*  this.badge.path = fi.files[0];*/
   this.badge= new Badge(undefined,this.form.get("title").value,null)
     this.service.add(this.endPoint,this.badge).subscribe((data :Badge)=>{
     if(data != undefined)
     {
      this.badges.splice(0,0,data)
      this.hideDialog()
      this.messageService.add({severity:'success', summary: 'Succés', detail: "Le badge est ajouté", life: 3000});
      this.badge   = new Badge()
     }
     else
     this.messageService.add({severity:'error', summary: 'Probléme', detail: "Le badge n'est pas ajouté", life: 3000});

    });   
  }
    else
    {
      let fi = this.fileInput.nativeElement;
      /* if (fi.files && fi.files[0]) {
        /*  this.badge.path = fi.files[0];*/
        this.badge= new Badge(this.id,this.form.get("title").value,null)
    this.service.modify(this.endPoint,this.badge).subscribe((data :Badge)=>{
      if(data != undefined)
      {
        var indice = this.service.getData(data["id"],this.badges)
        this.badges.splice(indice,1)
        this.badges.splice(indice,0,data)
        this.service.serviceBadge(this.badges)
        this.operation = false
        this.hideDialog()
       /* this.badge   = new Badge()*/
        this.messageService.add({severity:'success', summary: 'Succés', detail: "les informations du badge sont modifiées", life: 3000});
      }
      else  
      this.messageService.add({severity:'error', summary: 'Probléme', detail: "les informations du badge ne sont pas modifiées", life: 3000});
    });

    

    }
    this.dataDialog = false;
    this.submitted = true;
    this.badge = new Badge()
 
  }
  onModify(lv : Badge)
  {
    this.form.get("title").setValue(lv.title)
    this.badge = lv
    this.dataDialog = true;
     this.operation= true
     this.id=lv.id
  }



  onDelete(exer: Badge)
  {
  this.badge = exer
   this.confirmationService.confirm({
    message: "Êtes vous sur que vous voulez supprimer le badge  " + exer.title + ' ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
});
  }

  delete()
  {
    this.service.delete(this.endPoint,this.badge.id).subscribe((data)=>{
      var indice = this.service.getData(this.badge,this.badges)
      this.badges.splice(indice,1)
      this.badges
      this.service.serviceBadge(this.badges)
      this.messageService.add({severity:'success', summary: 'Succés', detail: "Le  badge est supprimé", life: 3000});
        },
        (error) => {
          this.messageService.add({severity:'success', summary: 'Probléme', detail: "Le badge n'est pas supprimé", life: 3000});
        })
  }

  close()
  {
    this.confirmationService.close()
  }


}

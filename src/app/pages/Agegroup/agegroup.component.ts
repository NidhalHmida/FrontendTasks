import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoachfootballService } from 'src/app/core/coachfootball.service';
import { AgeGroup } from '../../models/agegroup.model';

@Component({
  selector: 'app-agegroup',
  templateUrl: './agegroup.component.html',
  styleUrls: ['./agegroup.component.scss']
})

export class AgeGroupComponent implements OnInit {

  endPoint="/age_groups"
  tranches : AgeGroup[] = []
  operation : boolean = false 
  form : FormGroup
  id : string
  dataDialog: boolean;
  tranche : AgeGroup  = new AgeGroup()
  submitted: boolean;
  
  constructor(private messageService: MessageService,private formBuilder : FormBuilder,private service :CoachfootballService, private confirmationService: ConfirmationService) {
  
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'title' : [null,Validators.compose([Validators.required,this.noWhitespaceValidator])],  
    })
    if(this.service.tranches.length ==0)
    {
    this.service.get(this.endPoint).subscribe((data:AgeGroup[])=>{    
      this.tranches=data
      console.log(this.tranches)
      this.service.serviceTranche(this.tranches)
     });
    }
    else
    this.tranches = this.service.tranches
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

resetValues()
{
  this.form.reset()
}

public noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}
  onSubmit()
  {
    
    if(!this.operation)
    {
    this.tranche=new AgeGroup(undefined,this.form.get("title").value)
    this.service.add(this.endPoint,this.tranche).subscribe((data:AgeGroup)=>{
      if(data != undefined)
      {
    
      this.tranches.splice(0,0,data)
      this.tranche   = new AgeGroup()
      this.hideDialog()
      this.messageService.add({severity:'success', summary: 'Succés', detail: "La tranche d'âge est ajoutée", life: 3000});
    }
    else
    this.messageService.add({severity:'error', summary: 'Probléme', detail: "La  tranche d'âge  n'est pas ajoutée", life: 3000});

  });  
    
  }
    else
    {
      
      this.tranche=new AgeGroup(this.id,this.form.get("title").value)
      this.service.modify(this.endPoint,this.tranche).subscribe((data)=>{
        if(data != undefined)
        {
          var indice = this.service.getData(this.tranche.id,this.tranches)
          this.tranches.splice(indice,1)
          this.tranches.splice(indice,0,this.tranche)
          this.service.serviceTranche(this.tranches)
          this.operation = false
          this.hideDialog()
          this.tranche   = new AgeGroup()
          this.messageService.add({severity:'success', summary: 'Succés', detail: "Les informations du tranche sont modifiées", life: 3000});
        }
        else  
        this.messageService.add({severity:'error', summary: 'Probléme', detail: "Les informations du tranche ne sont pas modifiées", life: 3000});
      });

    }
    
    }  
   
  onModify(tr : AgeGroup)
  {
    this.form.get("title").setValue(tr.title)
    this.tranche = tr
    this.dataDialog = true;
     this.operation= true
     this.id=tr.id

  }
  onDelete(lv : AgeGroup)
  {
    this.tranche = lv
   this.confirmationService.confirm({
    message: "Êtes vous sur que vous voulez supprimer le tranche d'âge " + lv.title + ' ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
  
}); 
  }

  delete()
  {
    this.service.delete(this.endPoint,this.tranche.id).subscribe((data)=>{
      var indice = this.service.getData(this.tranche.id,this.tranches)
      this.tranches.splice(indice,1)
      this.service.serviceLevel(this.tranches)
      this.messageService.add({severity:'success', summary: 'Succés', detail: "La tranche d'âge est supprimée", life: 3000});
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Probléme', detail: "La tranche d'âge n'est pas supprimée", life: 3000});
        })
  }

  close()
  {
    this.confirmationService.close()
  }



}

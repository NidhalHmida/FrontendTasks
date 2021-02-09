import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CoachfootballService } from 'src/app/core/coachfootball.service';
import { ProgramGroup } from 'src/app/models/programGroup.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  endPoint = "/users"
  id : string
  users : User [] = []
  selectedUser: User
  suiteprogrammes:ProgramGroup[]=[]
  operation : string
  dataDialog: boolean;
  user : User  = new User()
  submitted: boolean;
  items: MenuItem[];

  constructor(private messageService: MessageService,private service :CoachfootballService) { }
  
  ngOnInit(): void {
    this.items = [{
      label: 'Actions',
      items: [{
          label: 'voir détails',
          icon: 'pi pi-refresh',
          command: () => {
            this.selectedUserOperation("view")
          }
      }
      ]}
  ];

  
    if(this.service.users.length ==0)
    {
      this.service.get("/users").subscribe((data : User[])=>{ 
        this.users= data
        console.log(data)
        this.service.serviceUser(this.users)
         });
    }
    else
    this.users = this.service.users
    this.getProgramGroups()
  }
  
  public onClickMenu(rowData: any) { 
    this.selectedUser = rowData; 
    if(this.items[0]["items"].length ==1 )
    {
      if(this.selectedUser.stateCompte == "0" )
      {
       
  this.items[0]["items"].splice(1,0,{
      label: 'Activer compte',
      icon: 'pi pi-times',
      command: () => {
        this.operation = "activation"
        this.onSubmit()
       
      }
  })
  console.log(JSON.stringify(this.items[0]["items"]) +"ddddd")
}
  else 
  {
    this.items[0]["items"].splice(1,0,{
      label: 'Affecter suite de programme',
      icon: 'pi pi-times',
      command: () => {
        this.selectedUserOperation("affectation")
      }
  })
  this.items[0]["items"].splice(2,0,{
    label: 'Désactiver compte',
    icon: 'pi pi-times',
    command: () => {
      this.operation = "désactivation"
      this.onSubmit()
    }
})
}
    }
  }



  selectedUserOperation(operation)
  { 
    if(operation != 'view')
    {
    this.submitted = false;
    this.dataDialog = true;
    }
    this.operation = operation
  }


  getProgramGroups()
  {
    if(this.service.suiteprogrammes.length ==0)
    {
     this.service.get("/programgroups").subscribe((data: ProgramGroup [])=>{  
      this.suiteprogrammes = data
      this.service.serviceSuiteprogramme(this.suiteprogrammes) 
         });
    }
    else
    this.suiteprogrammes = this.service.suiteprogrammes
  }

  onSubmit()
  { 

    if(this.operation == 'activation')
    {
      this.items[0]["items"].splice(1,1)
    this.selectedUser.stateCompte = "1"
    this.selectedUser.statePayment= '1'
    }
    else if (this.operation == 'désactivation')
    {
    this.selectedUser.stateCompte = '0'  
    this.selectedUser.statePayment= '0'
    this.items[0]["items"].splice(1,2)
    }
    this.service.modify(this.endPoint,this.selectedUser).subscribe((data)=>{
      if(data != undefined)
      {
      this.dataDialog = false;
      this.submitted = true;
      var indice = this.service.getData(this.selectedUser.id,this.users)
      this.users.splice(indice,1)
      this.users.splice(indice,0,this.selectedUser)
      this.service.serviceUser(this.users)
      this.onClickMenu(this.selectedUser)
      this.messageService.add({severity:'success', summary: 'Succés', detail: "les informations de l'utilisateur sont modifiées", life: 3000}); 
    }
      else  
      this.messageService.add({severity:'error', summary: 'Probléme', detail: "les informations de l'utilisateur ne sont pas modifiées", life: 3000});
    }); 
  }

  hideDialog() {
    this.dataDialog = false;
    this.submitted = false;
  }
}

export class User {
    id:string
    fullname:string
    email:string
    password:string
    birthday:string
    image:string
    preference:string
    stateCompte : string
    statePayment : string
    programGroup : string
    constructor(id?: string,fullname? : string,stateCompte? : string,statePayment? : string, email? :string,password? :string, birthday? :string, image?:string, preference?:string )
    {
        this.id = id
        this.fullname=fullname
        this.email=email
        this.password=password
        this.birthday=birthday
        this.image=image
        this.preference=preference
        this.stateCompte=stateCompte
        this.statePayment=statePayment
    }
}

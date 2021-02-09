import { Program } from './program.model'


export class Seance {
    id :  string
    title : string
    description :string
    programs? : Program[]
 
    
    constructor(id?:string,title? : string,description? :string )
    {
        this.id = id
        this.title=title
        this.description=description
      
    }
}

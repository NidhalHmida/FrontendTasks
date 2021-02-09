import { ProgramGroup } from './programGroup.model'

export class Program {
    id :  string
    title : string
    description :string
    programGroups?: ProgramGroup[]
 
    
    constructor(id?:string,title? : string,description? :string)
    {
        this.id = id
        this.title=title
        this.description=description
      
    }
}

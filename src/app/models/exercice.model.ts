import { AgeGroup } from './agegroup.model'
import { Category } from './category.model'
import { Level } from './level.model'
import { Seance } from './seance.model'

export class Exercice {
    id :  string
    title : string
    description :string
    path : string
    seances :  Seance[]
    categories : Category[]
    ageGroups :  AgeGroup
    levels : Level
    constructor(id?:string,title? : string,description? :string,path? : string)
    {
        this.id = id
        this.title=title
        this.description=description
        this.path =path
    }

    
}

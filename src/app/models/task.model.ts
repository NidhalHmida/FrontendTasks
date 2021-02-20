export class Task {
    id? :  string
    title : string
    description : string
    startDate : string
    endDate : string
    status : string
 
    constructor(title? : string, description? : string,startDate? : string,endDate? : string, status? : string,id?:string)
    {
        this.id = id
        this.title=title
        this.description = description
        this.startDate = startDate
        this.endDate = endDate
        this.status = status
    }
}


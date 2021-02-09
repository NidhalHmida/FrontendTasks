export class Videochallenge {
    id :  string
    idCompte:string
    idBadge : string
    idSeance:string
    note :string
    opinion:string
    path:string
    title : string

    constructor(id?:string,idCompte?:string,opinion?:string ,idBadge? : string,idSeance?:string,note? :string,path?:string,title? : string)
    {
        this.id = id
        this.idCompte=idCompte
        this.idBadge=idBadge
        this.idSeance=idSeance
        this.note=note
        this.opinion = opinion
        this.path = path
        this.title = title
    }
}

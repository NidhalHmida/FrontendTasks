export class Training {
    id :  string
    idCompte:string
    idExercice:string
    reference : string
    startTime :string
    endTime:string
    opinion: string
    duration :string
    constructor(id:string,reference : string,start :string,end :string,idUser :string,idExercice:string,opinion:string,duration:string)
    {
        this.id = id
        this.reference=reference
        this.startTime=start
        this.idCompte=idUser
        this.endTime=end
        this.idExercice=idExercice
        this.opinion = opinion
        this.duration = duration
    }
}

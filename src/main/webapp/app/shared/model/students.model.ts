export interface IStudents {
    id?: number;
    prenom?: string;
    nom?: string;
    age?: number;
}

export class Students implements IStudents {
    constructor(public id?: number, public prenom?: string, public nom?: string, public age?: number) {}
}

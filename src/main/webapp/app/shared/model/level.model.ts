import { IStudents } from 'app/shared/model/students.model';

export interface ILevel {
    id?: number;
    name?: string;
    years?: number;
    students_level?: IStudents;
}

export class Level implements ILevel {
    constructor(public id?: number, public name?: string, public years?: number, public students_level?: IStudents) {}
}

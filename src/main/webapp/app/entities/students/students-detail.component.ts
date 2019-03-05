import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudents } from 'app/shared/model/students.model';

@Component({
    selector: 'jhi-students-detail',
    templateUrl: './students-detail.component.html'
})
export class StudentsDetailComponent implements OnInit {
    students: IStudents;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ students }) => {
            this.students = students;
        });
    }

    previousState() {
        window.history.back();
    }
}

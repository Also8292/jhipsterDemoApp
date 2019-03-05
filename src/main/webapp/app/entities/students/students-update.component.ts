import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IStudents } from 'app/shared/model/students.model';
import { StudentsService } from './students.service';

@Component({
    selector: 'jhi-students-update',
    templateUrl: './students-update.component.html'
})
export class StudentsUpdateComponent implements OnInit {
    students: IStudents;
    isSaving: boolean;

    constructor(protected studentsService: StudentsService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ students }) => {
            this.students = students;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.students.id !== undefined) {
            this.subscribeToSaveResponse(this.studentsService.update(this.students));
        } else {
            this.subscribeToSaveResponse(this.studentsService.create(this.students));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudents>>) {
        result.subscribe((res: HttpResponse<IStudents>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

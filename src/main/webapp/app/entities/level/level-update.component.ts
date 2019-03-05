import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILevel } from 'app/shared/model/level.model';
import { LevelService } from './level.service';
import { IStudents } from 'app/shared/model/students.model';
import { StudentsService } from 'app/entities/students';

@Component({
    selector: 'jhi-level-update',
    templateUrl: './level-update.component.html'
})
export class LevelUpdateComponent implements OnInit {
    level: ILevel;
    isSaving: boolean;

    students: IStudents[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected levelService: LevelService,
        protected studentsService: StudentsService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ level }) => {
            this.level = level;
        });
        this.studentsService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IStudents[]>) => mayBeOk.ok),
                map((response: HttpResponse<IStudents[]>) => response.body)
            )
            .subscribe((res: IStudents[]) => (this.students = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.level.id !== undefined) {
            this.subscribeToSaveResponse(this.levelService.update(this.level));
        } else {
            this.subscribeToSaveResponse(this.levelService.create(this.level));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILevel>>) {
        result.subscribe((res: HttpResponse<ILevel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackStudentsById(index: number, item: IStudents) {
        return item.id;
    }
}

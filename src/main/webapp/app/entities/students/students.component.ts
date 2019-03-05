import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStudents } from 'app/shared/model/students.model';
import { AccountService } from 'app/core';
import { StudentsService } from './students.service';

@Component({
    selector: 'jhi-students',
    templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit, OnDestroy {
    students: IStudents[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected studentsService: StudentsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.studentsService
            .query()
            .pipe(
                filter((res: HttpResponse<IStudents[]>) => res.ok),
                map((res: HttpResponse<IStudents[]>) => res.body)
            )
            .subscribe(
                (res: IStudents[]) => {
                    this.students = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStudents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStudents) {
        return item.id;
    }

    registerChangeInStudents() {
        this.eventSubscriber = this.eventManager.subscribe('studentsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

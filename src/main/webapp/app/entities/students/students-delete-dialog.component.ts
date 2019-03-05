import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudents } from 'app/shared/model/students.model';
import { StudentsService } from './students.service';

@Component({
    selector: 'jhi-students-delete-dialog',
    templateUrl: './students-delete-dialog.component.html'
})
export class StudentsDeleteDialogComponent {
    students: IStudents;

    constructor(protected studentsService: StudentsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studentsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'studentsListModification',
                content: 'Deleted an students'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-students-delete-popup',
    template: ''
})
export class StudentsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ students }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StudentsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.students = students;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/students', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/students', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

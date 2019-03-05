/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterDemoAppTestModule } from '../../../test.module';
import { StudentsDeleteDialogComponent } from 'app/entities/students/students-delete-dialog.component';
import { StudentsService } from 'app/entities/students/students.service';

describe('Component Tests', () => {
    describe('Students Management Delete Component', () => {
        let comp: StudentsDeleteDialogComponent;
        let fixture: ComponentFixture<StudentsDeleteDialogComponent>;
        let service: StudentsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemoAppTestModule],
                declarations: [StudentsDeleteDialogComponent]
            })
                .overrideTemplate(StudentsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StudentsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterDemoAppTestModule } from '../../../test.module';
import { StudentsUpdateComponent } from 'app/entities/students/students-update.component';
import { StudentsService } from 'app/entities/students/students.service';
import { Students } from 'app/shared/model/students.model';

describe('Component Tests', () => {
    describe('Students Management Update Component', () => {
        let comp: StudentsUpdateComponent;
        let fixture: ComponentFixture<StudentsUpdateComponent>;
        let service: StudentsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemoAppTestModule],
                declarations: [StudentsUpdateComponent]
            })
                .overrideTemplate(StudentsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StudentsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentsService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Students(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.students = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Students();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.students = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});

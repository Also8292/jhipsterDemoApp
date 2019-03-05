/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterDemoAppTestModule } from '../../../test.module';
import { StudentsDetailComponent } from 'app/entities/students/students-detail.component';
import { Students } from 'app/shared/model/students.model';

describe('Component Tests', () => {
    describe('Students Management Detail Component', () => {
        let comp: StudentsDetailComponent;
        let fixture: ComponentFixture<StudentsDetailComponent>;
        const route = ({ data: of({ students: new Students(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemoAppTestModule],
                declarations: [StudentsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StudentsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StudentsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.students).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

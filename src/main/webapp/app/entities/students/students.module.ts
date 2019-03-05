import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterDemoAppSharedModule } from 'app/shared';
import {
    StudentsComponent,
    StudentsDetailComponent,
    StudentsUpdateComponent,
    StudentsDeletePopupComponent,
    StudentsDeleteDialogComponent,
    studentsRoute,
    studentsPopupRoute
} from './';

const ENTITY_STATES = [...studentsRoute, ...studentsPopupRoute];

@NgModule({
    imports: [JhipsterDemoAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StudentsComponent,
        StudentsDetailComponent,
        StudentsUpdateComponent,
        StudentsDeleteDialogComponent,
        StudentsDeletePopupComponent
    ],
    entryComponents: [StudentsComponent, StudentsUpdateComponent, StudentsDeleteDialogComponent, StudentsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDemoAppStudentsModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'students',
                loadChildren: './students/students.module#JhipsterDemoAppStudentsModule'
            },
            {
                path: 'level',
                loadChildren: './level/level.module#JhipsterDemoAppLevelModule'
            },
            {
                path: 'level',
                loadChildren: './level/level.module#JhipsterDemoAppLevelModule'
            },
            {
                path: 'level',
                loadChildren: './level/level.module#JhipsterDemoAppLevelModule'
            },
            {
                path: 'level',
                loadChildren: './level/level.module#JhipsterDemoAppLevelModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDemoAppEntityModule {}

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Students } from 'app/shared/model/students.model';
import { StudentsService } from './students.service';
import { StudentsComponent } from './students.component';
import { StudentsDetailComponent } from './students-detail.component';
import { StudentsUpdateComponent } from './students-update.component';
import { StudentsDeletePopupComponent } from './students-delete-dialog.component';
import { IStudents } from 'app/shared/model/students.model';

@Injectable({ providedIn: 'root' })
export class StudentsResolve implements Resolve<IStudents> {
    constructor(private service: StudentsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStudents> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Students>) => response.ok),
                map((students: HttpResponse<Students>) => students.body)
            );
        }
        return of(new Students());
    }
}

export const studentsRoute: Routes = [
    {
        path: '',
        component: StudentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: StudentsDetailComponent,
        resolve: {
            students: StudentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: StudentsUpdateComponent,
        resolve: {
            students: StudentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: StudentsUpdateComponent,
        resolve: {
            students: StudentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: StudentsDeletePopupComponent,
        resolve: {
            students: StudentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

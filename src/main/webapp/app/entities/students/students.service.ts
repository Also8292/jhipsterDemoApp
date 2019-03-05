import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudents } from 'app/shared/model/students.model';

type EntityResponseType = HttpResponse<IStudents>;
type EntityArrayResponseType = HttpResponse<IStudents[]>;

@Injectable({ providedIn: 'root' })
export class StudentsService {
    public resourceUrl = SERVER_API_URL + 'api/students';

    constructor(protected http: HttpClient) {}

    create(students: IStudents): Observable<EntityResponseType> {
        return this.http.post<IStudents>(this.resourceUrl, students, { observe: 'response' });
    }

    update(students: IStudents): Observable<EntityResponseType> {
        return this.http.put<IStudents>(this.resourceUrl, students, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStudents>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStudents[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

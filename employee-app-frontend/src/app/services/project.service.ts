import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8080/api/project';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }

  addProject(project: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createProject`, project);
  }

  getProjectById(projId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getProject/${projId}`);
  }
}

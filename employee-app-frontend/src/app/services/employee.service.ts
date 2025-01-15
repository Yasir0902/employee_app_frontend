import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/api/employee';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }

  getEmployeeById(empId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getEmployee/${empId}`);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createEmployee`, employee);
  }

  addEmployeeWithProject(employee: any, projId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/createEmployeeForProject/${projId}`, employee);
  }

  assignProjectToEmployee(empId: number, projId: number): Observable<any> {
    const url = `${this.baseUrl}/assignProjectToEmployee/${empId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, projId, { headers });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule],
  template: `
  <h2>Employee List</h2>
  <form (submit)="addEmployee()">
  <input name="name" type="text" [(ngModel)]="newEmployee.name" placeholder="Name" required>
  <input name="email" type="email" [(ngModel)]="newEmployee.email" placeholder="Email" required>
  <input name="technicalSkill" type="text" [(ngModel)]="newEmployee.technicalSkill" placeholder="Skill" required>
  <button type="submit">Add Employee</button>
</form>
  <ul>
    <li *ngFor="let employee of employees">
      {{ employee.name }} ({{ employee.email }}) - {{ employee.technicalSkill }}
    </li>
  </ul>
`,
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  newEmployee = { name: '', email: '', technicalSkill: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.http.get('http://localhost:8080/api/employee/getAllEmployees')
      .subscribe((data: any) => this.employees = data);
  }

  addEmployee(): void {
    this.http.post('http://localhost:8080/api/employee/createEmployee', this.newEmployee)
      .subscribe(() => {
        this.getEmployees();
        this.newEmployee = { name: '', email: '', technicalSkill: '' };
      });
  }
}

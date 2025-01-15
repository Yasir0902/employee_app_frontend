import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Employee List</h2>
    <form #employeeForm="ngForm" (ngSubmit)="addEmployee(employeeForm)">
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

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(
        (data: any) => this.employees = data,
        (error) => console.error('Error fetching employees:', error)
      );
  }

  addEmployee(form: NgForm): void {
    if (!this.newEmployee.name || !this.newEmployee.email || !this.newEmployee.technicalSkill) {
      alert('Please fill out all fields.');
      return;
    }

    this.employeeService.addEmployee(this.newEmployee)
      .subscribe(
        () => {
          this.getEmployees();
          this.newEmployee = { name: '', email: '', technicalSkill: '' };
          form.resetForm();
          alert('Employee added successfully!');
        },
        (error) => console.error('Error adding employee:', error)
      );
  }
}

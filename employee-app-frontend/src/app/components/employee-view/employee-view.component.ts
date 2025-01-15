// employee-view.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>View Employee Details by ID</h2>

    <form (ngSubmit)="fetchEmployee()">
      <label for="employeeId">Enter Employee ID:</label>
      <input
        id="employeeId"
        type="number"
        name="employeeId"
        [(ngModel)]="employeeId"
        required
      >
      <button type="submit">Show Details</button>
    </form>

    <div *ngIf="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>

    <div *ngIf="employee">
      <h3>Employee Details</h3>
      <p><strong>ID:</strong> {{ employee.id }}</p>
      <p><strong>Name:</strong> {{ employee.name }}</p>
      <p><strong>Email:</strong> {{ employee.email }}</p>
      <p><strong>Technical Skill:</strong> {{ employee.technicalSkill }}</p>

      <h4>Projects</h4>
      <ul *ngIf="employee.projects?.length > 0; else noProjects">
        <li *ngFor="let proj of employee.projects">
          <strong>ID:</strong> {{ proj.id }}<br>
          <strong>Name:</strong> {{ proj.projectName }}<br>
          <strong>Tech Used:</strong> {{ proj.technologyUsed }}
          <hr>
        </li>
      </ul>
      <ng-template #noProjects>
        <p>No Projects Assigned</p>
      </ng-template>
    </div>
  `,
  styles: [`
    h2 {
      color: #2c3e50;
      margin-bottom: 20px;
    }
    form {
      margin-bottom: 20px;
    }
    label {
      margin-right: 10px;
      font-weight: 600;
    }
    input {
      padding: 5px;
      width: 150px;
      margin-right: 10px;
    }
    button {
      padding: 5px 10px;
      background-color: #2980b9;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }
    button:hover {
      background-color: #1c5980;
    }
    .error {
      color: #c0392b;
      font-weight: 600;
      margin-bottom: 10px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      background: #ecf0f1;
      border-radius: 4px;
      margin-bottom: 10px;
      padding: 10px;
    }
  `]
})
export class EmployeeViewComponent {
  employeeId!: number;
  employee: any;
  errorMessage: string = '';
  constructor(private employeeService: EmployeeService) {}

  fetchEmployee(): void {
    if (!this.employeeId) {
      this.errorMessage = 'Please enter a valid Employee ID.';
      return;
    }

    this.errorMessage = '';
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => {
        console.error('Error fetching employee:', err);
        if (err.status === 404) {
          this.errorMessage = `Employee with ID ${this.employeeId} not found.`;
        } else {
          this.errorMessage = 'An error occurred while fetching employee details.';
        }
        this.employee = null;
      }
    });
  }
}

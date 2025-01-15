import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-assign-project',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Assign Project to Employee</h2>
    <form (submit)="assignProjectToEmployee($event)">
      <label for="employeeId">Employee ID:</label>
      <input name="employeeId" type="number" [(ngModel)]="assignment.employeeId" id="employeeId" required>

      <label for="projectId">Project ID:</label>
      <input name="projectId" type="number" [(ngModel)]="assignment.projectId" id="projectId" required>

      <button type="submit">Assign Project</button>
    </form>
  `,
})
export class AssignProjectComponent {
  assignment = { employeeId: null, projectId: null };

  constructor(private employeeService: EmployeeService) {}

  assignProjectToEmployee(event: Event): void {
    event.preventDefault();

    const { employeeId, projectId } = this.assignment;

    if (!employeeId || !projectId) {
      alert('Please provide both Employee ID and Project ID.');
      return;
    }

    this.employeeService.assignProjectToEmployee(employeeId, projectId)
      .subscribe(
        () => {
          this.assignment = { employeeId: null, projectId: null };
          alert('Project assigned successfully!');
        },
      );
  }
}

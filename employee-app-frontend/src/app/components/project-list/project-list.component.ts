import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: true,
  template: `
    <h2>Project List</h2>
    <form (submit)="addProject()">
  <input name="projectName" type="text" [(ngModel)]="newProject.projectName" placeholder="Project Name" required>
  <input name="technologyUsed" type="text" [(ngModel)]="newProject.technologyUsed" placeholder="Technology Used" required>
  <button type="submit">Add Project</button>
</form>

    <ul>
      <li *ngFor="let project of projects">
        {{ project.projectName }} ({{ project.technologyUsed }})
      </li>
    </ul>
  `,
  styles: [],
  imports: [FormsModule]
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  newProject = { projectName: '', technologyUsed: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.http.get('http://localhost:8080/api/project/getAllProjects')
      .subscribe((data: any) => this.projects = data);
  }

  addProject(): void {
    this.http.post('http://localhost:8080/api/project/createProject', this.newProject)
      .subscribe(() => {
        this.getProjects();
        this.newProject = { projectName: '', technologyUsed: '' };
      });
  }
}

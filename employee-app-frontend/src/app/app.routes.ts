import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AssignProjectComponent } from './components/assign-project/assign-project.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'assign-project', component: AssignProjectComponent },
];

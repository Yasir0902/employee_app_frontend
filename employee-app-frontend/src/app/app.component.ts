import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <h1>Employee-Project Management</h1>
    <nav>
      <ul>
        <li><a routerLink="/employees" routerLinkActive="active">Employees</a></li>
        <li><a routerLink="/projects" routerLinkActive="active">Projects</a></li>
        <li><a routerLink="/assign-project" routerLinkActive="active">Assign Project</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      nav {
        margin: 20px 0;
      }
      nav ul {
        list-style: none;
        padding: 0;
        display: flex;
        gap: 10px;
      }
      nav ul li {
        display: inline;
      }
      nav ul li a {
        text-decoration: none;
        padding: 5px 10px;
        background: #007bff;
        color: white;
        border-radius: 5px;
      }
      nav ul li a.active {
        background: #0056b3;
      }
    `,
  ],
})
export class AppComponent {}

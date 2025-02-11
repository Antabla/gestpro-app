import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand ps-2" href="#"> GestPro </a>
      <button
        class="btn btn-sm btn-danger ms-auto me-2"
        (click)="logout()"
      >
        Log Out
      </button>
    </nav>
  `,
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}

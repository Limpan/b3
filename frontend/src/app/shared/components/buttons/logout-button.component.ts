import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  template: `
  <button class="text-gray-600 hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-sm font-medium" (click)="handleLogout()">Log Out</button>
  `
})
export class LogoutButtonComponent {

  constructor(
    private auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }
}

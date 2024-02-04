import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="text-gray-600 hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-sm font-medium" (click)="handleLogin()">Log In</button>
  `
})
export class LoginButtonComponent {

  constructor(private auth: AuthService) {}

    handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/profile',
      },
    });
  }
}

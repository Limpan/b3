import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarLinkComponent } from './nav-bar-link.component'
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar-links',
  standalone: true,
  imports: [CommonModule, NavBarLinkComponent],
  templateUrl: './nav-bar-links.component.html'
})
export class NavBarLinksComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(private authService: AuthService) {}
}

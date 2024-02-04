import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../shared/components/page-layout.component';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  title = 'Decoded ID Token';

  user$ = this.authService.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));

  constructor(private authService: AuthService) {}
}

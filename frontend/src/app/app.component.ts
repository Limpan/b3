import { Component } from '@angular/core';
import { RouterModule, } from '@angular/router';
import { PageLoaderComponent } from './shared/components/page-loader.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, PageLoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isAuth0Loading$ = this.authService.isLoading$;
  
  constructor(private authService: AuthService) {}
}

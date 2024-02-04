import { Component } from '@angular/core';
import { NavBarComponent } from './navigation/nav-bar.component';
import { PageFooterComponent } from './page-footer.component';

@Component({
  standalone: true,
  imports: [NavBarComponent, PageFooterComponent],
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html'
})
export class PageLayoutComponent {}

import { Component } from '@angular/core';
import { NavBarButtonsComponent } from './nav-bar-buttons.component';
import { NavBarLinksComponent } from './nav-bar-links.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NavBarButtonsComponent, NavBarLinksComponent],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

}

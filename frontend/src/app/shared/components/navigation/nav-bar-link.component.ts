import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-nav-bar-link',
  template: `
    <a
      [routerLink]="path"
      class="text-gray-600 hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-sm font-medium"
      routerLinkActive="bg-gray-200 text-black rounded-md px-3 py-2 text-sm font-medium"
    >
      {{ label }}
    </a>
  `,
})
export class NavBarLinkComponent {
  @Input() path: string | undefined;
  @Input() label: string | undefined;
}

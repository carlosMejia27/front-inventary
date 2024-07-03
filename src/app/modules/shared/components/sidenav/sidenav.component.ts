import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  mobileQuery: MediaQueryList;
  menuNav = [
    {
      name: 'Home',
      route: 'home',
      icon: 'Home',
    },
    {
      name: 'Categorias',
      route: 'category',
      icon: 'Categorias',
    },
    {
      name: 'Products',
      route: 'home',
      icon: 'production_quantity_limits',
    },
  ];
  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-widh: 600px)');
  }
}

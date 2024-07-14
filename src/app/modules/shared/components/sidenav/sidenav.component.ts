import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  mobileQuery: MediaQueryList;
  private keycloakService = inject(KeycloakService);
  userName: any;
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
      route: 'products',
      icon: 'production_quantity_limits',
    },
  ];
  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-widh: 600px)');
    this.userName = this.keycloakService.getUsername();
  }

  logout() {
    this.keycloakService.logout();
  }
}

import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private keycloakService: KeycloakService) {}

  getRoles() {
    return this.keycloakService.getUserRoles();
  }

  isAdmin() {
    let role = this.keycloakService
      .getUserRoles()
      .filter((role) => role === 'Admin');

    if (role.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}

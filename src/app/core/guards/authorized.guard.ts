import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  canActivate() {
    const isAuthorized = this.auth.isAuthenticated;
    
    if (!isAuthorized) {
      this.router.navigate(['/auth']);
    }

    return isAuthorized;
  }

  constructor(private auth: AuthService, private router: Router) { }
}

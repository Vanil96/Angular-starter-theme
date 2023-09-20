import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard  {
  canActivate() {
    const isAuthorized = this.auth.isAuthenticated;
    
    if (!isAuthorized) {
      this.router.navigate(['/auth']);
    }

    return isAuthorized;
  }

  constructor(private auth: AuthService, private router: Router) { }
}

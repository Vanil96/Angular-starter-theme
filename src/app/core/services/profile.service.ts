import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, filter, map } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  private userRequest: Observable<User | null> | null;
  constructor(private auth: AuthService) { }


  getUserProfile(): Observable<User | null> {
    console.log('Get User Profile from: profile.service')
    if (!this.userRequest) {
      this.userRequest = this.auth.state.pipe(
        filter(() => this.auth.isAuthenticated),
        map(() => this.auth.getCurrentUser()),
      )
    }
    return this.userRequest;
  }

  clearCache(): void {
    this.userRequest = null;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserApiModel } from '../models/user.api-model';
import { Observable, shareReplay, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private user_request: Observable<UserApiModel> | null;


  getUserProfile(): Observable<UserApiModel> {
    if (!this.user_request) {
      this.user_request = this.http.get('users/5').pipe(
        shareReplay()
      );
    }
    return this.user_request;
  }

  clearCache(): void {
    this.user_request = null;
  }

  constructor(private http: HttpClient) { }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserApiModel } from '../models/user.api-model';
import { Observable, shareReplay, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private userRequest: Observable<UserApiModel> | null;


  getUserProfile(): Observable<UserApiModel> {
    if (!this.userRequest) {
      this.userRequest = this.http.get('users/5').pipe(
        shareReplay()
      );
    }
    return this.userRequest;
  }

  clearCache(): void {
    this.userRequest = null;
  }

  constructor(private http: HttpClient) { }
}

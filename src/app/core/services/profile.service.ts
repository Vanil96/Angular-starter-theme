import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAPiModel } from '../models/user.api-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  getUserProfile() {
   return this.http.get<UserAPiModel>('users/1');
  }

  constructor(private http: HttpClient) { }
}

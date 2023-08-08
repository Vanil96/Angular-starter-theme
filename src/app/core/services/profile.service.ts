import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserApiModel } from '../models/user.api-model';
import { Observable, share,} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  user_request = this.http.get('users/1').pipe(
    share()
  );


 getUserProfile(): Observable<UserApiModel>{
  return this.user_request;
 }

  constructor(private http: HttpClient) {}
}

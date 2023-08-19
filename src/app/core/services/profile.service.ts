import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, catchError, filter, map, } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


export interface Todo {
  id: number,
  title: string,
  completed: boolean
}

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  private userRequest: Observable<User | null> | null;

  constructor(private auth: AuthService, private http: HttpClient) { }


  getUserProfile(): Observable<User | null> {
    console.log('Observable getUserProfile')
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


  //temporary todo for testing authorization
  createTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>('todos', todo, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.getToken()
      }
    }).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          this.auth.logout('Non authorized, please login');
          throw new Error(err.message);
        }
        throw new Error('Unusual error');
      })
    );
  }

}

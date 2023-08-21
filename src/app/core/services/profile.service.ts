import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, filter, map, share, switchMap, } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';


export interface Todo {
  id: number,
  title: string,
  completed: boolean
}

interface Params {
  perPage: number,
  phrase: string
}

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  private userRequest: Observable<User | null> | null;

  constructor(private auth: AuthService, private http: HttpClient) { }
  params = new BehaviorSubject<Params>({
    perPage: 10,
    phrase: ''
  })

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


  //temporary todo for testing authorization
  apiTest_createTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>('todos', todo);
  }

  apiTest_getTodos() {
    return this.params.pipe(
      switchMap(
        (params => this.http.get<Todo[]>('todos', {
          params: {
            q: params.phrase,
            _limit: params.perPage
          }
        }))),
      share()
    )
  }

  apiTest_setPerPage(perPage: number) {
    console.log(perPage)
    this.params.next({
      ...this.params.getValue(),
      perPage
    }
    )
  }

  apiTest_setPhrase(phrase: string) {
    this.params.next({
      ...this.params.getValue(),
      phrase
    })
  }
}

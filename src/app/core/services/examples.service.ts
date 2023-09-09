import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, share, switchMap } from 'rxjs';


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
export class ExamplesService {

  constructor(private http: HttpClient) { }
  params = new BehaviorSubject<Params>({
    perPage: 10,
    phrase: ''
  })



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



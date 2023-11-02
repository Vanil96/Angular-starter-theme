import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';

interface Credentials {
  username: string;
  password: string;
}

interface Session {
  token: string | null,
  user: User | null,
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private session = new BehaviorSubject<Session | null>(this.getStoredSession());
  isAuthenticated = false;
  constructor(private http: HttpClient, private router: Router) { }

  state = this.session.pipe(
    map(session => !!session && !!session.token),
    tap(state => {
      this.isAuthenticated = state
    })
  )


  login(credentials: Credentials) {
    this.http.post<Session>('login', credentials).subscribe(
      {
        next: (session: Session) => {
          this.session.next(session);
          this.storeSession(session);
          this.router.navigate(['/profile']);
        },
        error: err => {
          if (err instanceof HttpErrorResponse) console.error(err.error)
        }
      }
    )
  }

  logout(): void {
    localStorage.removeItem('session');
    this.router.navigate(['/auth']);
    const session = this.session.getValue();
    if (session) {
      this.session.next(
        {
          ...session,
          token: null,
        })
    }
  }

  getToken() {
    const session = this.session.getValue()
    return session && session.token;
  }

  getCurrentUser() {
    const session = this.session.getValue();
    return session && session.user;
  }

  private storeSession(session: Session) {
    localStorage.setItem('session', JSON.stringify(session));
  }

  private getStoredSession(): Session | null {
    const storedSession = localStorage.getItem('session');
    return storedSession ? JSON.parse(storedSession) : null;
  }
}
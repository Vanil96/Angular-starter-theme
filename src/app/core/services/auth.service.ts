import { Injectable } from '@angular/core';

interface Credentials {
  username:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  login(credentials:Credentials) {
    console.log(credentials);
  }
}

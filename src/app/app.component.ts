import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(private auth: AuthService) {
    this.auth.state.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }
}


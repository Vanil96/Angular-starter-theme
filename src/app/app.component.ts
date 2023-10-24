import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isAuthenticated = false;

  constructor(private auth: AuthService, private translateService: TranslateService) {
    this.auth.state.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use('en');
  }
}


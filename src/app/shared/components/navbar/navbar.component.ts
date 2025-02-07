import { Component, Input, OnInit } from '@angular/core';
import { User } from '@app/core/models/user.model';
import { AuthService } from '@app/core/services/auth.service';
import { ProfileService } from '@app/core/services/profile.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent implements OnInit {
  @Input() isAuthenticated = false;
  user$: Observable<User | null>

  constructor(private profileService: ProfileService, protected auth: AuthService) { }
  ngOnInit(): void {
    this.user$ = this.profileService.getUserProfile();
  }
  
}

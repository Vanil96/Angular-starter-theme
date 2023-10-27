import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss']
})
export class ProfileBarComponent implements OnInit {
  user$: Observable<User | null>

  constructor(private profileService: ProfileService, protected auth: AuthService) { }
  ngOnInit(): void {
    this.user$ = this.profileService.getUserProfile();
  }
}

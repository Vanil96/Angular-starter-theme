import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null>
  constructor(protected profileService: ProfileService) { }

  ngOnInit(): void {
    this.user$ = this.profileService.getUserProfile();
  }
}

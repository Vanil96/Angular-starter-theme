import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss']
})
export class ProfileBarComponent implements OnInit, OnDestroy {
  user: User | null;
  private subscriptions: Subscription[] = []

  constructor(private profileService: ProfileService, protected auth: AuthService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.profileService.getUserProfile().subscribe(user => { this.user = user; console.log('Profile bar get user') })
      )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}

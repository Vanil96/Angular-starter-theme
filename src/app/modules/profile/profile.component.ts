import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserApiModel } from 'src/app/core/models/user.api-model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserApiModel;
  private subscriptions: Subscription[] = []
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  refreshProfile(): void {
    this.profileService.clearCache();
    this.getProfile();
  }

  getProfile(): void {
    this.subscriptions.push(
      this.profileService.getUserProfile().subscribe(user => this.user = user)
    )
  }
}

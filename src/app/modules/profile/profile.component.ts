import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null;
  private subscriptions: Subscription[] = []
  error: string;
  constructor(protected profileService: ProfileService) { }

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
      this.profileService.getUserProfile().subscribe(user => { this.user = user;})
    )
  }



}

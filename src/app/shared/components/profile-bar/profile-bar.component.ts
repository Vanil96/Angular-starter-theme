import { Component, OnInit } from '@angular/core';
import { UserApiModel } from 'src/app/core/models/user.api-model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss']
})
export class ProfileBarComponent implements OnInit {
  user:UserApiModel | undefined;

  constructor(private profileService:ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(user => this.user = user)
  }

}

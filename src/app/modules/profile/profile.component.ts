import { Component, OnInit } from '@angular/core';
import { UserAPiModel } from 'src/app/core/models/user.api-model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserAPiModel = {};

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(user => { 
      this.user = user; 
      console.log(this.user) 
    })
  }

}

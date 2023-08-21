import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null;
  private subscriptions: Subscription[] = []
  error: String;
  $todos = this.profileService.apiTest_getTodos();
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
      this.profileService.getUserProfile().subscribe(user => { this.user = user; console.log('Profile get user') })
    )
  }

  addTodo(title: string) {
    this.profileService.apiTest_createTodo({ title }).subscribe(() => {
      console.log('success apiTest_createTodo');
    }, err => {
      this.error = err.message
    });
  }

  search(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.profileService.apiTest_setPhrase(inputValue);
  }

  setPerPage(event: Event) {
    const inputValue:number = parseInt((event.target as HTMLInputElement).value);
    this.profileService.apiTest_setPerPage(inputValue);
  }


}

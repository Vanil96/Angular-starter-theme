import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  error: String;
  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
  }

  addTodo(title: string) {
    this.profileService.createTodo({ title }).subscribe(() => {
      console.log('success')
    }, err => {
      this.error = err.message
    });
  }

}

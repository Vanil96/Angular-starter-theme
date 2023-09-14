import { ExamplesService } from './../../../../core/services/examples.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit {
  $todos = this.examplesService.apiTest_getTodos();
  error: String;

  constructor(protected examplesService: ExamplesService) { }

  ngOnInit(): void { }

  addTodo(title: string) {
    this.examplesService.apiTest_createTodo({ title }).subscribe(() => {
      console.log('success apiTest_createTodo');
    }, err => {
      this.error = err.message
    });
  }

  search(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.examplesService.apiTest_setPhrase(inputValue);
  }

  setPerPage(event: Event) {
    const inputValue: number = parseInt((event.target as HTMLInputElement).value);
    this.examplesService.apiTest_setPerPage(inputValue);
  }

}

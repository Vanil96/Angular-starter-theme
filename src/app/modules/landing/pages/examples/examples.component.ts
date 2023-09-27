import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamplesService } from './../../../../core/services/examples.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent {
  $todos = this.examplesService.apiTest_getTodos();
  error: string;
  form:FormGroup;
  defaultControl = new FormControl('');

  list = [{label:'label 1', value: 1}, {label:'blok 2', value: 2}, {label:'element 3', value: 3}, {label:'dywan 4', value: 4}]

  constructor(protected examplesService: ExamplesService, private fb: FormBuilder) {
  this.form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', [Validators.minLength(8), Validators.required]],
    gender:[''],
    country: [''],
    agree: [false, Validators.requiredTrue],
    birthdate:[''],
    description:[''],
    hobbies: this.fb.array([new FormControl('')])
  })
  }


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

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  onSubmit() {
    if(this.form.valid) {
      console.log('Form submitted', this.form.value);
    }
  }

}

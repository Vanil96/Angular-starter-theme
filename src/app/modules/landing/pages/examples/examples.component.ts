import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamplesService } from './../../../../core/services/examples.service';
import { Component } from '@angular/core';
import { CheckboxOption, RadioOption } from '@app/core/models/option.model';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent {
  $todos = this.examplesService.apiTest_getTodos();
  error: string;
  form: FormGroup;
  defaultControl: FormControl = new FormControl([]);
  someValue = false;

  list1 = [{ label: 'label 1', value: 1 }, { label: 'blok 2', value: 2 }, { label: 'element 3', value: 3 }, { label: 'dywan 4', value: 4 }]
  checkboxList:CheckboxOption[] = [{ label: 'label 1', value: 1, isDisabled:true }, { label: 'blok 2', value: 2, isChecked:true }, { label: 'element 3', value: 3 }, { label: 'dywan 4', value: 4, isChecked:true }]
  radioList:RadioOption[] = [{ label: 'label 1', value: 1, isChecked:true }, { label: 'blok 2', value: 2, isChecked:true }, { label: 'element 3', value: 3, isDisabled:true }, { label: 'dywan 4', value: 4 }]
  list4 = [{ label: 'label 1', value: 1 }, { label: 'blok 2', value: 2 }, { label: 'element 3', value: 3 }, { label: 'dywan 4', value: 4 }]

  constructor(protected examplesService: ExamplesService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['Kłi', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
      email: [{value: 'essa', disabled: true}, Validators.email], 
      password: ['', [Validators.minLength(8), Validators.required]], 
      gender: [''],
      country: [''],
      list1: [this.list1[1]],
      checkboxList: [this.radioList[2]],
      radioList: [''],
      list4: [this.list4[2]],
      list5: [this.list4[1]],
      agree: [false, Validators.requiredTrue],
      birthdate: [''],
      description: ['', Validators.maxLength(40)], 
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

    if (this.form.valid) {
      console.log('Form submitted', this.form.value);
    }

  }

  test() {
    this.form.get('list3')?.setValue(this.list1[1])

  }

  ngOnInit() {
    console.log(this.form)
    this.form.valueChanges.subscribe(() => { console.log(this.form) })
  }

  handleOptions(options: any) {
    console.log('OPTIONS WITH PROPERTY', options);
  }

}

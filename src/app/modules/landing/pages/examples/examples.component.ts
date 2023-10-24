import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamplesService } from './../../../../core/services/examples.service';
import { Component } from '@angular/core';
import { CheckboxOption, Option } from '@app/core/models/option.model';
//import {updateAllValueAndValidity} from '@core/utilities/form.utils'
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
  email = new FormControl('', [Validators.required, Validators.email]);

  list1 = [{ label: 'label 1', value: 1 }, { label: 'blok 2', value: 2 }, { label: 'element 3', value: 3 }, { label: 'dywan 4', value: 4 }]
  checkboxList: CheckboxOption[] = [{ label: 'label 1', value: null, isDisabled: true }, { label: 'blok 2', isChecked: true }, { label: 'Rquired true', value: 3, isRequired: true }, { label: 'dywan 4', value: 4, isChecked: false }, { label: 'REQ', value: 4, isChecked: true, isRequired: true }, { label: 'ffff', value: 4, isChecked: false }, { label: 'fasdada', isChecked: true }]
  radioList: Option[] = [{ label: 'label 1', value: 1 }, { label: 'blok 2', value: 2 }, { label: 'element 3', value: 3, isDisabled: true }, { label: 'dywan 4', value: 4 }]
  list4 = [{ label: 'label 1', value: 1, isDisabled: true }, { label: 'blok 2', value: 2 }, { label: 'element 3', value: 3 }, { label: 'dywan 4', value: 4 }]

  constructor(protected examplesService: ExamplesService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['Kłi', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(8), Validators.required]],
      gender: [''],
      country: [''],
      list1: [{ label: 'blok 2222', value: 2 }, [Validators.required]],
      checkboxList: [this.checkboxList],
      radioList: [null, Validators.required],
      list4: [null, [Validators.required]],
      list5: [this.list4[1]],
      agree: [false, Validators.requiredTrue],
      birthdate: [''],
      description: ['', [Validators.maxLength(40), Validators.minLength(15)]],
      hobbies: this.fb.array([new FormControl(''), new FormControl(''), new FormControl('')])
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
      console.log('onSubmit', this.form.value);
    }

    if (this.form.invalid) {
      //  this.form.markAllAsTouched();
      // updateAllValueAndValidity(this.form);
    }

  }

  test() {
    this.form.get('name')?.setValue('seasa')

  }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => { this.onFormChange(); })
  }

  handleOptions(options: any) {
    console.log('OPTIONS WITH PROPERTY', options);
  }

  onFormChange(): void {
    const testingControle = this.form.get('list1');

    console.log('list1 value: ', testingControle?.value, testingControle?.errors);
    // checkboxlistControl && console.log('errors of checkboxList', checkboxlistControl.errors, checkboxlistControl);


  }



}

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  autocompleteList:Option[] = [{ label: 'label 1', value: 1 }, { label: 'value 2', value: 2 }, { label: 'option 3', value: 3 }, { label: 'example 4', value: 4 }]
  checkboxList: CheckboxOption[] = [{ label: 'label 1', value: null, isDisabled: true }, { label: 'label 2', isChecked: true }, { label: 'label 3', value: 3, isRequired: true }, { label: 'label 4', value: 4, isChecked: false }, { label: 'label 5', value: 5, isRequired: true }, { label: 'label 6', value: 6 }, { label: 'label 7' }]
  radioList: Option[] = [{ label: 'label 1', value: 1 }, { label: 'label 2', value: 2 }, { label: 'label 3', value: 3, isDisabled: true }, { label: 'label 4', value: 4 }]
  selectList:Option[] = [{ label: 'label 1', value: 1, isDisabled: true }, { label: 'label 2', value: 2 }, { label: 'label 3', value: 3 }, { label: 'label 4', value: 4 }]

  constructor(protected examplesService: ExamplesService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(8), Validators.required]],
      autocompleteList: [null, [Validators.required]],
      checkboxList: [this.checkboxList],
      radioList: [null, Validators.required],
      selectList: [null, [Validators.required]],
      singleCheckbox: [false, Validators.requiredTrue],
      textArea: ['', [Validators.maxLength(40), Validators.minLength(15)]],
      hobbies: this.fb.array([new FormControl(''), new FormControl(''), new FormControl('')])
    })

  }


  addTodo(title: string) {
    this.examplesService.apiTest_createTodo({ title }).subscribe(() => {
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


  onFormChange(): void {
  //  const testingControle = this.form.get('list1');
  // console.log('list1 value: ', testingControle?.value, testingControle?.errors);
  }

}

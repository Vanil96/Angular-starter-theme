import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Option } from '@app/core/models/option.model';

type InputType = 'text' | 'number' | 'password' | 'email';
@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=>InputAutocompleteComponent),
    multi:true
  }]
})
export class InputAutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input({ required: true }) options: Option[];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() autocomplete = 'auto';
  isDisabled = false;
  
  allOptions: Option[] = [];
  displayedOptions: Option[] = [];
  displayedValue: string;

  private innerValue: any = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
      this.updateDisplayedValueAndOptions();
    }
  }

  ngOnInit(): void {
    this.allOptions = [...this.options];
    this.updateDisplayedValueAndOptions();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInput(event: any): void {
    this.value = (event.target as HTMLInputElement).value;
  }

  handleOptionSelection(event: any): void {
    this.value = event.option.value;
  }

  updateDisplayedValueBasedOnInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.replace(/\s+/g, '').toLowerCase();
    const matchedOption = this.allOptions.find(option => option.label.replace(/\s+/g, '').toLowerCase() === inputValue);
    if (matchedOption) {
      this.value = matchedOption;
    }
  }

  displayOptionLabel(option: Option): string {
    return option ? option.label : '';
  }

  private updateDisplayedValueAndOptions(): void {
    this.displayedValue = typeof this.value === 'string' ? this.value : this.displayOptionLabel(this.value);
    this.displayedOptions = this.displayedValue ? this.filterOptions(this.displayedValue) : this.allOptions.slice();
  }

  private filterOptions(value: string): Option[] {
    const filterValue = value.toLowerCase();
    return this.allOptions.filter(option => option.label.toLowerCase().includes(filterValue));
  }
}
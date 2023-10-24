import { Component, ElementRef, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Option } from '@app/core/models/option.model';
import { getErrorMessage, hasRequiredField, isOption } from '@app/core/utilities/form.utils';
import { environment } from '@environments/environment';
import { Subscription } from 'rxjs';

type InputType = 'text' | 'number' | 'password' | 'email';
@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
})
export class InputAutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input({ required: true }) options: Option[];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() autocomplete = 'auto';
  @Input() hint = '';
  @ViewChild('inputRef') inputRef: ElementRef;
  isRequired = false;
  isDisabled = false;
  errorState: boolean = false;
  allOptions: Option[] = [];
  displayedOptions: Option[] = [];
  displayedValue: string;
  private subscriptions: Subscription[] = [];
  private _value: Option | null;

  onChange = (_: any) => { };
  onTouched = () => { };

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    @Optional() private formGroupDirective: FormGroupDirective) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.formGroupDirective) {
      this.subscriptions.push(this.formGroupDirective.ngSubmit.subscribe(() => {
        this.onTouched();
        this.updateErrorState();
      }));
    }
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.addValidators(this.validate.bind(this));
    }

    this.allOptions = [...this.options];
    this.updateDisplayedValueAndOptions();

    if (this.ngControl && this.ngControl.control) {
      this.isRequired = hasRequiredField(this.ngControl.control.validator);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  get value(): Option | null {
    return this._value;
  }

  set value(newValue: Option | null) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.onChange(newValue);
      this.updateDisplayedValueAndOptions();
      this.updateErrorState();
      this.ngControl.control?.updateValueAndValidity()
    } else if (newValue === null) {
      this.updateDisplayedValueAndOptions();
      this.inputRef.nativeElement.value = this.displayedValue;
    }
  }

  writeValue(value: Option | null): void {
    if (value === null) { return }
    if (isOption(value)) {
      this.value = value;
    } else {
      environment.isConsoleInfoVisible && console.warn("Invalid value format. Value is not in Option type.")
    }
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

  handleInput(): void {
    const inputStringValue = this.inputRef.nativeElement.value;
    this.displayedOptions = inputStringValue ? this.filterOptions(inputStringValue) : this.allOptions.slice();
  }

  handleBlur(): void {
    this.onTouched();
    this.setValueBasedOnInputString();
  }

  handleOptionSelection(event: any): void {
    this.value = event.option.value;
  }

  setValueBasedOnInputString(): void {
    const inputValue = this.inputRef.nativeElement.value.replace(/\s+/g, '').toLowerCase();
    const matchedOption = this.allOptions.find(option => option.label.replace(/\s+/g, '').toLowerCase() === inputValue);
    if (matchedOption) {
      this.value = matchedOption;
    } else {
      this.value = null;
    }
  }

  getErrorMessage(): string {
    return getErrorMessage(this.ngControl.errors)
  }

  getOptionLabel(option: Option | null): string {
    return option ? option.label : '';
  }

  private validate(_control: AbstractControl): { [key: string]: any } | null {
    if (isOption(this.value) && this.value !== null) {
      const matchedOption = this.allOptions.find(option => option.label === this.value?.label);
      if (!matchedOption) {
        return { notInList: true }
      } else { return null }
    }
    return null;
  }

  private updateErrorState(): void {
    this.errorState = !!this.ngControl.errors && !!this.ngControl.touched;
  }

  private updateDisplayedValueAndOptions(): void {
    this.displayedValue = this.getOptionLabel(this.value);
    this.displayedOptions = this.displayedValue ? this.filterOptions(this.displayedValue) : this.allOptions.slice();
  }

  private filterOptions(value: string): Option[] {
    const filterValue = value.toLowerCase();
    return this.allOptions.filter(option => option.label.toLowerCase().includes(filterValue));
  }
}
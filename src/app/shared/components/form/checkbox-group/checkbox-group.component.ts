import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxOption } from '@app/core/models/option.model';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true
    }
  ]
})
export class CheckboxGroupComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) options: CheckboxOption[];
  @Input() label = '';
  isDisabled = false;
  private _value: CheckboxOption[] = [];
  onChange = (_: CheckboxOption[]) => { };
  onTouched = () => { };

  ngOnInit(): void {
    this.options.forEach(option => {
      option.isChecked = option.isChecked || false;
      option.isDisabled = option.isDisabled || false;
    });
  }

  get value(): CheckboxOption[] {
    return this._value;
  }

  set value(newValue: CheckboxOption[]) {
    if (this._value !== newValue) {
      this._value = newValue;
      if (newValue instanceof Array) { 
      for (const option of this.options) {
        const correspondingValue = newValue.find(val => val.value === option.value);
        option.isChecked = correspondingValue ? correspondingValue.isChecked : false;
      }}
      this.onChange(newValue);
    }
  }

  writeValue(value: CheckboxOption[]): void {
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

  onCheckboxChange(option: CheckboxOption, isChecked: boolean) {
    option.isChecked = isChecked;
    this.onChange(this.options);
    this.onTouched();
  }
}
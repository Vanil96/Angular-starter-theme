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

  onChange = (_: any) => { };
  onTouched = () => { };

  ngOnInit(): void {
    for (const option of this.options) {
      if (option.isChecked === undefined) {
        option.isChecked = false;
      }
    }
  }
  writeValue(values: CheckboxOption[]): void {
    if (values) {
      for (const option of this.options) {
        const correspondingValue = values.find(val => val.value === option.value);
        option.isChecked = correspondingValue ? correspondingValue.isChecked : false;
      }
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

  onCheckboxChange(option: CheckboxOption, isChecked: boolean) {
    option.isChecked = isChecked;
    this.onChange(this.options);
    this.onTouched();
  }
}
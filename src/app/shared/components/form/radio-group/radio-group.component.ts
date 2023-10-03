import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from '@app/core/models/option.model';


@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true
  }]
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() options: Option[];
  @Input() label = '';
  isDisabled = false;
  selectedOption: Option | null = null; 

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(selectedOption: Option | null): void {
    this.selectedOption = selectedOption;
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

  selectOption(option: Option): void {
    if (!this.isDisabled) {
      this.selectedOption = option;
      this.onChange(option); 
      this.onTouched();
    }
  }
}
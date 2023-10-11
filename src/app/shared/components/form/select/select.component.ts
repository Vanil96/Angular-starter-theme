import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Option } from '@app/core/models/option.model';
import { getErrorMessage } from '@app/core/utilities/form.utils';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements ControlValueAccessor {
  @Input({ required: true }) options: Option[];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() hint = '';
  @Input() isMultiple = false;
  isDisabled = false;
  errorState: boolean = false;
  private _value: any;
  private _getErrorMessage = getErrorMessage;
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      this.onChange(value);
      this.emitValueToFieldsWithSameControl(value);
      this.updateErrorState();
    }
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

  compare(option1: Option, option2: Option): boolean {
    if (!option1 || !option2) { return false }
    return option1.value === option2.value && option1.label === option2.label
  }

  handleValueChange(value: any): void {
    this.value = value;
  }

  handleBlur():void {
    this.onTouched();
    this.updateErrorState();
  }

  getErrorMessage(): string {
    return this._getErrorMessage(this.ngControl.errors)
  }

  private emitValueToFieldsWithSameControl(value:any):void{
    if (this.ngControl && this.ngControl.control ) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
  }  

  private updateErrorState(): void {
    this.errorState = !!this.ngControl.errors && !!this.ngControl.touched;
  }
}
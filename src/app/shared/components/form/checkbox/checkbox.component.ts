import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms'
import { getErrorMessage } from '@app/core/utilities/form.utils';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],

})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  isDisabled = false;
  errorState: boolean = false;

  private _value: boolean;
  private _getErrorMessage = getErrorMessage;
  private onChange = (_value: boolean) => { };
  private onTouched = () => { };

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get value(): boolean {
    return this._value;
  }

  set value(value: boolean) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(this.value);
      this.emitValueToFieldsWithSameControl(value);
      this.onTouched();
      this.updateErrorState();
    }
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleChange(event: any): void {
    this.value = event.checked;
  }

  handleBlur():void {
    this.onTouched();
    this.updateErrorState();
  }

  getErrorMessage(): string {
    return this._getErrorMessage(this.ngControl.errors)
  }

  private emitValueToFieldsWithSameControl(value: any): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
  }

  private updateErrorState(): void {
    this.errorState = !!this.ngControl.errors && !!this.ngControl.touched;
    console.log('SS', !!this.ngControl.touched)
  }
}
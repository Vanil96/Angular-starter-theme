import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms'
import { getErrorMessage } from '@app/core/utilities/form.utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],

})
export class CheckboxComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = '';
  isDisabled = false;
  errorState: boolean = false;
  private _value: boolean;
  private subscriptions: Subscription[] = [];

   onChange = (_value: boolean) => { };
   onTouched = () => { };

  constructor(@Self() @Optional() public ngControl: NgControl, @Optional() private formGroupDirective: FormGroupDirective) {
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
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
      this.updateErrorState()
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
    return getErrorMessage(this.ngControl.errors);
  }

  private emitValueToFieldsWithSameControl(value: any): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
  }

  private updateErrorState(): void {
    this.errorState = !!this.ngControl.errors && !!this.ngControl.touched;
  }
}
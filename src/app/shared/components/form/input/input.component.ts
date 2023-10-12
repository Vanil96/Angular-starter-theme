import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { getErrorMessage } from '@app/core/utilities/form.utils';
import { Subscription, debounceTime } from 'rxjs';
type InputType = 'text' | 'number' | 'password' | 'email';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})

export class InputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() hint = '';
  @Input() autocomplete = 'off'
  @Input() alt: string;
  isDisabled = false;
  errorState: boolean = false;
  private _value: string | number;
  private subscriptions: Subscription[] = [];

  onChange = (_: string | number) => { };
  onTouched = () => { };

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.ngControl.statusChanges) {
      this.subscriptions.push(
        this.ngControl.statusChanges.pipe(debounceTime(350)).subscribe(() => {
          this.updateErrorState();
        }))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  get value(): string | number {
    return this._value;
  }

  set value(value: string | number) {
    if (this._value !== value) {
      this._value = value;
      this.onChange(value);
      this.emitValueToFieldsWithSameControl(this.value);
    }
  }

  writeValue(value: string | number): void {
    this.value = value
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }

  handleBlur(): void {
    this.onTouched();
    this.updateErrorState();
  }

  getErrorMessage(): string {
    return getErrorMessage(this.ngControl.errors)
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
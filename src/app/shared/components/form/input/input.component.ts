import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FormValidationService } from '@app/core/services/form-validation.service';
import { hasRequiredField } from '@app/core/utilities/form.utils';
import { Subscription } from 'rxjs';
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
  isRequired = false;
  isDisabled = false;
  errorState = false;
  private _value: string | number;
  private subscriptions: Subscription[] = [];

  onChange = (_: string | number) => { };
  onTouched = () => { };

  constructor(@Self() @Optional() public ngControl: NgControl, @Optional() private formGroupDirective: FormGroupDirective, private formValidationService:FormValidationService) {
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
      this.isRequired = hasRequiredField(this.ngControl.control.validator);
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
      this.updateErrorState();
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
    return this.formValidationService.getErrorMessage(this.ngControl.errors);
  }

  private updateErrorState(): void {
    this.errorState = !!this.ngControl.errors && !!this.ngControl.touched;
  }

}
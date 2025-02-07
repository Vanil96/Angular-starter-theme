import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormGroupDirective } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Option } from '@app/core/models/option.model';
import { FormValidationService } from '@app/core/services/form-validation.service';
import {  hasRequiredField, isArrayOfOptions, isOption } from '@app/core/utilities/form.utils';
import { environment } from '@environments/environment';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    standalone: false
})
export class SelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input({ required: true }) options: Option[];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() isMultiple = false;
  isRequired = false;
  isDisabled = false;
  errorState: boolean = false;
  private _value: Option | Option[];
  private subscriptions: Subscription[] = [];

  onChange = (_: Option | Option[]) => { };
  onTouched = () => { };

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    @Optional() private formGroupDirective: FormGroupDirective,
    private formValidationService:FormValidationService
  ) {
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

    this.options.forEach(option => {
      option.isDisabled = option.isDisabled || false;
    });

    if (this.ngControl && this.ngControl.control) {
      this.isRequired = hasRequiredField(this.ngControl.control.validator);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  get value(): Option | Option[] {
    return this._value;
  }

  set value(value: Option | Option[]) {
    if (this._value !== value) {
      this._value = value;
      this.onChange(value);
      this.onTouched();
      this.updateErrorState();
    }
  }

  writeValue(value: Option | null): void {
    if (value === null) { return }
    if (isOption(value)) {
      this.value = value;
    } else if (isArrayOfOptions(value)) {
      this.isMultiple = true;
      this.value = value;
    }
    else {
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

  compare(option1: Option, option2: Option): boolean {
    if (!option1 || !option2) { return false }
    return option1.value === option2.value && option1.label === option2.label
  }

  handleValueChange(value: Option): void {
    this.value = value;
  }

  handleBlur(): void {
    this.onTouched();
    this.updateErrorState();
  }

  getErrorMessage(): string {
    return this.formValidationService.getErrorMessage(this.ngControl.errors)
  }

  private updateErrorState(): void {
    this.errorState = !!this.ngControl.errors && !!this.ngControl.touched;
  }
}
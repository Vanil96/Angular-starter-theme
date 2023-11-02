import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';
import { Option } from '@app/core/models/option.model';
import { FormValidationService } from '@app/core/services/form-validation.service';
import { getSimplifyOption, isOption } from '@app/core/utilities/form.utils';
import { environment } from '@environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})

export class RadioGroupComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input({ required: true }) options: Option[];
  @Input() label = '';
  @Input() verticalView = false;
  isDisabled = false;
  errorState: boolean = false;
  private subscriptions: Subscription[] = [];
  private _value: Option | null = null;
  onChange = (_: Option | null) => { };
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  get value(): Option | null {
    return this._value;
  }

  set value(newValue: Option | null) {
    if (this._value !== newValue && newValue) {
      const selectedOption = this.options.find(option => {
        return option.label === newValue.label && option.value === newValue.value;
      })
      if (selectedOption) {
        this._value = selectedOption;
        this.onChange(getSimplifyOption(this._value));
        this.onTouched();
        this.updateErrorState();
      } else {
        environment.isConsoleInfoVisible && console.warn('Value is not in radio list')
      }
    }
  }

  writeValue(value: Option | null): void {
    if (value===null) {return}

    if (isOption(value)) {
      this.value = value;
    }
    else {
      environment.isConsoleInfoVisible && console.warn("Invalid value format. Value is not in RadioOption type.")
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

  selectOption(value: Option): void {
    if (!this.isDisabled) {
      this.value = value;
    }
  }

  getErrorMessage(): string {
    return this.formValidationService.getErrorMessage(this.ngControl.errors);
  }

  getOptionFromOptionsByValue(value: Option): Option {
    const option = this.options.find(option => {
      return option.label === value.label && option.value === value.value;
    })
    return option as Option;
  }


  private updateErrorState(): void {
    this.errorState = !!this.ngControl.errors && !!this.ngControl.touched;
  }
}
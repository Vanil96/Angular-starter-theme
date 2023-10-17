import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';
import { RadioOption } from '@app/core/models/option.model';
import { getErrorMessage, isRadioOption } from '@app/core/utilities/form.utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})

export class RadioGroupComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input({ required: true }) options: RadioOption[];
  @Input() label = '';
  isDisabled = false;
  errorState: boolean = false;
  private subscriptions: Subscription[] = [];
  private _value: RadioOption | null = null;
  onChange = (_: RadioOption | null) => { };
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

    this.options.forEach(option => {
      option.isChecked = option.isChecked || false;
      option.isDisabled = option.isDisabled || false;
    });

    const checkedOptions = this.options.filter(option => option.isChecked);
    if (checkedOptions.length > 1) {
      console.warn('Multiple radio options are checked. Only the first one will remain checked.');
      checkedOptions.slice(1).forEach(option => option.isChecked = false);
      this.value = checkedOptions[0];
    }
    else if (checkedOptions.length === 1) {
      this.value = checkedOptions[0];
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  get value(): RadioOption | null {
    return this._value;
  }

  set value(newValue: RadioOption | null) {
    if (this._value !== newValue && newValue) {
      const selectedOption = this.options.find(option => {
        return option.label === newValue.label && option.value === newValue.value;
      })
      if (selectedOption) {
        selectedOption.isChecked = true;
        this._value = selectedOption;
        this.onChange(this.simplifyRadioOption(this._value));
        this.onTouched();
        //this.emitChangeForAllInputsUsingSameControl(newValue);
        this.updateErrorState();
      } else {
        console.warn('Value is not in radio list')
      }
    }
  }

  writeValue(value: RadioOption | null): void {
    if (isRadioOption(value)) {
      this.options.forEach(control => control.isChecked = false);
      this.value = value;
    }
    else {
      console.warn("Invalid value format. Value is not in RadioOption type.")
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

  selectOption(value: RadioOption): void {
    if (!this.isDisabled) {
      this.value = value;
    }
  }

  getErrorMessage(): string {
    return getErrorMessage(this.ngControl.errors)
  }

  getOptionFromOptionsByValue(value: RadioOption): RadioOption {
    const option = this.options.find(option => {
      return option.label === value.label && option.value === value.value;
    })
    return option as RadioOption;
  }

  simplifyRadioOption(option: RadioOption): RadioOption {
    return {
      label: option.label,
      value: option.value
    }
  }

  // private emitChangeForAllInputsUsingSameControl(value: any): void {
  //   if (this.ngControl && this.ngControl.control) {
  //    this.ngControl.control.setValue(value, { emitEvent: false });
  //  }
  //}

  private updateErrorState(): void {
    this.errorState = !!this.ngControl.errors && !!this.ngControl.touched;
  }
}
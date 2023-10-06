import { Component, Injector, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { RadioOption } from '@app/core/models/option.model';


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

export class RadioGroupComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) options: RadioOption[];
  @Input() label = '';
  @Input() ariaLabel: string = 'Select an option'
  ngControl: NgControl;
  isDisabled = false;

  private _value: RadioOption | null = null;
  onChange = (_: RadioOption | null) => { };
  onTouched = () => { };

  constructor(private injector: Injector) { }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
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

  get value(): RadioOption | null {
    return this._value;
  }

  set value(value: RadioOption | null) {
    if (this._value !== value) {
      const selectedOption = this.options.find(option => option === value)
      if (selectedOption) {
        selectedOption.isChecked = true;
        this._value = value;
        this.onChange(value);
        this.onTouched();
        this.emitChangeForAllInputsUsingSameControl(value);
      }
    }
  }

  writeValue(value: RadioOption | null): void {
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

  selectOption(value: RadioOption): void {
    if (!this.isDisabled) {
      this.value = value;
    }
  }

  private emitChangeForAllInputsUsingSameControl(value: any): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
  }
}
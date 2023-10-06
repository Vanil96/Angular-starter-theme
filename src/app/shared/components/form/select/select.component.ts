import { Component, Injector, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Option } from '@app/core/models/option.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) options: Option[];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() isMultiple = false;
  ngControl: NgControl;
  isDisabled = false;
  private _value: any;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
  }

  get value(): any {
    return this._value;
  }

  set value(newValue: any) {
    if (this._value !== newValue) {
      this._value = newValue;
      this.onChange(newValue);
      this.emitChangeForAllInputsUsingSameControl(newValue);
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

  private emitChangeForAllInputsUsingSameControl(value:any):void{
    if (this.ngControl && this.ngControl.control ) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
  }  
}
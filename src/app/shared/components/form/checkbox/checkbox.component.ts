import { Component, Input, forwardRef, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() label = '';
  ngControl: NgControl;
  private _value: boolean;

  private onChange = (_value: boolean) => { };
  private onTouched = () => { };

  constructor(private injector: Injector) { }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl)
  }

  get value(): boolean {
    return this._value;
  }

  set value(value: boolean) {
    if (value !== this._value) {
      this._value = value;
      this.emitChangeForAllInputsUsingSameControl(value);
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

  onCheckboxChange(event: any): void {
    this.value = event.checked;
    this.onChange(this.value);
    this.onTouched();
  }

  private emitChangeForAllInputsUsingSameControl(value: any): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
  }
}
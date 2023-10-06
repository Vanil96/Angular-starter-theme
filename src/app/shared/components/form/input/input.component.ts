import { Component, Injector, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
type InputType = 'text' | 'number' | 'password' | 'email';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})

export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() autocomplete = 'off'
  @Input() isDisabled = false;
  @Input() maxLength: number
  @Input() minLength: number
  @Input() max: number;
  @Input() min: number
  @Input() alt: string;
  @Input() isRequired: boolean;

  ngControl: NgControl;
  private _value: string | number;
  onChange = (_: string | number) => { };
  onTouched = () => { };

  constructor(private injector: Injector) { }
  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl)
  }

  get value(): string | number {
    return this._value;
  }

  set value(value: string | number) {
    if (this._value !== value) {
      this._value = value;
      this.emitChangeForAllInputsUsingSameControl(value);
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

  handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

  private emitChangeForAllInputsUsingSameControl(value: any): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
  }
}
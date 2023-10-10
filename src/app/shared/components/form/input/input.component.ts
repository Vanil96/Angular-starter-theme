import { Component, Injector, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

type InputType = 'text' | 'number' | 'password' | 'email';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})

export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() hint = '';
  @Input() autocomplete = 'off'

  @Input() alt: string;
  @Input() isRequired: boolean;
  isDisabled = false;


  ngControl: NgControl;

  private _value: string | number;
  onChange = (_: string | number) => { };
  onTouched = () => { };


  constructor(private injector: Injector) { }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
  }

  get value(): string | number {
    return this._value;
  }

  set value(value: string | number) {
    if (this._value !== value) {
      this._value = value;
      this.onChange(value);
      this.emitChangeForAllInputsUsingSameControl(value);
    }
  }

  get hasError(): boolean {
    return !!this.ngControl.errors && !!this.ngControl.touched;
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
      console.log('.....', this.ngControl)
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
  }


  getErrorMessage(): string {
    if (!this.ngControl.errors) {
      return '';
    }
    interface ErrorMessages {
      [key: string]: string;
    }
    if (!this.ngControl.errors) {
      return '';
    }
    const errorMessages: ErrorMessages = {
      required: 'To pole jest wymagane',
      email: 'Zły format email',
      pattern: 'Nieprawidłowy wzór',
      max: 'Wartość jest za duża',
      min: 'Wartość jest za mała',
      default: 'Nieprawidłowa wartość'
  };
    const errorKey = Object.keys(this.ngControl.errors)[0];

    // Dla błędów minlength i maxlength, dostosuj wiadomość
    if (errorKey === 'minlength') {
        const requiredLength = this.ngControl.errors['minlength'].requiredLength;
        const actualLength = this.ngControl.errors['minlength'].actualLength;
        const missingChars = requiredLength - actualLength;
        return `Brakuje ${missingChars} znaków (wymagane: ${requiredLength}, aktualne: ${actualLength})`;
    }
    
    if (errorKey === 'maxlength') {
        const requiredLength = this.ngControl.errors['maxlength'].requiredLength;
        const actualLength = this.ngControl.errors['maxlength'].actualLength;
        const exceededChars = actualLength - requiredLength;
        return `Przekroczone o ${exceededChars} znaków (limit: ${requiredLength}, aktualne: ${actualLength})`;
    }

    return errorMessages[errorKey] || errorMessages['default'];
  }


}
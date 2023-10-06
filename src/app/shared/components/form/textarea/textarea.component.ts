import { Component, Injector, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(()=>TextareaComponent),
    multi:true
  }]
})
export class TextareaComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() isDisabled = false;
  @Input() isRequired = false;
  @Input() rows:number = 15;
  @Input() cols:number = 45;
  @Input() maxLength:number = 15;



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
import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { getErrorMessage } from '@app/core/utilities/form.utils';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() rows: number = 15;
  @Input() cols: number = 45;
  @Input() hint = '';
  errorState: boolean = false;
  isDisabled = false;
  private _value: string | number;
  private subscriptions: Subscription[] = [];


  onChange = (_: string | number) => { };
  onTouched = () => { };

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.ngControl.statusChanges) {
      this.subscriptions.push(
        this.ngControl.statusChanges.pipe(debounceTime(350)).subscribe(() => {
          this.updateErrorState();
        }))
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
      this.emitValueToFieldsWithSameControl(value);
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

  handleBlur(): void {
    this.onTouched();
    this.updateErrorState();
  }

  getErrorMessage(): string {
    return getErrorMessage(this.ngControl.errors)
  }

  private emitValueToFieldsWithSameControl(value: any): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
  }

  private updateErrorState(): void {
    this.errorState = !!this.ngControl.errors && !!this.ngControl.touched;
  }
}
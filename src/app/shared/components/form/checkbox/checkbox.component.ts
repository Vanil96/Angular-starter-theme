import { ChangeDetectorRef, Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

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
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  value: boolean = false;

  private onChange = (_value: boolean) => { };
  private onTouched = () => { };

  constructor(private cd: ChangeDetectorRef) { }

  writeValue(value: boolean): void {
    this.value = value;
    this.cd.markForCheck();
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
}
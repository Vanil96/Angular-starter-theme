import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from '@app/core/models/option.model';


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
export class RadioGroupComponent implements ControlValueAccessor {
  @Input({ required: true }) control: FormControl;
  @Input({ required: true }) options: Option[];
  @Input() label = '';
  isDisabled = false;


  onChange = (_: any) => {};
  onTouched = () => { };

  writeValue(values: any[]): void {
    if (values && this.control) {
      this.control.setValue(values, { emitEvent: false });
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}

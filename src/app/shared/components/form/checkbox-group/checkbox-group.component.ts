import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from '@app/core/models/option.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true
    }
  ]
})
export class CheckboxGroupComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input({ required: true }) control: FormControl;
  @Input({ required: true }) options: Option[];
  @Input() label = '';
  private subscriptions = new Subscription();
  isDisabled = false;

  onChange = (_: any) => { };
  onTouched = () => { };

  ngOnInit(): void {
    console.log(this.control)
    this.subscriptions.add(
      this.control.valueChanges.subscribe(value => {
        this.forceComparison(value);
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  writeValue(values: any[]): void {
    if (values && this.control) {
      this.control.setValue(values, { emitEvent: false });
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
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  onCheckboxChange(option: Option, isChecked: boolean) {
    let currentValues = Array.isArray(this.control.value) ? this.control.value : [];
    if (isChecked) {
      currentValues.push(option);
    } else {
      currentValues = currentValues.filter((item: Option) => item.value !== option.value);
    }
    this.control.setValue(currentValues);
    this.onChange(currentValues);
    this.onTouched();

    console.log('ON CHECKBOX CHANGE', this.control.value)

  }

  forceComparison(value: any) {
    this.control.setValue(value, { emitEvent: false });
  }
}

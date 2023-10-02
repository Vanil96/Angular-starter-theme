import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Option } from '@app/core/models/option.model';
import { Subscription } from 'rxjs';

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
export class SelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input({ required: true }) control: FormControl;
  @Input({ required: true }) options: Option[];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() isMultiple = false;
  private subscriptions = new Subscription();

  isDisabled = false;

  onChange = (_: any) => {};
  onTouched = () => { };

  ngOnInit(): void {
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

  compare(option1: Option, option2: Option): boolean {
    console.log('compare')
    if (!option1 || !option2) { return false }
    return option1.value === option2.value && option1.label === option2.label
  }

  forceComparison(value: any) {
    this.control.setValue(value, { emitEvent: false });
  }

}

import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CheckboxOption } from '@app/core/models/option.model';
import { getErrorMessage } from '@app/core/utilities/form.utils';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],

})
export class CheckboxGroupComponent implements ControlValueAccessor, OnInit, OnDestroy, ValidationErrors {
  @Input() showIsRequiredForSingle = true;
  @Input() showRequiredLegend = true;
  formArray: FormArray<any> = new FormArray<any>([], this.checkboxRequiredValidator());
  arrayHasRequiredUnchecked = false;
  private subscriptions: Subscription[] = [];
  value: CheckboxOption[] = [];

  onChange = (_: CheckboxOption[]) => { };
  onTouched = () => { };

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.ngControl && this.ngControl.statusChanges) {
      this.subscriptions.push(
        this.ngControl.statusChanges.pipe(debounceTime(350)).subscribe((status) => {
          console.log('STATUS CHANGE', status)
          this.formArray.markAllAsTouched(); //cant be here, its loading on start, should be only on accept form
        }),
        this.formArray.valueChanges.subscribe(() => {
          this.setValueByFormControls();
          this.onChange(this.value);
          //push errors from formArray to ngControl
          this.ngControl.control?.setErrors(this.ngControl.control?.errors || this.formArray.errors ? { ...(this.ngControl.control?.errors), ...(this.formArray.errors) } : null);
        }))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  writeValue(value: CheckboxOption[]): void {
    this.value = value.map(option => this.getOptionNormalize(option));
    this.setFormControlsByValue();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValueByFormControls() {
    const formArrayValues = this.formArray.getRawValue(); //get values with 'disabled' status
    this.value.forEach((option, index) => {
      console.log(option.label, index, formArrayValues[index])
      option.isChecked = formArrayValues[index];
    })
  }

  setFormControlsByValue(): void {
    this.formArray.clear();
    this.value.forEach(option => {
      option = this.getOptionNormalize(option);
      const formControl = new FormControl(
        option.isChecked,
        option.requiredCheck ? Validators.requiredTrue : null
      );
      if (option.isDisabled) {
        formControl.disable({ emitEvent: false });
      }
      this.formArray.push(formControl)
    });
  }


  getOptionNormalize(option: CheckboxOption): CheckboxOption {
    option.value = option.value || null;
    option.isChecked = option.isChecked || false;
    option.isDisabled = option.isDisabled || false;
    option.requiredCheck = option.requiredCheck || false;
    option.labelPosition = option.labelPosition || 'after';
    return option
  }


  getErrorMessage(errors: any): string {
    console.log('get error [CheckboxGroupComponent]')
    return getErrorMessage(errors);
  }

  private checkboxRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;

      if (formArray.controls && formArray.controls.length) {
        const hasRequiredUnchecked = formArray.controls.some(ctrl => {
          return ctrl.errors?.['required'] && !ctrl.value;
        });
        this.arrayHasRequiredUnchecked = hasRequiredUnchecked ? true : false;
        return hasRequiredUnchecked ? { requiredUnchecked: true } : null;
      }
      return null;
    };
  }
}
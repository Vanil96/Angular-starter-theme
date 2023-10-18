import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, FormGroupDirective, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CheckboxOption } from '@app/core/models/option.model';
import { getErrorMessage, isCheckboxOption } from '@app/core/utilities/form.utils';
import { environment } from '@environments/environment';
import { Subscription } from 'rxjs';

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

  constructor(@Self() @Optional() public ngControl: NgControl, @Optional() private formGroupDirective: FormGroupDirective
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.formGroupDirective) {
      this.subscriptions.push(this.formGroupDirective.ngSubmit.subscribe(() => {
        this.formArray.markAllAsTouched();
      }));
    }
    this.subscriptions.push(
      this.formArray.valueChanges.subscribe(() => {
        this.setValueByFormControls();
        this.onChange(this.value);
        if (this.ngControl) {
          this.ngControl.control?.setErrors(this.ngControl.control?.errors || this.formArray.errors ? { ...(this.ngControl.control?.errors), ...(this.formArray.errors) } : null);
        }
      }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  writeValue(value: CheckboxOption[]): void {
    if (value===null) {return}
    if (Array.isArray(value)) {
      if (this.isValidCheckboxOptionArray(value)) {
        this.value = value.map(option => this.getOptionNormalize(option));
        this.setFormControlsByValue();
      } else {
        environment.isConsoleInfoVisible && console.warn("Invalid array format: Not all items are CheckboxOption objects");
        return
      }
    } else {
      environment.isConsoleInfoVisible && console.warn("Invalid input: value is not an array");
      return
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSingleCheckboxFocusOut() {
    this.onTouched();
  }

  setValueByFormControls() {
    const formArrayValues = this.formArray.getRawValue(); //get values with 'disabled' status
    this.value.forEach((option, index) => {
      option.isChecked = formArrayValues[index];
    })
  }

  setFormControlsByValue(): void {
    this.formArray.clear();
    this.value.forEach(option => {
      option = this.getOptionNormalize(option);
      const formControl = new FormControl(
        option.isChecked,
        option.isRequired ? Validators.requiredTrue : null
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
    option.isRequired = option.isRequired || false;
    option.labelPosition = option.labelPosition || 'after';
    return option
  }


  getErrorMessage(errors: any): string {
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

  private isValidCheckboxOptionArray(value: any[]): value is CheckboxOption[] {
    return value.every(item => isCheckboxOption(item));
  }
}
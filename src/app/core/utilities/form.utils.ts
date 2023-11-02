import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";
import { CheckboxOption, Option } from "../models/option.model";


export function updateAllValueAndValidity(formGroup: FormGroup, emitEvent: boolean = true): void {
  Object.keys(formGroup.controls).forEach((key: string) => {
    const control = formGroup.get(key);
    if (control instanceof FormGroup) {
      updateAllValueAndValidity(control);
    }
    control?.updateValueAndValidity({ emitEvent });
  })
}

export function isOption(obj: any): obj is Option {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }

  if (!('label' in obj) || typeof obj.label !== 'string') {
    return false;
  }

  if (!('value' in obj) || (typeof obj.value !== 'string' && typeof obj.value !== 'number')) {
    return false;
  }

  return true;
}


export function isCheckboxOption(obj: any): obj is CheckboxOption {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }
  if (!('label' in obj) || typeof obj.label !== 'string') {
    return false;
  }
  return true;
}

export function isArrayOfOptions(value: any): boolean {
  return Array.isArray(value) && value.every(isOption);
}

export function getSimplifyOption(option:Option): Option | null {
  if (!option) {return null}
  return {
    label: option.label,
    value: option.value
  }
}


export function hasRequiredField(validator: ValidatorFn | null): boolean {
  if (validator) {
    const validationResult = validator({} as AbstractControl);
    return !!(validationResult && validationResult.hasOwnProperty('required'));
  }
  return false;
}




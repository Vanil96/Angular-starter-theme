import { FormGroup, ValidationErrors } from "@angular/forms";
import { CheckboxOption, Option } from "../models/option.model";

interface ErrorMessages {
  [key: string]: string;
}

export function getErrorMessage(errors: ValidationErrors | null): string {
  if (!errors) {
    return '';
  }

  const errorMessages: ErrorMessages = {
    required: 'This field is required',
    email: 'Invalid email format',
    pattern: 'Invalid pattern',
    max: 'Value is too high',
    min: 'Value is too low',
    nullValidator: 'Value is null',
    requiredTrue: 'Value must be true',
    notInList: 'Value is not in list',
    default: 'Invalid value'
  };

  if (errors["minlength"]) {
    const requiredLength = errors["minlength"].requiredLength;
    return `Value should be at least ${requiredLength} chars long`;
  }

  if (errors["maxlength"]) {
    const requiredLength = errors["maxlength"].requiredLength;
    return `Value should be no more than ${requiredLength} chars long`;
  }

  for (const key of Object.keys(errorMessages)) {
    if (errors[key]) {
      return errorMessages[key];
    }
  }

  return errorMessages["default"];
}

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




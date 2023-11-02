import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

interface ErrorMessages {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})

export class FormValidationService {

  constructor(private translate: TranslateService) {}

  public getErrorMessage(errors: ValidationErrors | null): string {
    if (!errors) {
      return '';
    }

    const errorMessages: ErrorMessages = {
      required: 'form.errors.required',
      email: 'form.errors.email',
      pattern: 'form.errors.pattern',
      max: 'form.errors.max',
      min: 'form.errors.min',
      nullValidator: 'form.errors.nullValidator',
      requiredTrue: 'form.errors.requiredTrue',
      notInList: 'form.errors.notInList',
      default: 'form.errors.default'
    };

    if (errors["minlength"]) {
      const requiredLength = errors["minlength"].requiredLength;
      return this.translate.instant('form.errors.minLength', { requiredLength });
    }

    if (errors["maxlength"]) {
      const requiredLength = errors["maxlength"].requiredLength;
      return this.translate.instant('form.errors.maxLength', { requiredLength });
    }

    for (const key of Object.keys(errorMessages)) {
      if (errors[key]) {
        return this.translate.instant(errorMessages[key]);
      }
    }

    return this.translate.instant(errorMessages["default"]);
  }
}

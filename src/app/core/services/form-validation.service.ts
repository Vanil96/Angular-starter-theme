import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

interface ErrorMessages {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}

  public getErrorMessage(errors: ValidationErrors | null): string {
    if (!errors) {
      return '';
    }

    const errorMessages: ErrorMessages = {
      required: 'To pole jest wymagane.',
      email: 'Podaj poprawny adres e-mail.',
      pattern: 'Wprowadzone dane nie pasują do wymaganego wzorca.',
      max: 'Wartość jest zbyt wysoka.',
      min: 'Wartość jest zbyt niska.',
      nullValidator: 'Nieprawidłowa wartość.',
      requiredTrue: 'To pole musi być zaznaczone.',
      notInList: 'Podana wartość nie znajduje się na liście.',
      default: 'Nieprawidłowe dane.',
    };

    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `Minimalna długość: ${requiredLength} znaków.`;
    }

    if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      return `Maksymalna długość: ${requiredLength} znaków.`;
    }

    for (const key of Object.keys(errorMessages)) {
      if (errors[key]) {
        return errorMessages[key];
      }
    }

    return errorMessages['default'];
  }
}

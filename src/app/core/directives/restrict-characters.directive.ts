import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appRestrictCharacters]',
    standalone: false
})
export class RestrictCharactersDirective {
  @Input() appRestrictCharacters: 'numeric' | 'alpha' | 'alphanumeric';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let transformedInput: string;

    switch (this.appRestrictCharacters) {
      case 'numeric':
        transformedInput = inputElement.value.replace(/[^0-9]+/g, '');
        break;

      case 'alpha':
        transformedInput = inputElement.value.replace(/[^a-zA-Z]+/g, '');
        break;

      case 'alphanumeric':
        transformedInput = inputElement.value.replace(/[^a-zA-Z0-9]+/g, '');
        break;

      default:
        transformedInput = inputElement.value;
        break;
    }

    if (inputElement.value !== transformedInput) {
      inputElement.value = transformedInput;
      event.preventDefault();
    }
  }
}
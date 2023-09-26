import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Options } from '@app/core/models/option.model';
import { Subscription, map, startWith } from 'rxjs';
type InputType = 'text' | 'number' | 'password' | 'email';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent {
  @Input({ required: true }) control: FormControl;
  @Input({ required: true }) options: Options[];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() autocomplete = 'auto'
  private subscriptions = new Subscription();

  allOptions: Options[] = [];
  displayedOptions: Options[] = [];

  ngOnInit() {
    this.allOptions = [...this.options];
    this.displayedOptions = [...this.options];

    this.subscriptions.add(
      this.control.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.label),
        map(label => label ? this._filter(label) : this.allOptions.slice())
      ).subscribe(options => this.displayedOptions = options)
    )
  }

  private _filter(value: string): Options[] {
    const filterValue = value.toLowerCase();
    return this.allOptions.filter(option => option.label.toLowerCase().includes(filterValue))
  }


  onSelectOrBlur(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;

    inputValue = inputValue.replace(/\s+/g, '').toLowerCase();

    const matchedOption = this.allOptions.find(option => option.label.replace(/\s+/g, '').toLowerCase() === inputValue);

    if (matchedOption) {
      this.control.setValue(matchedOption);
    }
  }

  displayWith(option: Options): string {
    return option ? option.label : '';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}

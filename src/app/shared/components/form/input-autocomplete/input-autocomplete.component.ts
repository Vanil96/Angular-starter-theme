import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Option } from '@app/core/models/option.model';
import { Subscription, map, startWith } from 'rxjs';

type InputType = 'text' | 'number' | 'password' | 'email';
@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input({ required: true }) control: FormControl;
  @Input({ required: true }) options: Option[];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() autocomplete = 'auto'
  isDisabled = false;
  private subscriptions = new Subscription();

  allOptions: Option[] = [];
  displayedOptions: Option[] = [];
  displayedValue: string;

  onChange = (_: any) => {};
  onTouched = () => { };

  ngOnInit(): void {
    this.allOptions = [...this.options];
    this.displayedOptions = [...this.options];

    this.subscriptions.add(
      this.control.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : this.displayWith(value)),
      ).subscribe((displayedValue) => {
        this.displayedValue = displayedValue;
        this.displayedOptions = displayedValue ? this._filter(displayedValue) : this.allOptions.slice();
      })
    )
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

  private _filter(value: string): Option[] {
    const filterValue = value.toLowerCase();
    return this.allOptions.filter(option => option.label.toLowerCase().includes(filterValue))
  }

  onSelectOrFocusOut(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;

    inputValue = inputValue.replace(/\s+/g, '').toLowerCase();

    const matchedOption = this.allOptions.find(option => option.label.replace(/\s+/g, '').toLowerCase() === inputValue);

    if (matchedOption) {
      this.control.setValue(matchedOption);
    }
  }

  displayWith(option: Option): string {
    return option ? option.label : '';
  }

}

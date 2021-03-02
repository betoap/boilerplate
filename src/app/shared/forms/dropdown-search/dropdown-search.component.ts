import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { IListItem } from './IListItem';
import { Component, Input, Output, EventEmitter, OnChanges, forwardRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const SEARCH_SELECTBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownSearchComponent ),
  multi: true
};

@Component({
  selector: 'am-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.scss'],
  providers: [SEARCH_SELECTBOX_VALUE_ACCESSOR]
})
export class DropdownSearchComponent implements ControlValueAccessor, OnChanges {

  @Input()
  label: string;

  @Input()
  dropdownList: Array<IListItem>;

  @Output()
  changeItem = new EventEmitter<string>();

  @Input()
  setCurrent: number;

  @Input()
  control?: FormControl;

  @Input()
  isReadOnly: Boolean = false;

  public researchedList$ = new BehaviorSubject<IListItem[]>(null);

  private canDropdownListBeInputed = true;

  ngOnChanges() {
    if (this.dropdownList && this.dropdownList.length && this.canDropdownListBeInputed) {
      this.researchedList$.next(this.dropdownList);
      this.canDropdownListBeInputed = false;
    }
  }

  public onChangeState(valueSelected: string) {
    this.value = valueSelected;
    this.changeItem.emit(valueSelected);
  }

  public getInputValue(event: any): void {
    this.researchedList$
      .next(this.dropdownList.filter(dropdownItem => dropdownItem.label.toLowerCase().includes(event.target.value.toLowerCase())));
  }


  get value() {
    return this.value;
  }

  set value(val) {
    this.onChangeCb(val);
    this.onTouchedCb(val);
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

}

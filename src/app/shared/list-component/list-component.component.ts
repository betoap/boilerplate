import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IListItem } from './list-item.model';

@Component({
  selector: 'am-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})
export class ListComponent implements OnInit {
  @Input() public items: Array<IListItem>;
  @Input() public label: string;
  @Output() public changeValue = new EventEmitter<string>();

  public selectedIndex: number;
  constructor() { }

  ngOnInit() {
  }


  public getValue(value, i) {
    this.selectedIndex = i;
    this.changeValue.emit(value);
  }
}

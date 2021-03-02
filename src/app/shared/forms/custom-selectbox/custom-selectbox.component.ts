import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'am-custom-selectbox',
  templateUrl: './custom-selectbox.component.html',
  styleUrls: ['./custom-selectbox.component.scss']
})
export class CustomSelectboxComponent implements OnInit {
  @Input() items = [];
  @Output() itemChange = new EventEmitter<string>();
  currentItem = this.items[0];
  constructor() { }

  ngOnInit() {
  }

  onItemChange(value, id) {
    this.currentItem = this.items[id];
    this.itemChange.emit(value);
  }

}

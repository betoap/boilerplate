import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

import { IRadioButton } from './radio-button.model';

@Component({
  selector: 'am-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {
  @Input() items: Array<IRadioButton>;

  @Input() id: string;

  @Input() classeCss?: string;

  @Input() control?: FormControl;

  @Input() setCurrent: string;

  @Input() label?: string;

  @Input() inactivable?: boolean = false;

  @Output() changeItem = new EventEmitter();


  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('pt-br');
  }

  ngOnInit() {
    this.classeCss = (this.classeCss) ? this.classeCss : '';
  }

  /**
   * @param id este parâmetro já é passado dinamicamente.
   * @description
   * Define o valor do item selecionado como ativo e aplica a classe de item selecionado.
   */
  setAsChecked(id) {
    const container = Array.from(document.querySelectorAll(`#${ this.id } .label-container`));

    document.getElementById(`${ this.id }_${ id }`)['checked'] = true;

    container.forEach( (div, index) => {
      const radioButton: HTMLInputElement = div.querySelector('input');

      if ( radioButton.checked) {
        if ( this.inactivable && id === index && div.classList.contains('active')) {
          div.classList.remove('active');
          this.changeItem.emit( null );
          return;
        }

        div.classList.add('active');
        this.changeItem.emit( radioButton.value );

        return;
      }

      div.classList.remove('active');
    });

  }

}

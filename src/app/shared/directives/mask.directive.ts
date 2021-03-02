import {
  Directive,
  HostListener,
  Input,
  ElementRef
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';

@Directive({
  selector: '[amMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MaskDirective,
    multi: true
  }]
})
export class MaskDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  @Input('accMask') accMask: string;
  @Input('saveMasked') saveMasked: string;

  constructor(private el: ElementRef) {
    console.log( el )
  }

  writeValue(value: any): void {
    console.log( value )
    if (value) {
      this.el.nativeElement.value = this.aplicarMascara(value, this.accMask);
      this.onChange(this.aplicarMascara(value, this.accMask));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    console.log( $event )
    const valor = $event.target.value.replace(/\D/g, '');

    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }
    $event.target.value = this.aplicarMascara(valor, this.accMask);
    if (valor.length <= this.accMask.length) {
      if (this.saveMasked && this.saveMasked === 'true') {
        this.onChange(this.aplicarMascara(valor, this.accMask));
        return;
      }

      this.onChange(valor);
    }

  }


  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    console.log( $event )
    if ($event.target.value.length === this.accMask.length) {
      return;
    }
  }

  aplicarMascara(valor: string, mask: string): string {
    if ( ! valor || typeof valor !== 'string' ) { return valor; }
    valor = valor.replace(/\D/g, '');
    const pad = mask.replace(/\D/g, '').replace(/9/g, '_');
    const valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;
    for ( let i = 0; i < mask.length; i++) {
      if ( isNaN( parseInt( mask.charAt( i ), 10 ) ) ) {
        valor += mask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }
    return valor;
  }
}

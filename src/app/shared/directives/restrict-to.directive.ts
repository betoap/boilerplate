import {
  Directive,
  HostListener,
  Input,
  ElementRef
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Directive({
  selector: '[amRestrictTo]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RestrictToDirective,
    multi: true
  }]
})
export class RestrictToDirective {

  onTouched: any;
  onChange: any;


  @Input() appRestrictTo: string;

  constructor(private el: ElementRef) {
   }

  writeValue(value: any): void {
    if (value) {
      this.el.nativeElement.value = value;
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
    if ( this.appRestrictTo) {

      switch ( this.appRestrictTo ) {
        case 'numbers':
          this.onChange($event.target.value.replace(/\D/g, ''));
          $event.target.value = $event.target.value.replace(/\D/g, '');
        break;
        case 'decimal':
          this.onChange($event.target.value.replace(/[^0-9.]/g, ''));
          $event.target.value = $event.target.value.replace(/[^0-9.]/g, '');
        break;
        case 'dates':
          this.el.nativeElement.setAttribute('maxlength', 10);
          this.onChange($event.target.value.replace(/[^0-9/]/g, ''));
          $event.target.value = $event.target.value.replace(/[^0-9/]/g, '');
        break;
        case 'cpf':
          this.el.nativeElement.setAttribute('maxlength', 14);
          this.onChange($event.target.value.replace(/[^0-9.-]/g, ''));
          $event.target.value = $event.target.value.replace(/[^0-9.-]/g, '');
        break;
        case 'profiles':
          this.onChange($event.target.value.replace(/[^A-Za-zÀ-ú ,]/g, ''));
          $event.target.value = $event.target.value.replace(/[^A-Za-zÀ-ú ,]/g, '');
        break;
        case 'letters':
          this.onChange($event.target.value.replace(/[^A-Za-zÀ-ú ]/g, ''));
          $event.target.value = $event.target.value.replace(/[^A-Za-zÀ-ú ]/g, '');
        break;
        case 'letters-without-space':
        this.onChange($event.target.value.replace(/[^A-Za-zÀ-ú ]/g, ''));
        $event.target.value = $event.target.value.replace(/[^A-Za-zÀ-ú]/g, '');
      break;
        case 'password':

        break;
        case 'noSpaceOnInit':
          this.onChange($event.target.value.replace(/^\s/, ''));
          $event.target.value = $event.target.value.replace(/^\s/, '');
        break;

      }
    }

    this.onChange($event.target.value);
  }
}

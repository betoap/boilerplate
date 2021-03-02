declare const $:any;

export class Mask {

  static checkField( field, mask, options? ) {
    const time = setInterval(
      () => {
        if( $(`.${field}`).length > 0 ) {
          clearInterval( time );
          $(`.${field}`).mask(mask, options);
        }
      }
    );
  }

  static phone( field_class ){
    const SPMaskBehavior = function (val) {
      return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
      onKeyPress: function(val, e, field, options) {
          field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };
    Mask.checkField(field_class, SPMaskBehavior, spOptions);
  }

  static cep( field_class ) {
    Mask.checkField(field_class, '00000-000');
  }
}

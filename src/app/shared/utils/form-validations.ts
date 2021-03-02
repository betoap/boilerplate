import { BaseComponent } from 'src/app/core/base.component';
import { FormArray, FormControl, FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
    AbstractControl,
   } from '@angular/forms';

export class FormValidations {

  static requiredMinCheckbox(min = 1) {
    const checktor = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true };
    };
    return checktor;
  }

  static rejectSequence(control: FormControl) {
    const sequence = control.value;

    if ( sequence ) {
      const newValue = sequence.replace(/\D/g, '');
      const regex = /^(\d)\1+$/;
      return regex.test( newValue ) ? { rejectSequence : true } : null;
    }
    return null;
  }

  static phoneValidator( control: FormControl ){
    const phone = control.value;
    if (phone && phone !== '') {
      const checkphone = /^(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})$/;
      return checkphone.test(phone) ? null : { phoneInvalido : true };
    }
    return null;
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const checkcep = /^[0-9]{8}$/;
      return checkcep.test(cep) ? null : { cepInvalido : true };
    }
    return null;
  }

  static dateValidator( control: FormControl ) {
    const date = control.value;
    if ( date ) {
      const parms = date.split(/[\.\-\/]/);
      const year  = parseInt(parms[2], 10);
      const month = parseInt(parms[1], 10);
      const day   = parseInt(parms[0], 10);
      const checkDate = new Date( year , month - 1, day , 0, 0, 0, 0);
      if (
        month === ( checkDate.getMonth() + 1 ) &&
        day === checkDate.getDate() &&
        year === checkDate.getFullYear()
      ) {
        return null;
      }
      return { dateInvalid : true };
    }
    return null;

  }

  static minDate(fieldDate: string, minDate: number) {
    const checktor = (formControl: FormControl) => {

      if ( !fieldDate ) {
        throw new Error( 'É necessário informar um campo.' );
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = ( <FormGroup>formControl.root ).get( fieldDate );

      if ( !field ) {
        throw new Error('É necessário informar um campo válido.');
      }

      if ( field.value ) {
        const parms       = field.value.split(/[\.\-\/]/);
        const year        = parseInt(parms[2], 10);
        const currentYear = (new Date()).getFullYear();

        if ( (currentYear - year) < minDate ) {
          return { minDate : minDate };
        }
      }

      return null;
    };
    return checktor;
  }

  static equalsTo(otherField: string) {
    const checktor = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo : otherField };
      }

      return null;
    };
    return checktor;
  }



  static checkPassword(control: AbstractControl) {

    const password = control.value;
    if (password && password !== '') {
      const checkpassw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.*\W]{8,}$/;
      return checkpassw.test(password) ? null : { invalidPassword : true };
    }
    return null;
  }

  static atLeastOne(validator: ValidatorFn, controls: string[] = null) {
    const checktor = ( group: FormGroup ): ValidationErrors | null => {
      if ( !controls ) {
        controls = Object.keys( group.controls );
      }

      const hasAtLeastOne = group && group.controls && controls.some(k => !validator( group.controls[k] ) );

      if ( !hasAtLeastOne ) {
        controls.forEach( ( index ) => {
          group.controls[index].markAsTouched();
          group.controls[index].setErrors( { 'atLeastOne': true });
        });

        return { atLeastOne: true };
      } else {
        controls.forEach( ( index ) => {
          group.controls[index].markAsTouched();
          group.controls[index].setErrors(null);
        });

        return null;
      }

    };

    return checktor;
  }

  static equals(controls: string[] = null) {
    const checktor = ( group: FormGroup ): ValidationErrors | null => {
      if ( !controls ) {
        controls = Object.keys( group.controls );
      }

      const values = [];
      controls.forEach( ( index ) => {
        if ( values.indexOf( group.controls[index].value ) === -1 ) {
          values.push( group.controls[index].value );
        }
      });


      if ( values.length > 1 ) {
        controls.forEach( ( index ) => {
          group.controls[index].markAsTouched();
          group.controls[index].setErrors( { 'equalsTo': true });
        });

        return { equalsTo: true };
      }

      controls.forEach( ( index ) => {
        group.controls[index].markAsTouched();
        group.controls[index].setErrors(null);
      });

      return null;

    };

    return checktor;
  }

  static checkFullPassword(controls: string[] = null, username: string) {
    const checktor = ( group: FormGroup ): ValidationErrors | null => {
      if ( !controls ) {
        controls = Object.keys( group.controls );
      }

      const values = [];
      const usernameValue = group.controls[username].value;
      let erro: Boolean = false;


      /* required */
      controls.forEach( ( index ) => {
        if ( group.controls[index].value === '' ) {
          group.controls[index].setErrors( { 'required': true });

          erro = true;
        }
      });

      /* equals */
      controls.forEach( ( index ) => {
        if ( group.controls[index].value !== '' && values.indexOf( group.controls[index].value ) === -1 ) {
          values.push( group.controls[index].value );
        }
      });

      if ( values.length > 1 ) {
        controls.forEach( ( index ) => {
          group.controls[index].setErrors( { 'equalsTo': true });

          erro = true;
        });
      }

      /* Critério mínimo de aceite */
      controls.forEach( ( index ) => {
        const password = group.controls[index].value;
        if (password && password !== '') {
          const checkpassw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

          if ( !checkpassw.test(password) ) {
            group.controls[index].setErrors( { 'invalidPassword': true });

            erro = true;
          }
        }
      });

      /* Não pode conter partes do username */
      controls.forEach( ( index ) => {
        const password = group.controls[index].value;
        if (password && password !== '') {

          if ( password.indexOf( usernameValue ) !== -1 ) {
            group.controls[index].setErrors( { 'invalidLoginPassword': true });

            erro = true;
          }
        }
      });


      if ( !erro ) {
        controls.forEach( ( index ) => {
          group.controls[index].setErrors(null);
        });
      }

      return null;

    };

    return checktor;
  }

  static getErrorMsg(fieldName: string, checktorName: string, checktorValue?: any) {

    console.log( BaseComponent.languageCurrent );
    const language = BaseComponent.languageCurrent;

    const idioma = {
      field: {
        'pt-br': 'Campo',
        en: 'Field ',
        es: 'Campo',
        fr: 'Champ'
      },
      mandatory: {
        'pt-br': 'obrigatório',
        en: 'mandatory',
        es: 'obligatorio',
        fr: 'obligatoire'
      },
      minimum: {
        'pt-br': 'Mínimo de',
        en: 'Minimum',
        es: 'Mínimo',
        fr: 'Le minimum'
      },
      characters: {
        'pt-br': 'caracteres',
        en: 'characters',
        es: 'caracteres',
        fr: 'personnages'
      }
    }

    const field = ( !fieldName ) ? '' : fieldName.toLowerCase();

    const config = {
      'required': `${idioma.field[language]} ${field} ${idioma.mandatory[language]}.`,
      'minlength': `${idioma.minimum[language]} ${checktorValue.requiredLength} ${idioma.characters[language]}.`,
      'maxlength': `Máximo de ${checktorValue.requiredLength} caracteres.`,
      'cepInvalido': 'CEP inválido.',
      'dateInvalid': 'Data inválida',
      'rejectSequence': 'Dado inválido',
      'minDate': `Data precisa ser maior que ${ checktorValue} anos`,
      'emailInvalido': 'Email já cadastrado!',
      'invalidPassword': 'Senha não possuí os critérios de aceite',
      'invalidLoginPassword': 'Senha não pode conter partes do login',
      'equalsTo': 'Campos não são iguais',
      'pattern': `Campo ${field} inválido`,
      'atLeastOne': 'Ao menos um',
      'reset': 'Senhas não são idênticas'
    };

    return config[checktorName];
  }



}

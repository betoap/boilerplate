import { CheckFieldComponent } from './check-field/check-field.component';
import { CheckboxSlideToggleComponent } from './checkbox-slide-toggle/checkbox-slide-toggle.component';
import { SelectSearchComponent } from './select-search/select-search.component';
import { RestrictToDirective } from './../directives/restrict-to.directive';
import { DropdownSearchComponent } from './dropdown-search/dropdown-search.component';
import { MaskDirective } from '../directives/mask.directive';
import { ListComponent } from './../list-component/list-component.component';
import { CustomSelectboxComponent } from './custom-selectbox/custom-selectbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { TextareaFieldComponent } from './textarea-field/textarea-field.component';
import { StandardSelectboxComponent } from './standard-selectbox/standard-selectbox.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  declarations: [
    CheckboxComponent,
    ErrorMsgComponent,
    FormDebugComponent,
    InputFieldComponent,
    RadioButtonComponent,
    StandardSelectboxComponent,
    TextareaFieldComponent,
    CustomSelectboxComponent,
    ListComponent,
    MaskDirective,
    DropdownSearchComponent,
    CheckboxComponent,
    RestrictToDirective,
    SelectSearchComponent,
    CheckboxSlideToggleComponent,
    CheckFieldComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CheckboxComponent,
    ErrorMsgComponent,
    FormDebugComponent,
    InputFieldComponent,
    RadioButtonComponent,
    StandardSelectboxComponent,
    TextareaFieldComponent,
    CustomSelectboxComponent,
    ListComponent,
    MaskDirective,
    DropdownSearchComponent,
    CheckboxComponent,
    RestrictToDirective,
    SelectSearchComponent,
    CheckboxSlideToggleComponent,
    CheckFieldComponent,
  ],
  entryComponents: []
})
export class CustomFormsModule { }

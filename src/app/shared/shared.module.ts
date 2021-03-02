import { CustomFormsModule } from './forms/customforms.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CustomFormsModule,
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    RouterModule,
  ],
  entryComponents: [

  ],
})
export class SharedModule { }

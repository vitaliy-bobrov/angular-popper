import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopperComponent } from './angular-popper.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PopperComponent
  ],
  exports: [
    PopperComponent
  ]
})
export class NgPopper {}

export type PopperPlacement = 'top' | 'top-start' | 'top-end' |
  'right' | 'right-start' | 'right-end' |
  'bottom' | 'bottom-start' | 'bottom-end' |
  'left' | 'left-start' | 'left-end';

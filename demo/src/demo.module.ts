import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DemoComponent } from './demo.component';

const NgPopper = require('angular-popper').NgPopper;

@NgModule({
  imports: [
    NgPopper,
    BrowserModule
  ],
  declarations: [ DemoComponent ],
  bootstrap: [ DemoComponent ]
})
export class DemoModule {}

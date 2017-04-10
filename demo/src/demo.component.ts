import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <h1>Basic Demo</h1>

    <h2>Default settings</h2>

    <angular-popper [showPopper]="showPopper1">
      <button type="button"
              (click)="onButtonClick1()">Click to toggle Popper</button>

      <span close-button>Close</span>

      <div class="content">
        Any Popper content you wat with <strong>HTML</strong>!
      </div>
    </angular-popper>
  `
})
export class DemoComponent {
  showPopper1 = false;

  onButtonClick1() {
    this.showPopper1 = !this.showPopper1;
  }
}

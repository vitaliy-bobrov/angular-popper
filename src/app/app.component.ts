import { Component } from '@angular/core';
import Popper from 'popper.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Case 1.
  placement: Popper.Placement[] = [
    'top',
    'right',
    'left',
    'bottom'
  ];
  currentSide = this.placement[0];

  // Case 2.
  currentTarget = '#one';

  // Case 3.
  currentShow = false;

  // Case 4.
  shift: Popper.Placement[] = [
    'left-start',
    'left-end',
    'right-start',
    'right-end',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end'
  ];
  currentShiftSide = this.shift[0];
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy } from '@angular/core';
import Popper from 'popper.js';
import { PopperPlacement } from './angular-popper.interface';

@Component({
  selector: 'angular-popper',
  templateUrl: 'angular-popper.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopperComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() show = false;
  @Input() placement: PopperPlacement = 'bottom';

  @Output() close = new EventEmitter();

  containerId: string;
  closeId: string;

  private popper;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    this.create();
  }

  ngOnDestroy() {
    this.destroy();
  }

  onClose() {
    this.show = false;
    this.close.emit();
  }

  init() {
    const popperId = this.uuid4();
    this.containerId = `angular-popper-${popperId}`;
    this.closeId = `angular-popper-${popperId}__close`;
  }

  create() {
    this.popper = new Popper(
      this.el.nativeElement,
      this.el.nativeElement.querySelector('.angular-popper'),
      {
        placement: this.placement,
        removeOnDestroy: true
      });
  }

  destroy() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  }

  private uuid4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    });
  }
}

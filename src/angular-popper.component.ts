import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy } from '@angular/core';
import * as Popper from 'popper.js';

export type PopperPlacement = 'top' | 'top-start' | 'top-end' |
  'right' | 'right-start' | 'right-end' |
  'bottom' | 'bottom-start' | 'bottom-end' |
  'left' | 'left-start' | 'left-end';

@Component({
  selector: 'angular-popper',
  template:
    `<ng-content></ng-content>

    <div class="angular-popper"
         *ngIf="showPopper"
         [ngClass]="placement"
         [attr.id]="containerId">
      <button type="button"
              class="js-popper-close angular-popper__close"
              *ngIf="closeButton"
              (click)="onClose()"
              [attr.id]="closeId">
        <ng-content selector=".close-button, [close-button]"></ng-content>
      </button>

      <ng-content selector=".content, [content]"></ng-content>

      <div class="angular-popper__arrow" x-arrow></div>
  </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopperComponent implements OnInit, OnDestroy {
  @Input() showPopper = false;
  @Input() placement: PopperPlacement = 'bottom';
  @Input() gpuAcceleration = true;

  @Output() closed = new EventEmitter();

  containerId: string;
  closeId: string;

  private popper: Popper;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initPopper();
  }

  ngOnDestroy() {
    this.destroyPopper();
  }

  onClose() {
    this.showPopper = false;
    this.closed.emit();
  }

  initPopper() {
    const popperId = this.uuid4();
    this.containerId = `angular-popper-${popperId}`;
    this.closeId = `angular-popper-${popperId}__close`;

    this.popper = new Popper(
      this.el.nativeElement,
      this.el.nativeElement.querySelector('.angular-popper'),
      {
        placement: this.placement,
        gpuAcceleration: this.gpuAcceleration,
        removeOnDestroy: true
      });
  }

  destroyPopper() {
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

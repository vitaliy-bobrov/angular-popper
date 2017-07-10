import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  ElementRef,
  SimpleChanges,
  ChangeDetectionStrategy } from '@angular/core';
import Popper from 'popper.js';
import { PopperPlacement } from './angular-popper.interface';

@Component({
  selector: 'angular-popper',
  templateUrl: 'angular-popper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopperComponent implements OnInit, AfterViewInit, OnChanges,OnDestroy {
  @Input() show = false;
  @Input() placement: PopperPlacement = 'bottom';
  @Input() target: string | Element;

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.target && !changes.target.firstChange ||
      changes.placement && !changes.placement.firstChange) {
      this.destroy();
      this.create();
    }
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
      this.getTargetNode(),
      this.el.nativeElement.querySelector('.angular-popper'),
      {
        placement: this.placement
      });
  }

  destroy() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  }

  private getTargetNode(): Element {
    if (this.target) {
      if (typeof this.target === 'string') {
        return document.querySelector(this.target);
      } else {
        return this.target;
      }
    } else {
      return this.el.nativeElement;
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

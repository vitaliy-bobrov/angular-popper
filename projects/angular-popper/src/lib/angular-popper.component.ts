import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  ElementRef,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import Popper from 'popper.js';

@Component({
  selector: 'angular-popper',
  templateUrl: './angular-popper.component.html',
  styleUrls: ['./angular-popper.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopperComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() show = true;
  @Input() closeButton = false;
  @Input() placement: Popper.Placement = 'bottom';
  @Input() positionFixed = false;
  @Input() eventsEnabled = true;
  @Input() modifiers: Popper.Modifiers;
  @Input() target: string | Element;

  @Output() close = new EventEmitter<void>();

  private popper: Popper;

  constructor(private el: ElementRef, private zone: NgZone) {}

  ngAfterViewInit() {
    this.create();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.target && !changes.target.firstChange ||
      changes.placement && !changes.placement.firstChange ||
      changes.positionFixed && !changes.positionFixed.firstChange ||
      changes.eventsEnabled && !changes.eventsEnabled.firstChange
    ) {
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

  create() {
    this.zone.runOutsideAngular(() => {
      const { placement, positionFixed, eventsEnabled, modifiers } = this;

      this.popper = new Popper(
        this.getTargetNode(),
        this.el.nativeElement.querySelector('.angular-popper'),
        {
          placement,
          positionFixed,
          eventsEnabled,
          modifiers
        }
      );
    });
  }

  destroy() {
    if (this.popper) {
      this.zone.runOutsideAngular(() => {
        this.popper.destroy();
      });

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
}

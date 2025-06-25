import { Data, RawData, SiblingLayout } from '../utils';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

type Coor = { x: number; y: number };

const LETTER_WIDTH = 14; // Hypothetical/average letter width; In pixels

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-flamegraph-graph',
    templateUrl: './flamegraph.component.html',
    styleUrls: ['./flamegraph.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FlamegraphComponent implements OnInit, OnDestroy {
  private readonly _ngZone = inject(NgZone);
  private readonly _renderer = inject(Renderer2);
  private readonly _elementRef = inject(ElementRef);

  private readonly _unlisteners: (() => void)[] = [];
  private _tooltip: {
    element: HTMLElement;
    data: RawData;
  } | null = null;

  selectedData: Data[] = [];
  entries: Data[] = [];

  @Output() frameClick = new EventEmitter<RawData>();
  @Output() frameMouseEnter = new EventEmitter<RawData>();
  @Output() frameMouseLeave = new EventEmitter<RawData>();
  @Output() zoom = new EventEmitter<Data>();

  @Input() width: number;
  @Input() levelHeight: number;
  @Input() layout: SiblingLayout;
  @Input() depth: number;
  @Input() minimumBarSize: number | undefined;
  @Input() tooltipEnabled: boolean;

  @Input() set data(data: Data[]) {
    this.entries = data;
  }

  ngOnInit() {
    this._initEventListeners();
  }

  ngOnDestroy() {
    for (const unlisten of this._unlisteners) {
      unlisten();
    }
  }

  getTop(entry: Data) {
    // Add the rowNumber for a 1px row gap.
    return entry.rowNumber * this.levelHeight + entry.rowNumber;
  }

  getLeft(entry: Data) {
    return entry.leftRatio * this.width;
  }

  getWidth(entry: Data) {
    return entry.widthRatio * this.width || 0;
  }

  getScaleXWidth(entry: Data) {
    // Subtract a single pixel from the width to achieve 1px column gap.
    return entry.widthRatio - this.pixelRatio(entry);
  }

  getClipPathWidth(entry: Data) {
    // Subtract a single pixel from the width to achieve 1px column gap.
    const width = 1 - entry.widthRatio + this.pixelRatio(entry);
    const widthInPerc = Math.round(width * 100 * 1000) / 1000;

    return `inset(0 ${widthInPerc}% 0 0)`;
  }

  private pixelRatio(entry: Data) {
    return entry.widthRatio / this.getWidth(entry);
  }

  private _initEventListeners() {
    const el = this._elementRef.nativeElement;
    let currentTarget: Element | null = null;
    let currentEntry: Data | null = null;

    // Outside Angular
    this._ngZone.runOutsideAngular(() => {
      const mousemove = this._renderer.listen(el, 'mousemove', (e: MouseEvent) => {
        const mouseCoor = { x: e.clientX, y: e.clientY };
        this._moveTooltip(mouseCoor);

        if (currentTarget === e.target) {
          return;
        }
        if (currentEntry) {
          this.frameMouseLeave.emit(currentEntry.original);
          this._hideTooltip();
        }

        currentTarget = e.target as Element | null;
        currentEntry = this._getBarElementEntry(currentTarget);

        if (currentEntry) {
          this.frameMouseEnter.emit(currentEntry.original);
          this._showTooltip(currentEntry, mouseCoor);
        }
      });

      const mouseleave = this._renderer.listen(el, 'mouseleave', () => {
        if (!currentEntry) {
          return;
        }
        this.frameMouseLeave.emit(currentEntry.original);
        this._hideTooltip();
        currentTarget = null;
        currentEntry = null;
      });

      this._unlisteners.push(mousemove, mouseleave);
    });

    // Inside Zone
    const click = this._renderer.listen(el, 'click', (e: MouseEvent) => {
      const entry = this._getBarElementEntry(e.target as Element | null);
      if (entry) {
        this.frameClick.emit(entry.original);
      }
    });
    const dblclick = this._renderer.listen(el, 'dblclick', (e: MouseEvent) => {
      const entry = this._getBarElementEntry(e.target as Element | null);
      if (entry) {
        this.zoom.emit(entry);
      }
    });

    this._unlisteners.push(click, dblclick);
  }

  private _getBarElementEntry(element: Element | null): Data | null {
    if (!element) {
      return null;
    }
    const dataIdx = element.getAttribute('data-idx');

    if (!dataIdx) {
      return null;
    }

    const idx = parseInt(dataIdx, 10);
    return this.entries[idx] ?? null;
  }

  private _showTooltip(entry: Data, startCoor: Coor) {
    if (!this.tooltipEnabled || this.getWidth(entry) > entry.label.length * LETTER_WIDTH) {
      return;
    }

    const data = entry.original;

    if (this._tooltip?.data !== data) {
      this._hideTooltip();
    }

    if (!this._tooltip) {
      const element = this._renderer.createElement('div');
      this._renderer.addClass(element, 'ngx-fg-tooltip');
      element.innerText = data.label;
      this._renderer.appendChild(this._elementRef.nativeElement, element);
      this._tooltip = { element, data };

      this._moveTooltip(startCoor);
    }
  }

  private _hideTooltip() {
    this._tooltip?.element.remove();
    this._tooltip = null;
  }

  private _moveTooltip({ x, y }: Coor) {
    if (!this._tooltip) {
      return;
    }
    const translate = `translate(${x}px, ${y}px)`;
    this._renderer.setStyle(this._tooltip.element, 'transform', translate);
  }
}

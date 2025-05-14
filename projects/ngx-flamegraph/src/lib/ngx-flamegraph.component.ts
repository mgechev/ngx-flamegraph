import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef,
  NgZone,
  HostBinding,
} from '@angular/core';
import {
  Data,
  RawData,
  transformRawData,
  maxValue,
  SiblingLayout,
  FlamegraphColor,
  Color,
  restore,
  findDepth,
  transformData,
} from './utils';
import { defaultColors } from './constants';

export interface FlameGraphConfig {
  color?: FlamegraphColor;
  data: RawData[];
  minimumBarSize?: number; // smallest that a bar can be in pixels and still be rendered
}

const isResizeObserverAvailable = typeof ResizeObserver !== 'undefined';

const RESIZE_DEBOUNCE = 125;

@Component({
  selector: 'ngx-flamegraph',
  templateUrl: './ngx-flamegraph.component.html',
  styleUrls: ['./ngx-flamechart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NgxFlamegraphComponent implements OnInit, OnDestroy {
  entries: Data[] = [];
  depth = 0;

  // tslint:disable-next-line: variable-name
  private _colors: FlamegraphColor;
  // tslint:disable-next-line: variable-name
  private _data: RawData[];
  private _resizeTimeout?: ReturnType<typeof setTimeout>;

  @Output() frameClick = new EventEmitter<RawData>();
  @Output() frameMouseEnter = new EventEmitter<RawData>();
  @Output() frameMouseLeave = new EventEmitter<RawData>();

  @Input() siblingLayout: SiblingLayout = 'relative';
  @Input() width: number | null = null;
  @Input() levelHeight = 25;

  minimumBarSize: number;

  @Input() set config(config: FlameGraphConfig) {
    this._data = config.data;
    this._colors = config.color ?? defaultColors;
    this.minimumBarSize = config.minimumBarSize ?? 2;
    this._refresh();
  }

  private _resizeObserver: ResizeObserver;

  @HostBinding('attr.style') get hostStyles() {
    return `height: ${this.depth * this.levelHeight}px `;
  }

  constructor(private _el: ElementRef, public cdr: ChangeDetectorRef, private _ngZone: NgZone) {}

  ngOnInit(): void {
    const parent = this._el.nativeElement?.parentElement;
    if (parent && this.width === null && isResizeObserverAvailable) {
      this._resizeObserver = new ResizeObserver(() => {
        clearTimeout(this._resizeTimeout);
        this._resizeTimeout = setTimeout(() => {
          // Explicitly fire ResizeObserver callback inside the Angular zone
          // because ResizeObserver is not patched by zone.js by default
          this._ngZone.run(() => this._onParentResize());
        }, RESIZE_DEBOUNCE);
      });
      this._resizeObserver.observe(parent);
    }
  }

  ngOnDestroy(): void {
    const parent = this._el.nativeElement?.parentElement;
    if (parent && this._resizeObserver && isResizeObserverAvailable) {
      this._resizeObserver.unobserve(parent);
    }
    clearTimeout(this._resizeTimeout);
  }

  private _onParentResize(): void {
    const parent = this._el.nativeElement?.parentElement;
    if (parent) {
      this.width = parent.clientWidth;
      this.cdr.markForCheck();
    }
  }

  private _refresh() {
    const { hue, saturation, lightness } = this._colors;
    const colors: Color = {
      hue: Array.isArray(hue) ? hue : [hue, hue],
      saturation: Array.isArray(saturation) ? saturation : [saturation, saturation],
      lightness: Array.isArray(lightness) ? lightness : [lightness, lightness],
    };
    this.entries = transformRawData(this._data, this.siblingLayout, maxValue(this._data), colors);
    this.depth = findDepth(this._data);
  }

  onZoom(entry: Data): void {
    if (entry.navigable) {
      restore(entry);
    }
    transformData(entry, this.siblingLayout);
  }

  onFrameMouseEnter(data: RawData): void {
    if (this.frameMouseEnter.observers.length === 0) {
      return;
    }

    this._ngZone.run(() => this.frameMouseEnter.emit(data));
  }

  onFrameMouseLeave(data: RawData): void {
    if (this.frameMouseLeave.observers.length === 0) {
      return;
    }

    this._ngZone.run(() => this.frameMouseLeave.emit(data));
  }
}

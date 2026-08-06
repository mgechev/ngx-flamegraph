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
  restore,
  findDepth,
  transformData,
} from './utils';
import { defaultColors } from './constants';

export interface FlameGraphConfig {
  /**
   * A color pair that represents the min and max value colors.
   * The colors of the values in-between those are calculated based on 
   * the selected color model – HSL or RGB.
   * 
   * Example:
   * 
   * ```typescript
   * // First items: min value color channels
   * // Second items: max value color channels
   * const color = {
   *   hue: [50, 0],
   *   saturation: [80, 80],
   *   lightness: [55, 60],
   * };
   * 
   * // Or in RGB
   * const color = {
   *   red: [255, 0],
   *   green: [0, 0],
   *   blue: [0, 255],
   * };
   * ```
   */
  color?: FlamegraphColor;

  /** The data to visualize. */
  data: RawData[];

  /** The smallest a bar can be in pixels and still be rendered. */
  minimumBarSize?: number;
}

const isResizeObserverAvailable = typeof ResizeObserver !== 'undefined';

const RESIZE_DEBOUNCE = 125;
const DEFAULT_LEVEL_HEIGHT = 25;

@Component({
    selector: 'ngx-flamegraph',
    templateUrl: './ngx-flamegraph.component.html',
    styleUrls: ['./ngx-flamechart.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: false
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

  /**
   * `equal` or `relative`. Equal will set all the siblings with the same width, compared to `relative`, which will look at their values relative to the sum of the values of all the siblings.
   */
  @Input() siblingLayout: SiblingLayout = 'relative';

  /**
   * Sets the width of the chart.
   */
  @Input() width: number | null = null;

  /**
   * Sets the height per level of the chart. Default `25`.
   */
  @Input() levelHeight = DEFAULT_LEVEL_HEIGHT;

  /**
   * Shows a tooltip for the narrow bars that can't display the whole label. Default: `false`.
   */
  @Input() tooltipEnabled: boolean = false;

  minimumBarSize: number;

  /**
   * Flamegraph configuration.
   */
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
    const data = this._data ?? [];
    const colors = this._colors ?? defaultColors;
    this.entries = transformRawData(
      data,
      this.siblingLayout,
      maxValue(data),
      colors,
    );
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

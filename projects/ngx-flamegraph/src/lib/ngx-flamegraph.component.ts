/// <reference types="resize-observer-browser" />
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Data, RawData, transformRawData, maxValue, SiblingLayout, FlamegraphColor, Color, restore, findDepth, transformData } from './utils';
import { defaultColors } from './constants';

export interface FlameGraphConfig {
  color?: FlamegraphColor;
  data: RawData[];
}

const isResizeObserverAvailable = typeof ResizeObserver !== 'undefined';

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

  @Output() frameClick = new EventEmitter<RawData>();
  @Output() frameMouseEnter = new EventEmitter<RawData>();
  @Output() frameMouseLeave = new EventEmitter<RawData>();

  @Input() siblingLayout: SiblingLayout = 'relative';
  @Input() width: number | null = null;
  @Input() levelHeight = 25;

  @Input() set config(config: FlameGraphConfig) {
    this._data = config.data;
    this._colors = config.color ?? defaultColors;
    this._refresh();
  }

  private _resizeObserver: ResizeObserver;

  constructor(private _el: ElementRef, public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const parent = this._el.nativeElement?.parentElement;
    if (parent && this.width === null && isResizeObserverAvailable) {
      this._resizeObserver = new ResizeObserver(() => this._onParentResize());
      this._resizeObserver.observe(parent);
    }
  }

  ngOnDestroy(): void {
    const parent = this._el.nativeElement?.parentElement;
    if (parent && this._resizeObserver && isResizeObserverAvailable) {
      this._resizeObserver.unobserve(parent);
    }
  }

  private _onParentResize(): void {
    const parent = this._el.nativeElement?.parentElement;
    if (parent) {
      this.width = parent.clientWidth;
      this.cdr.detectChanges();
    }
  }

  private _refresh() {
    const { hue, saturation, lightness } = this._colors;
    const colors: Color = {
      hue: Array.isArray(hue) ? hue : [hue, hue],
      saturation: Array.isArray(saturation) ? saturation : [saturation, saturation],
      lightness: Array.isArray(lightness) ? lightness : [lightness, lightness]
    };
    this.entries = transformRawData(this._data, this.siblingLayout, maxValue(this._data), colors);
    this.depth = findDepth(this._data);
  }

  onZoom(entry: Data): void {
    if (entry.navigable) {
      restore(entry);
    }
    transformData(entry, this.siblingLayout);
    this.cdr.detectChanges();
  }
}
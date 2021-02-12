import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {Data, RawData, transformRawData, maxValue, SiblingLayout, FlamegraphColor, Color} from './utils';
import { defaultColors } from './constants';

export interface FlameGraphConfig {
  color?: FlamegraphColor;
  data: RawData[];
}

@Component({
  selector: 'ngx-flamegraph',
  templateUrl: './ngx-flamegraph.component.html',
  styleUrls: ['./ngx-flamechart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgxFlamegraphComponent {
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
  @Input() width: number;
  @Input() levelHeight = 25;

  @Input() set config(config: FlameGraphConfig) {
    this._data = config.data;
    this._colors = config.color ?? defaultColors;
    this._refresh();
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
}

const findDepth = (data: RawData[] | undefined) => {
  if (!data) {
    return 0;
  }
  if (!data.length) {
    return 0;
  }
  let result = 0;
  for (const row of data) {
    result = Math.max(1 + findDepth(row.children), result);
  }
  return result;
};

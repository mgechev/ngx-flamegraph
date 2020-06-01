import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {Data, RawData, transformRawData, maxValue, SiblingLayout, FlamegraphColor, Color} from './utils';
import { defaultColors } from './constants';

@Component({
  selector: 'ngx-flamegraph',
  templateUrl: './ngx-flamegraph.component.html',
  styleUrls: ['./ngx-flamechart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Input() set colors(colors: FlamegraphColor) {
    this._colors = colors;
    this._setData();
  }
  @Input() set data(data: RawData[]) {
    this._data = data;
    this._setData();
  }

  private _setData() {
    const { hue, saturation, lightness } = this._colors ?? defaultColors;
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

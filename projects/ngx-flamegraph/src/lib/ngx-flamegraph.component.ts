import {Component, Input} from '@angular/core';
import {Data, RawData, transformRawData} from './rawData';
import {BarHeight} from './constants';

@Component({
  selector: 'ngx-flamegraph',
  templateUrl: './ngx-flamegraph.component.html',
  styleUrls: ['./ngx-flamechart.component.css']
})
export class NgxFlamegraphComponent {
  entries: Data[] = [];

  @Input() width: number;
  @Input() height: number;
  @Input() set data(value: RawData[]) {
    this.entries = transformRawData(value);
  }

  get barHeight() {
    return BarHeight;
  }

  getTop(entry: Data) {
    return entry.rowNumber * BarHeight;
  }

  getLeft(entry: Data) {
    return entry.leftRatio * this.width;
  }

  getWidth(entry: Data) {
    return entry.widthRatio * this.width;
  }

  zoom(entry: Data) {
    this.data = [entry.original];
  }
}

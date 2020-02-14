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
}

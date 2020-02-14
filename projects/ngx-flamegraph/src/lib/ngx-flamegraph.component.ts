import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Data, RawData, transformRawData} from './utils';
import {BarHeight} from './constants';

@Component({
  selector: 'ngx-flamegraph',
  templateUrl: './ngx-flamegraph.component.html',
  styleUrls: ['./ngx-flamechart.component.css']
})
export class NgxFlamegraphComponent {
  entries: Data[] = [];

  @Output() frameClick = new EventEmitter<RawData>();
  @Output() frameMouseEnter = new EventEmitter<RawData>();
  @Output() frameMouseLeave = new EventEmitter<RawData>();

  @Input() width: number;
  @Input() height: number;
  @Input() set data(value: RawData[]) {
    this.entries = transformRawData(value);
  }
}

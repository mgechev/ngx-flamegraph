import {Component, Input, OnInit} from '@angular/core';
import {Data, RawData, transformRawData} from './rawData';

@Component({
  selector: 'ngx-flamegraph',
  templateUrl: './ngx-flamegraph.component.html',
  styles: []
})
export class NgxFlamegraphComponent {
  entries: Data[] = [];

  @Input() set data(value: RawData[]) {
    this.entries = transformRawData(value);
  }
}

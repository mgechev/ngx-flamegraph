import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {Data, RawData, transformRawData, maxValue, SiblingLayout} from './utils';

@Component({
  selector: 'ngx-flamegraph',
  templateUrl: './ngx-flamegraph.component.html',
  styleUrls: ['./ngx-flamechart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxFlamegraphComponent {
  entries: Data[] = [];
  depth = 0;

  @Output() frameClick = new EventEmitter<RawData>();
  @Output() frameMouseEnter = new EventEmitter<RawData>();
  @Output() frameMouseLeave = new EventEmitter<RawData>();

  @Input() siblingLayout: SiblingLayout = 'relative';
  @Input() width: number;
  @Input() levelHeight = 25;
  @Input() set data(roots: RawData[]) {
    this.entries = transformRawData(roots, this.siblingLayout, maxValue(roots));
    this.depth = findDepth(roots);
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

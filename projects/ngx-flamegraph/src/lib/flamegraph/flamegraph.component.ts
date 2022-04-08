import { Data, RawData, SiblingLayout } from '../utils';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-flamegraph-graph',
  templateUrl: './flamegraph.component.html',
  styleUrls: ['./flamegraph.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlamegraphComponent {
  selectedData: Data[] = [];
  entries: Data[] = [];

  @Output() frameClick = new EventEmitter<RawData>();
  @Output() frameMouseEnter = new EventEmitter<RawData>();
  @Output() frameMouseLeave = new EventEmitter<RawData>();
  @Output() zoom = new EventEmitter<Data>();

  @Input() width: number;
  @Input() levelHeight: number;
  @Input() layout: SiblingLayout;
  @Input() depth: number;

  @Input() set data(data: Data[]) {
    this.entries = data;
  }

  get height() {
    return this.levelHeight * this.depth;
  }

  getTop(entry: Data) {
    return entry.rowNumber * this.levelHeight;
  }

  getLeft(entry: Data) {
    return entry.leftRatio * this.width;
  }

  getWidth(entry: Data) {
    return entry.widthRatio * this.width || 0;
  }
}
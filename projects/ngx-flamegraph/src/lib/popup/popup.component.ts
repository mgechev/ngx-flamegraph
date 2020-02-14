import {Component, Input, ViewChild} from '@angular/core';
import {Data} from '../rawData';
import {BarHeight} from '../constants';
import {FlamegraphComponent} from '../flamegraph/flamegraph.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() width: number;
  @Input() set data(data: Data[]) {
    this.entries = data;
    if (this.flamegraph) {
      this.flamegraph.clearSelection();
    }
  }
  @ViewChild(FlamegraphComponent) flamegraph: FlamegraphComponent;

  entries: Data[] = [];

  get left() {
    const entry = this.entries[0];
    return this.width * (entry.leftRatio + (entry.widthRatio / 2));
  }

  get top() {
    return this.entries[0].rowNumber * BarHeight + BarHeight;
  }

  get height() {
    const maxRow = this.entries.reduce((c, p) => {
      return Math.max(c, p.rowNumber);
    }, -Infinity);
    return (maxRow + 1) * BarHeight;
  }
}

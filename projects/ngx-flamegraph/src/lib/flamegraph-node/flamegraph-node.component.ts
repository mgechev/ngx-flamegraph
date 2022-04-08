import { Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {Data} from '../utils';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[flamegraph-node]',
  templateUrl: './flamegraph-node.component.html',
  styleUrls: ['./flamegraph-node.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlamegraphNodeComponent {
  @Input() entry: Data;
  @Input() height: number;
  @Input() width: number;
  @Output() zoom = new EventEmitter();
}

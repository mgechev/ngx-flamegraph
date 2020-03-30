import { Data, RawData, SiblingLayout } from '../utils';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'flamegraph',
  templateUrl: './flamegraph.component.html',
  styleUrls: ['./flamegraph.component.css']
})
export class FlamegraphComponent {
  selectedData: Data[] = [];
  entries: Data[] = [];

  @Output() frameClick = new EventEmitter<RawData>();
  @Output() frameMouseEnter = new EventEmitter<RawData>();
  @Output() frameMouseLeave = new EventEmitter<RawData>();

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

  select(entry: Data) {
    if (entry.navigable) {
      restore(entry);
    }
    transformData(entry, this.layout);
  }

  clearSelection() {
    this.selectedData = [];
  }
}

const collapse = (e: Data) => {
  e.widthRatio = 0;
  e.children.forEach(collapse);
};

const collapseOthers = (entry: Data) => {
  entry.siblings.forEach(e => {
    if (e === entry) {
      return;
    }
    collapse(e);
  });
  let current = entry;
  while (current.parent) {
    current = current.parent;
    if (current.widthRatio === 0) {
      continue;
    }
    collapseOthers(current);
  }
};

const hide = (leftRatio: number, node: Data) => {
  node.widthRatio = 0;
  node.leftRatio = leftRatio;
  node.children.forEach(n => hide(leftRatio, n));
};

const hideSiblings = (node: Data) => {
  const idx = node.siblings.indexOf(node);
  for (let i = 0; i < idx; i++) {
    node.siblings[i].widthRatio = 0;
    node.siblings[i].leftRatio = 0;
    node.siblings[i].children.forEach(hide.bind(null, 0));
  }
  for (let i = idx + 1; i < node.siblings.length; i++) {
    node.siblings[i].widthRatio = 0;
    node.siblings[i].leftRatio = 1;
    node.siblings[i].children.forEach(hide.bind(null, 1));
  }
};

const transformData = (focused: Data, layout: SiblingLayout) => {
  let current: Data | null = focused;
  while (current) {
    current.widthRatio = 1;
    current.leftRatio = 0;
    hideSiblings(current);
    current = current.parent;
    if (current) {
      current.navigable = true;
    }
  }
  adjustChildren(focused.children, layout);
};

const adjustChildren = (
  data: Data[],
  layout: SiblingLayout,
  leftRatio = 0,
  parentRatio = 1
) => {
  let totalValue = 0;
  data.forEach(entry => {
    totalValue += entry.value;
  });
  data.forEach(entry => {
    let widthRatio = (entry.value / totalValue) * parentRatio;
    if (layout === 'equal') {
      widthRatio = parentRatio / data.length;
    }
    entry.widthRatio = widthRatio;
    entry.leftRatio = leftRatio;
    adjustChildren(entry.children, layout, leftRatio, widthRatio);
    leftRatio += widthRatio;
  });
};

const restore = (entry: Data) => {
  entry.navigable = false;
  entry.leftRatio = entry.originalLeftRatio;
  entry.widthRatio = entry.originalWidthRatio;
  entry.children.forEach(restore);
};

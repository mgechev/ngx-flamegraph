# ngx-flamegraph

Flame graph for Angular. With this package you can visualize stack traces.

## Demo

You can try it out [here](https://ngx-flamegraph.firebaseapp.com/).

## Usage

```shell script
npm i ngx-flamegraph --save
```

In your app import the `NgxFlamegraphModule`:

```ts
import { NgxFlamegraphModule } from 'ngx-flamegraph';

@NgModule({
  imports: [NgxFlamegraphModule],
  // ...
})
export class AppModule {}
```

Use the `ngx-flamegraph` component:

```ts
import {Component, OnInit} from '@angular/core';

interface Data {
  value: number;
  label: string;
  children: Data[];
  color?: string;
}

@Component({
  selector: 'app-root',
  template: `
    <ngx-flamegraph
       [config]="{ data, color }"
       (frameClick)="handleClick($event)"
       (frameMouseEnter)="handleMouseEnter($event)"
       (frameMouseLeave)="handleMouseLeave($event)"
       siblingLayout="relative"
       [width]="width"
       [levelHeight]="30"
       [tooltipEnabled]="true"
    ></ngx-flamegraph>
  `
})
export class AppComponent implements OnInit {
  width = window.innerWidth - 100;

  // Optional property.
  color = {
    hue: [50, 0],
    saturation: [80, 80],
    lightness: [55, 60],
  };
  data = [
    {
      label: 'root',
      value: 10,
      children: [
        { label: 'foo', value: 8, children: [] },
        { label: 'bar', value: 8, color: '#ff0000', children: [] },
      ],
    },
  ];

  handleClick(entry: Data) {
    // ...
  }

  handleMouseEnter(entry: Data) {
    // ...
  }

  handleMouseLeave(entry: Data) {
    // ...
  }
}
```

## Configuration

- `data` - property of type `RawData[]`. `RawData` is the same interface as `Data` in the example above.
- `siblingLayout` - `equal` or `relative`. Equal will set all the siblings with the same width, compared to `relative`, which will look at their values relative to the sum of the values of all the siblings.
- `width` - sets the width of the chart.
- `levelHeight` - sets the height per level of the chart. Default `25`.
- `tooltipEnabled` - shows a tooltip for the narrow bars that can't display the whole label. Default: `false`.

## Stylization

The component exposes several CSS variables for custom stylization:

```css
ngx-flamegraph {
  /* Font family – affects both the flamegraph bars and the tooltips */
  --ngx-fg-font-family: sans-serif;

  /* Bar */
  --ngx-fg-bar-font-size: 0.8rem;
  --ngx-fg-bar-text-color: white;
  --ngx-fg-bar-padding-inline: 0.375rem;

  /* Tooltip */
  --ngx-fg-tooltip-font-size: 0.75rem;
  --ngx-fg-tooltip-padding: 0.375rem 0.5rem;
  --ngx-fg-tooltip-text-color: white;
  --ngx-fg-tooltip-background: rgba(0, 0, 0, 0.8);
}
```

## Related work

`ngx-flamegraph` was inspired by the following prior work:

- [FlameGraph](https://github.com/brendangregg/FlameGraph)
- [CPU Flame Graphs](http://www.brendangregg.com/FlameGraphs/cpuflamegraphs.html)
- [D3 flame graph](https://github.com/spiermar/d3-flame-graph)
- [Flame graph by MapBox](https://github.com/mapbox/flamebearer)
- [React Flame Graph](https://github.com/bvaughn/react-flame-graph)

## License

MIT

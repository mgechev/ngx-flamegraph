import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxFlamegraphComponent } from './ngx-flamegraph.component';
import { FlamegraphNodeComponent } from './flamegraph-node/flamegraph-node.component';
import { FlamegraphComponent } from './flamegraph/flamegraph.component';
import { FlamegraphForDirective } from './flamegraph/flamegraph-for.directive';


@NgModule({
  declarations: [NgxFlamegraphComponent, FlamegraphForDirective, FlamegraphNodeComponent, FlamegraphComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxFlamegraphComponent]
})
export class NgxFlamegraphModule { }

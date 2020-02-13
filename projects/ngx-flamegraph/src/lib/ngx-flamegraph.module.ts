import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { NgxFlamegraphComponent } from './ngx-flamegraph.component';
import {FlamegraphNodeComponent} from './flamegraph-node/flamegraph-node.component';


@NgModule({
  declarations: [NgxFlamegraphComponent, FlamegraphNodeComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxFlamegraphComponent]
})
export class NgxFlamegraphModule { }

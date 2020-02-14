import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { NgxFlamegraphComponent } from './ngx-flamegraph.component';
import {FlamegraphNodeComponent} from './flamegraph-node/flamegraph-node.component';
import {PopupComponent} from './popup/popup.component';
import {FlamegraphComponent} from './flamegraph/flamegraph.component';


@NgModule({
  declarations: [NgxFlamegraphComponent, FlamegraphNodeComponent, PopupComponent, FlamegraphComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxFlamegraphComponent]
})
export class NgxFlamegraphModule { }

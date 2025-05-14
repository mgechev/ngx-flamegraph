import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxFlamegraphComponent } from './ngx-flamegraph.component';
import { FlamegraphComponent } from './flamegraph/flamegraph.component';

@NgModule({
  declarations: [NgxFlamegraphComponent, FlamegraphComponent],
  imports: [CommonModule],
  exports: [NgxFlamegraphComponent],
})
export class NgxFlamegraphModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxFlamegraphComponent } from './ngx-flamegraph.component';
import { FlamegraphComponent } from './flamegraph/flamegraph.component';
import { provideWindow } from './window.provider';

@NgModule({
  declarations: [NgxFlamegraphComponent, FlamegraphComponent],
  imports: [CommonModule],
  exports: [NgxFlamegraphComponent],
  providers: [provideWindow()],
})
export class NgxFlamegraphModule {}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NgxFlamegraphComponent, FlameGraphConfig } from './ngx-flamegraph.component';
import { FlamegraphComponent } from './flamegraph/flamegraph.component';
import { provideWindow } from './window.provider';
import { RawData, RgbColor } from './utils';

@Component({
  template: `
    <div style="width: 800px;">
      <ngx-flamegraph
        [config]="config"
        [siblingLayout]="siblingLayout"
        [levelHeight]="levelHeight"
        [width]="width"
        [tooltipEnabled]="tooltipEnabled"
        (frameClick)="onFrameClick($event)"
        (frameMouseEnter)="onFrameMouseEnter($event)"
        (frameMouseLeave)="onFrameMouseLeave($event)"
      >
      </ngx-flamegraph>
    </div>
  `,
  standalone: false,
})
class TestHostComponent {
  config: FlameGraphConfig = {
    data: [
      {
        label: 'Root',
        value: 100,
        children: [
          { label: 'Child 1', value: 40, children: [] },
          { label: 'Child 2', value: 60, children: [] },
        ],
      },
    ],
    minimumBarSize: 5,
  };
  siblingLayout: 'relative' | 'equal' = 'relative';
  levelHeight = 30;
  width: number | null = 600;
  tooltipEnabled = false;

  clickedData: RawData | null = null;
  enteredData: RawData | null = null;
  leftData: RawData | null = null;

  onFrameClick(data: RawData) {
    this.clickedData = data;
  }
  onFrameMouseEnter(data: RawData) {
    this.enteredData = data;
  }
  onFrameMouseLeave(data: RawData) {
    this.leftData = data;
  }
}

describe('NgxFlamegraphComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let flamegraphComponent: NgxFlamegraphComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NgxFlamegraphComponent,
        FlamegraphComponent,
        TestHostComponent,
      ],
      providers: [provideWindow()],
    }).compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    flamegraphComponent = hostFixture.debugElement.children[0].children[0].componentInstance;
  });

  it('should create NgxFlamegraphComponent', () => {
    expect(flamegraphComponent).toBeTruthy();
  });

  describe('configuration and inputs', () => {
    it('should process config and set depth, entries, and minimumBarSize', () => {
      expect(flamegraphComponent.depth).toBe(2);
      expect(flamegraphComponent.entries.length).toBe(3);
      expect(flamegraphComponent.minimumBarSize).toBe(5);
    });

    it('should calculate hostStyles dynamically from depth and levelHeight', () => {
      // depth = 2, levelHeight = 30 => height: 60px
      expect(flamegraphComponent.hostStyles).toBe('height: 60px ');
    });

    it('should support RGB color configuration', () => {
      const rgbColor: RgbColor = {
        red: [200, 50],
        green: [100, 200],
        blue: [0, 255],
      };

      hostComponent.config = {
        data: [
          { label: 'Root RGB', value: 50, children: [] },
        ],
        color: rgbColor,
      };
      hostFixture.detectChanges();

      expect(flamegraphComponent.entries[0].color).toContain('rgb(');
    });
  });

  describe('zooming functionality', () => {
    it('should zoom into a child node on onZoom', () => {
      const childEntry = flamegraphComponent.entries[1]; // Child 1
      flamegraphComponent.onZoom(childEntry);

      expect(childEntry.widthRatio).toBe(1);
      expect(childEntry.leftRatio).toBe(0);
      expect(flamegraphComponent.entries[0].navigable).toBe(true);
    });

    it('should restore zoom when zooming a navigable node', () => {
      const rootEntry = flamegraphComponent.entries[0];
      const childEntry = flamegraphComponent.entries[1];

      flamegraphComponent.onZoom(childEntry);
      expect(rootEntry.navigable).toBe(true);

      flamegraphComponent.onZoom(rootEntry);
      expect(rootEntry.navigable).toBe(false);
      expect(childEntry.widthRatio).toBeCloseTo(0.4);
    });
  });

  describe('event handling', () => {
    it('should emit frameClick when flamegraph child emits frameClick', () => {
      const target = hostComponent.config.data[0];
      flamegraphComponent.frameClick.emit(target);
      expect(hostComponent.clickedData).toBe(target);
    });

    it('should emit frameMouseEnter and frameMouseLeave when observers exist', () => {
      const target = hostComponent.config.data[0];

      flamegraphComponent.onFrameMouseEnter(target);
      expect(hostComponent.enteredData).toBe(target);

      flamegraphComponent.onFrameMouseLeave(target);
      expect(hostComponent.leftData).toBe(target);
    });
  });

  describe('ResizeObserver and destruction', () => {
    it('should clean up timeouts and observers on ngOnDestroy', () => {
      expect(() => {
        flamegraphComponent.ngOnDestroy();
      }).not.toThrow();
    });
  });
});

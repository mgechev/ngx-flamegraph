import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlamegraphComponent } from './flamegraph.component';
import { WINDOW, provideWindow } from '../window.provider';
import { Data, RawData, maxValue, transformRawData } from '../utils';
import { defaultColors } from '../constants';

describe('FlamegraphComponent', () => {
  let component: FlamegraphComponent;
  let fixture: ComponentFixture<FlamegraphComponent>;

  const rawData: RawData[] = [
    {
      label: 'Function A (Very Long Label For Tooltip Testing)',
      value: 100,
      children: [
        { label: 'Short', value: 30, children: [] },
        { label: 'Child 2', value: 70, children: [] },
      ],
    },
  ];

  let entries: Data[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlamegraphComponent],
      providers: [provideWindow()],
    }).compileComponents();
  });

  beforeEach(() => {
    entries = transformRawData(rawData, 'relative', maxValue(rawData), defaultColors);
    fixture = TestBed.createComponent(FlamegraphComponent);
    component = fixture.componentInstance;
    component.data = entries;
    component.width = 500;
    component.levelHeight = 25;
    component.layout = 'relative';
    component.depth = 2;
    component.minimumBarSize = 2;
    component.tooltipEnabled = false;
    fixture.detectChanges();
  });

  it('should create FlamegraphComponent', () => {
    expect(component).toBeTruthy();
    expect(component.entries.length).toBe(3);
  });

  describe('layout and dimension calculations', () => {
    it('should compute getTop correctly including 1px gap per level', () => {
      const root = entries[0]; // rowNumber 0
      const child = entries[1]; // rowNumber 1

      expect(component.getTop(root)).toBe(0);
      // rowNumber * levelHeight + rowNumber = 1 * 25 + 1 = 26
      expect(component.getTop(child)).toBe(26);
    });

    it('should compute getLeft and getWidth based on width', () => {
      const root = entries[0];
      const child1 = entries[1]; // widthRatio 0.3, leftRatio 0
      const child2 = entries[2]; // widthRatio 0.7, leftRatio 0.3

      expect(component.getLeft(root)).toBe(0);
      expect(component.getWidth(root)).toBe(500);

      expect(component.getLeft(child1)).toBe(0);
      expect(component.getWidth(child1)).toBeCloseTo(150);

      expect(component.getLeft(child2)).toBeCloseTo(150);
      expect(component.getWidth(child2)).toBeCloseTo(350);
    });

    it('should compute getScaleXWidth with 1px column gap subtracted', () => {
      const root = entries[0];
      // pixelRatio for root: widthRatio / width = 1 / 500 = 0.002
      // getScaleXWidth: 1 - 0.002 = 0.998
      expect(component.getScaleXWidth(root)).toBeCloseTo(0.998);
    });

    it('should compute getClipPathWidth with inset percentage', () => {
      const root = entries[0];
      const clipPath = component.getClipPathWidth(root);
      expect(clipPath).toContain('inset(');
      expect(clipPath).toContain('% 0 0)');
    });
  });

  describe('DOM rendering and interaction events', () => {
    it('should render bar elements in DOM', () => {
      const bars = fixture.nativeElement.querySelectorAll('.ngx-fg-bar');
      expect(bars.length).toBe(3);
      expect(bars[0].getAttribute('data-label')).toBe(rawData[0].label);
    });

    it('should emit frameClick when a bar fill is clicked', () => {
      spyOn(component.frameClick, 'emit');
      const barFill = fixture.nativeElement.querySelector('.ngx-fg-bar-fill[data-idx="0"]');
      barFill.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(component.frameClick.emit).toHaveBeenCalledWith(rawData[0]);
    });

    it('should emit zoom when a bar fill is double-clicked', () => {
      spyOn(component.zoom, 'emit');
      const barFill = fixture.nativeElement.querySelector('.ngx-fg-bar-fill[data-idx="1"]');
      barFill.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

      expect(component.zoom.emit).toHaveBeenCalledWith(entries[1]);
    });

    it('should emit frameMouseEnter and frameMouseLeave on mousemove', () => {
      spyOn(component.frameMouseEnter, 'emit');
      spyOn(component.frameMouseLeave, 'emit');

      const host = fixture.nativeElement;
      const barFill1 = host.querySelector('.ngx-fg-bar-fill[data-idx="0"]');
      const barFill2 = host.querySelector('.ngx-fg-bar-fill[data-idx="1"]');

      // Move onto bar 0
      barFill1.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 50, clientY: 10 }));
      expect(component.frameMouseEnter.emit).toHaveBeenCalledWith(rawData[0]);

      // Move onto bar 1
      barFill2.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 60, clientY: 30 }));
      expect(component.frameMouseLeave.emit).toHaveBeenCalledWith(rawData[0]);
      expect(component.frameMouseEnter.emit).toHaveBeenCalledWith(rawData[0].children[0]);

      // Leave the chart area
      host.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      expect(component.frameMouseLeave.emit).toHaveBeenCalledWith(rawData[0].children[0]);
    });
  });

  describe('tooltips', () => {
    it('should show tooltip when tooltipEnabled is true and bar is narrow', () => {
      component.tooltipEnabled = true;
      fixture.detectChanges();

      // Narrow bar: width 150 < 47 chars * 14px (658px)
      component.width = 150;
      fixture.detectChanges();

      const barFill = fixture.nativeElement.querySelector('.ngx-fg-bar-fill[data-idx="0"]');
      barFill.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 20, clientY: 10 }));

      const tooltip = fixture.nativeElement.querySelector('.ngx-fg-tooltip');
      expect(tooltip).toBeTruthy();
      expect(tooltip.textContent).toBe(rawData[0].label);

      // Mouse leave removes tooltip
      fixture.nativeElement.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      expect(fixture.nativeElement.querySelector('.ngx-fg-tooltip')).toBeNull();
    });

    it('should NOT show tooltip when tooltipEnabled is false', () => {
      component.tooltipEnabled = false;
      component.width = 150;
      fixture.detectChanges();

      const barFill = fixture.nativeElement.querySelector('.ngx-fg-bar-fill[data-idx="0"]');
      barFill.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 20, clientY: 10 }));

      expect(fixture.nativeElement.querySelector('.ngx-fg-tooltip')).toBeNull();
    });
  });
});

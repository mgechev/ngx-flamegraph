import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxFlamegraphModule } from 'ngx-flamegraph';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NgxFlamegraphModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have default and RGB configs defined', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.config).toBeDefined();
    expect(app.rgbConfig).toBeDefined();
    expect(app.rgbConfig.color).toEqual({
      red: [50, 240],
      green: [120, 60],
      blue: [220, 30],
    });
  });

  it('should render the headers in the template', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Angular Flame Graph');
    const h3s = Array.from(compiled.querySelectorAll('h3')).map((h) => h.textContent);
    expect(h3s).toContain('Fixed Width');
    expect(h3s).toContain('Responsive (with tooltips)');
    expect(h3s).toContain('RGB Colors');
  });
});

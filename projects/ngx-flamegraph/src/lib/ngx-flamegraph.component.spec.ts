import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgxFlamegraphComponent } from './ngx-flamegraph.component';

describe('NgxFlamegraphComponent', () => {
  let component: NgxFlamegraphComponent;
  let fixture: ComponentFixture<NgxFlamegraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFlamegraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFlamegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

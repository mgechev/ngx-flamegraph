import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { WINDOW, provideWindow } from './window.provider';

describe('WINDOW provider', () => {
  it('should provide the global window object in browser platform', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        provideWindow(),
      ],
    });

    const win = TestBed.inject(WINDOW);
    expect(win).toBe(window);
  });

  it('should provide an empty object in non-browser (server) platform', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' },
        provideWindow(),
      ],
    });

    const win = TestBed.inject(WINDOW);
    expect(win).not.toBe(window);
    expect(win).toEqual({} as Window);
  });
});

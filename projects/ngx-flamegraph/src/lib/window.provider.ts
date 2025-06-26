import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID, Provider, inject } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('WINDOW');

export const provideWindow = (): Provider => ({
  provide: WINDOW,
  useFactory: () => {
    const platformId = inject(PLATFORM_ID);
    return isPlatformBrowser(platformId) ? window : {};
  },
});

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only initialize theme in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
    }
  }

  private initTheme(): void {
    // Only run if localStorage and window exist
    if (typeof window === 'undefined' || !window.localStorage) return;

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      this.darkModeSubject.next(isDark);
      this.applyTheme(isDark);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkModeSubject.next(prefersDark);
      this.applyTheme(prefersDark);
    }
  }

  toggleTheme(): void {
    const newValue = !this.darkModeSubject.value;
    this.darkModeSubject.next(newValue);
    this.applyTheme(newValue);

    // Save only if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
    }
  }

  private applyTheme(isDark: boolean): void {
    if (typeof document === 'undefined') return; // Avoid SSR issues

    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}

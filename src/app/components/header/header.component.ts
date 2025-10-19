import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:true,
  imports:[CommonModule,RouterModule]
})
export class HeaderComponent implements OnInit {
 isScrolled = false;
  isMobileMenuOpen = false;

  constructor(
    public themeService: ThemeService, // Inject your theme service
    private router: Router
  ) {}

  ngOnInit() {
    // Auto-close menu on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMobileMenu();
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  // Close menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const navMenu = document.querySelector('.nav-menu');
    const menuButton = document.querySelector('.mobile-menu-btn');
    
    if (this.isMobileMenuOpen && 
        navMenu && 
        !navMenu.contains(target) && 
        menuButton && 
        !menuButton.contains(target)) {
      this.closeMobileMenu();
    }
  }

  // Prevent body scroll when menu is open
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevent body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

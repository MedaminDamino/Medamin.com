import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone:true,
  imports:[
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
    
  ]
})
export class AppComponent implements OnInit {
  title = 'Medamin - Portfolio';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Initialize theme service
    this.themeService.darkMode$.subscribe();
  }
}
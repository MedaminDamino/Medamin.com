import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone:true,
  imports:[CommonModule,RouterModule]
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = [];

  constructor(
    private portfolioService: PortfolioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.portfolioService.getFeaturedProjects().subscribe(projects => {
      this.featuredProjects = projects.slice(0, 3);
    });
  }

  navigateToProjects(): void {
    this.router.navigate(['/projects']);
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }
}
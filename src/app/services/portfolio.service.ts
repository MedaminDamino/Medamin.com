import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Project } from '../models/project.model';
import { Experience } from '../models/experience.model';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  private experienceSubject = new BehaviorSubject<Experience[]>([]);
  private skillsSubject = new BehaviorSubject<Skill[]>([]);

  constructor() {
    this.loadInitialData();
  }

  // Projects
  getProjects(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  getFeaturedProjects(): Observable<Project[]> {
    return new Observable(observer => {
      this.projectsSubject.subscribe(projects => {
        observer.next(projects.filter(p => p.featured));
      });
    });
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return new Observable(observer => {
      this.projectsSubject.subscribe(projects => {
        observer.next(projects.find(p => p.id === id));
      });
    });
  }

  // Experience
  getExperience(): Observable<Experience[]> {
    return this.experienceSubject.asObservable();
  }

  // Skills
  getSkills(): Observable<Skill[]> {
    return this.skillsSubject.asObservable();
  }

  getSkillsByCategory(category: string): Observable<Skill[]> {
    return new Observable(observer => {
      this.skillsSubject.subscribe(skills => {
        observer.next(skills.filter(s => s.category === category));
      });
    });
  }

  private loadInitialData(): void {
    // Load projects
    const projects: Project[] = [
      {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with real-time inventory management',
        longDescription: 'A comprehensive e-commerce platform built with Angular 17 and Node.js, featuring real-time inventory management, payment processing with Stripe, admin dashboard, and customer analytics.',
        technologies: ['Angular 17', 'Node.js', 'MongoDB', 'Stripe API', 'AWS', 'Redis'],
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/example/ecommerce',
        featured: true,
        category: 'web',
        createdDate: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Task Management App',
        description: 'Collaborative project management tool with real-time updates',
        longDescription: 'A collaborative task management application with real-time updates, file sharing, team communication, and advanced project analytics.',
        technologies: ['React', 'Express.js', 'PostgreSQL', 'Socket.io', 'Docker'],
        demoUrl: 'https://taskapp.example.com',
        githubUrl: 'https://github.com/example/taskapp',
        featured: true,
        category: 'web',
        createdDate: new Date('2023-11-20')
      },
      {
        id: '3',
        title: 'Mobile Banking App',
        description: 'Secure mobile banking with biometric authentication',
        longDescription: 'A secure mobile banking application featuring biometric authentication, real-time transaction monitoring, budgeting tools, and investment tracking.',
        technologies: ['React Native', 'Node.js', 'MySQL', 'Firebase', 'JWT'],
        featured: true,
        category: 'mobile',
        createdDate: new Date('2023-08-10')
      }
    ];

    // Load experience
    const experience: Experience[] = [
      {
        id: '1',
        position: 'Senior Full Stack Developer',
        company: 'TechCorp Solutions',
        companyUrl: 'https://techcorp.example.com',
        startDate: new Date('2022-03-01'),
        location: 'San Francisco, CA',
        description: 'Lead development of enterprise applications serving 100k+ users',
        responsibilities: [
          'Architected microservices infrastructure using Node.js and Docker',
          'Led team of 5 developers in agile development practices',
          'Implemented CI/CD pipelines reducing deployment time by 60%',
          'Mentored junior developers and conducted code reviews'
        ],
        technologies: ['Angular 17', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'Kubernetes'],
        achievements: [
          'Reduced application load time by 40%',
          'Increased team productivity by 35%',
          'Successfully delivered 12 major features on time'
        ]
      },
      {
        id: '2',
        position: 'Full Stack Developer',
        company: 'InnovateLabs',
        startDate: new Date('2020-06-01'),
        endDate: new Date('2022-02-28'),
        location: 'Remote',
        description: 'Developed scalable web applications and implemented DevOps practices',
        responsibilities: [
          'Built responsive web applications using React and Vue.js',
          'Implemented RESTful APIs and GraphQL endpoints',
          'Set up monitoring and logging systems',
          'Collaborated with UX/UI designers on user experience improvements'
        ],
        technologies: ['React', 'Vue.js', 'Express.js', 'MongoDB', 'Jenkins', 'Azure'],
        achievements: [
          'Launched 8 successful web applications',
          'Improved API response time by 50%',
          'Implemented automated testing increasing code coverage to 85%'
        ]
      }
    ];

    // Load skills
    const skills: Skill[] = [
      { id: '1', name: 'Angular', category: 'frontend', proficiency: 95, icon: '🅰️', description: 'Expert in Angular 17+ with signals, standalone components' },
      { id: '2', name: 'React', category: 'frontend', proficiency: 90, icon: '⚛️', description: 'Advanced React with hooks, context, and modern patterns' },
      { id: '3', name: 'Vue.js', category: 'frontend', proficiency: 85, icon: '💚', description: 'Proficient in Vue 3 composition API and Nuxt.js' },
      { id: '4', name: 'TypeScript', category: 'frontend', proficiency: 92, icon: '🔷', description: 'Strong typing and advanced TypeScript patterns' },
      { id: '5', name: 'Node.js', category: 'backend', proficiency: 88, icon: '🟢', description: 'Express.js, Nest.js, and serverless functions' },
      { id: '6', name: 'Python', category: 'backend', proficiency: 82, icon: '🐍', description: 'Django, FastAPI, and data processing' },
      { id: '7', name: 'PostgreSQL', category: 'database', proficiency: 85, icon: '🐘', description: 'Advanced queries, indexing, and optimization' },
      { id: '8', name: 'MongoDB', category: 'database', proficiency: 80, icon: '🍃', description: 'Document design and aggregation pipelines' },
      { id: '9', name: 'AWS', category: 'cloud', proficiency: 87, icon: '☁️', description: 'EC2, Lambda, S3, RDS, and CloudFormation' },
      { id: '10', name: 'Docker', category: 'tools', proficiency: 83, icon: '🐳', description: 'Containerization and orchestration with Kubernetes' }
    ];

    this.projectsSubject.next(projects);
    this.experienceSubject.next(experience);
    this.skillsSubject.next(skills);
  }
}

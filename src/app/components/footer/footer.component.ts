import { Component, OnInit } from '@angular/core';
import { ContactInfo } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
    standalone:true,
  imports:[CommonModule]
})
export class FooterComponent implements OnInit {
  contactInfo: ContactInfo | null = null;
  currentYear = new Date().getFullYear();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    
  }
}

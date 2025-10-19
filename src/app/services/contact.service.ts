import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { ContactInfo } from '../models/contact.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private serviceID = 'service_gmail';
  private templateID = 'template_k68gxv8';
  private publicKey = 'ZuLMfFxUGBCLM7Dgp';

  sendMessage(formData: { name: string; email: string; message: string }) {
    return emailjs.send(
      this.serviceID,
      this.templateID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      this.publicKey
    );
  }
   
}

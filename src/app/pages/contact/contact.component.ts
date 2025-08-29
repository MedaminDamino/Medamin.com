import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { isObservable, firstValueFrom, Subject } from 'rxjs';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
    subject:['',Validators.required]
  });

  email = 'medamin.abdelkafi753@#64;gmail.com';
  // Replace with your real phone; display-friendly for UI, sanitized for tel: href
  phone = '+216 52 521 434';

  submitted = false;
  pending = false;
  success = false;
  errorMsg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  get telHref(): string {
    const cleaned = this.phone.replace(/[^+0-9]/g, '');
    return `tel:${cleaned}`;
  }

  async onSubmit() {
    this.submitted = true;
    this.errorMsg = null;

    if (this.pending) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.pending = true;
    this.success = false;

    const formData = this.form.getRawValue() as {
      name: string;
      email: string;
      message: string;
      subject: string;
    };

    try {
      // result may be: void | Promise<any> | Observable<any>
      const result = this.contactService.sendMessage(formData) as unknown;

      if (isObservable(result)) {
        await firstValueFrom(result as any);
      } else {
        // Handles Promise or void (resolves immediately for void/sync)
        await Promise.resolve(result);
      }

      this.success = true;
      this.form.reset();
      this.submitted = false;
    } catch (e) {
      this.errorMsg = 'Something went wrong. Please try again.';
    } finally {
      this.pending = false;
    }
  }
}

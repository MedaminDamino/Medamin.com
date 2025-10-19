export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}
export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  twitter?: string;
}
export interface Experience {
  id: string;
  position: string;
  company: string;
  companyUrl?: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
}
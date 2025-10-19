export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'mobile' | 'tools';
  proficiency: number; // 1-100
  icon: string;
  description?: string;
}
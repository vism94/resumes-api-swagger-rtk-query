// src/types/resume.ts
export type CommentType = {
  id: number;
  text: string;
  isImportant: boolean;
  resumeId: number;
};

export type ResumeType = {
  id: number;
  img: string;
  fullName: string;
  birthDate: string; // changed from Date to string for simplicity
  about: string;
  technologies: string[];
  achievements: string[];
  education: string;
  preferred: string;
  phone: string;
  telegram: string;
  git: string;
  email: string;
  salary: number;
  comments: CommentType[];
};

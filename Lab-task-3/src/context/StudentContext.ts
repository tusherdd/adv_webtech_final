import { createContext } from "react";

export interface Student {
  name: string;
  id: number;
  avatar: string;
  gpa: number;
  major: string;
  courses: string[];
}

export interface StudentContextType {
  students: Student[];
  addStudent: (student: Student) => void;
  removeStudent: (id: number) => void;
}

export const StudentContext =
  createContext<StudentContextType | undefined>(undefined);
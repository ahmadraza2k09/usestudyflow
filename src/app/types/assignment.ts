export type PriorityLevel = 'Low' | 'Medium' | 'High';
export type AssignmentStatus = 'Pending' | 'Completed';

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: PriorityLevel;
  status: AssignmentStatus;
  notes?: string;
  createdAt: string;
}

export interface AssignmentStats {
  total: number;
  pending: number;
  completed: number;
  overdue: number;
  completionRate: number;
}

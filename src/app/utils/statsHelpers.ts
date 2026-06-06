import { Assignment, AssignmentStats } from '../types/assignment';
import { isOverdue } from './dateHelpers';

export const calculateStats = (assignments: Assignment[]): AssignmentStats => {
  const total = assignments.length;
  const pending = assignments.filter(a => a.status === 'Pending').length;
  const completed = assignments.filter(a => a.status === 'Completed').length;
  const overdue = assignments.filter(a => isOverdue(a.dueDate, a.status)).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, pending, completed, overdue, completionRate };
};

export const isOverdue = (dueDate: string, status: string): boolean => {
  if (status === 'Completed') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

export const getDaysUntilDue = (dueDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diff = due.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const formatDueDate = (dueDate: string): string => {
  const daysUntil = getDaysUntilDue(dueDate);

  if (daysUntil === 0) return 'Due Today';
  if (daysUntil === 1) return 'Due Tomorrow';
  if (daysUntil === -1) return '1 Day Overdue';
  if (daysUntil < 0) return `${Math.abs(daysUntil)} Days Overdue`;
  return `${daysUntil} Days Remaining`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

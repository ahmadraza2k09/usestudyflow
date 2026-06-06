import { Assignment } from '../types/assignment';

const STORAGE_KEY = 'studyflow_assignments';

export const loadAssignments = (): Assignment[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading assignments:', error);
    return [];
  }
};

export const saveAssignments = (assignments: Assignment[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
  } catch (error) {
    console.error('Error saving assignments:', error);
  }
};

export const addAssignment = (assignment: Assignment): Assignment[] => {
  const assignments = loadAssignments();
  const newAssignments = [...assignments, assignment];
  saveAssignments(newAssignments);
  return newAssignments;
};

export const updateAssignment = (id: string, updates: Partial<Assignment>): Assignment[] => {
  const assignments = loadAssignments();
  const newAssignments = assignments.map(a =>
    a.id === id ? { ...a, ...updates } : a
  );
  saveAssignments(newAssignments);
  return newAssignments;
};

export const deleteAssignment = (id: string): Assignment[] => {
  const assignments = loadAssignments();
  const newAssignments = assignments.filter(a => a.id !== id);
  saveAssignments(newAssignments);
  return newAssignments;
};

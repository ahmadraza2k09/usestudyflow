import { useState, useEffect } from 'react';
import { Assignment, PriorityLevel } from '../types/assignment';
import { X } from 'lucide-react';

interface AssignmentFormProps {
  assignment?: Assignment;
  onSave: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function AssignmentForm({ assignment, onSave, onCancel }: AssignmentFormProps) {
  const [title, setTitle] = useState(assignment?.title || '');
  const [subject, setSubject] = useState(assignment?.subject || '');
  const [dueDate, setDueDate] = useState(assignment?.dueDate || '');
  const [priority, setPriority] = useState<PriorityLevel>(assignment?.priority || 'Medium');
  const [notes, setNotes] = useState(assignment?.notes || '');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim() || !dueDate) return;

    onSave({
      title: title.trim(),
      subject: subject.trim(),
      dueDate,
      priority,
      status: assignment?.status || 'Pending',
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-card rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {assignment ? 'Edit Assignment' : 'Add New Assignment'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Assignment Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="e.g., Math Homework Chapter 5"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject Name *
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="e.g., Mathematics"
              required
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
              Due Date *
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium mb-2">
              Priority Level *
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityLevel)}
              className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              placeholder="Add any additional notes..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {assignment ? 'Update Assignment' : 'Add Assignment'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 rounded-lg font-medium border border-border hover:bg-accent transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

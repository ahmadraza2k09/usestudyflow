import { BookOpen, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddClick: () => void;
  message?: string;
}

export function EmptyState({ onAddClick, message = "No assignments yet" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <BookOpen className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{message}</h3>
      <p className="text-muted-foreground mb-6 text-center max-w-sm">
        Create your first assignment to get started with StudyFlow
      </p>
      <button
        onClick={onAddClick}
        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Assignment
      </button>
    </div>
  );
}

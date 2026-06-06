import { Assignment, PriorityLevel } from '../types/assignment';
import { formatDate, formatDueDate, isOverdue } from '../utils/dateHelpers';
import { CheckCircle2, Circle, Edit2, Trash2, Calendar, BookOpen } from 'lucide-react';

interface AssignmentCardProps {
  assignment: Assignment;
  onToggleStatus: (id: string) => void;
  onEdit: (assignment: Assignment) => void;
  onDelete: (id: string) => void;
}

const priorityColors: Record<PriorityLevel, string> = {
  High: 'bg-red-100 text-red-700 border-red-200',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Low: 'bg-green-100 text-green-700 border-green-200',
};

export function AssignmentCard({ assignment, onToggleStatus, onEdit, onDelete }: AssignmentCardProps) {
  const overdueStatus = isOverdue(assignment.dueDate, assignment.status);
  const dueDateText = formatDueDate(assignment.dueDate);

  return (
    <div className={`bg-card rounded-lg p-5 shadow-sm border transition-all hover:shadow-md ${
      assignment.status === 'Completed' ? 'border-green-200 bg-green-50/30' : 'border-border'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => onToggleStatus(assignment.id)}
            className="mt-1 flex-shrink-0 hover:scale-110 transition-transform"
          >
            {assignment.status === 'Completed' ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : (
              <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold mb-2 ${assignment.status === 'Completed' ? 'line-through text-muted-foreground' : ''}`}>
              {assignment.title}
            </h4>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                {assignment.subject}
              </span>
              <span className={`inline-flex items-center gap-1 text-sm ${overdueStatus ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
                <Calendar className="w-4 h-4" />
                {formatDate(assignment.dueDate)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[assignment.priority]}`}>
                {assignment.priority} Priority
              </span>
              {overdueStatus && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                  {dueDateText}
                </span>
              )}
              {!overdueStatus && assignment.status === 'Pending' && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                  {dueDateText}
                </span>
              )}
            </div>

            {assignment.notes && (
              <p className="mt-3 text-sm text-muted-foreground">{assignment.notes}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(assignment)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Edit assignment"
          >
            <Edit2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
          </button>
          <button
            onClick={() => onDelete(assignment.id)}
            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
            aria-label="Delete assignment"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  subjectFilter: string;
  onSubjectFilterChange: (subject: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (priority: string) => void;
  sortBy: string;
  onSortByChange: (sortBy: string) => void;
  subjects: string[];
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  subjectFilter,
  onSubjectFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortBy,
  onSortByChange,
  subjects,
}: SearchAndFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search assignments..."
          className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filters:</span>
        </div>

        <select
          value={subjectFilter}
          onChange={(e) => onSubjectFilterChange(e.target.value)}
          className="px-4 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => onPriorityFilterChange(e.target.value)}
          className="px-4 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="px-4 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>
    </div>
  );
}

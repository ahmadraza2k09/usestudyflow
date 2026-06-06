import { useState, useEffect, useMemo } from 'react';
import { Assignment } from './types/assignment';
import { loadAssignments, saveAssignments, addAssignment, updateAssignment, deleteAssignment } from './utils/localStorage';
import { calculateStats } from './utils/statsHelpers';
import { isOverdue } from './utils/dateHelpers';
import { StatsCard } from './components/StatsCard';
import { ProgressCard } from './components/ProgressCard';
import { AssignmentCard } from './components/AssignmentCard';
import { AssignmentForm } from './components/AssignmentForm';
import { SearchAndFilters } from './components/SearchAndFilters';
import { EmptyState } from './components/EmptyState';
import { Plus, LayoutDashboard, ListTodo, BarChart3 } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import logoImg from '../imports/4be8767f-262c-407f-bba5-5a5060b0d95b.png';

type ViewTab = 'Dashboard' | 'Assignments' | 'Statistics';
type FilterTab = 'All' | 'Pending' | 'Completed' | 'Overdue';

export default function App() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [currentView, setCurrentView] = useState<ViewTab>('Dashboard');
  const [filterTab, setFilterTab] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | undefined>();

  useEffect(() => {
    setAssignments(loadAssignments());
  }, []);

  const stats = useMemo(() => calculateStats(assignments), [assignments]);

  const subjects = useMemo(() => {
    return Array.from(new Set(assignments.map(a => a.subject))).sort();
  }, [assignments]);

  const filteredAndSortedAssignments = useMemo(() => {
    let filtered = assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (assignment.notes && assignment.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSubject = !subjectFilter || assignment.subject === subjectFilter;
      const matchesPriority = !priorityFilter || assignment.priority === priorityFilter;

      let matchesTab = true;
      if (filterTab === 'Pending') matchesTab = assignment.status === 'Pending' && !isOverdue(assignment.dueDate, assignment.status);
      if (filterTab === 'Completed') matchesTab = assignment.status === 'Completed';
      if (filterTab === 'Overdue') matchesTab = isOverdue(assignment.dueDate, assignment.status);

      return matchesSearch && matchesSubject && matchesPriority && matchesTab;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'priority') {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    return filtered;
  }, [assignments, searchQuery, subjectFilter, priorityFilter, filterTab, sortBy]);

  const handleAddAssignment = (assignmentData: Omit<Assignment, 'id' | 'createdAt'>) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setAssignments(addAssignment(newAssignment));
    setShowForm(false);
  };

  const handleUpdateAssignment = (assignmentData: Omit<Assignment, 'id' | 'createdAt'>) => {
    if (!editingAssignment) return;
    setAssignments(updateAssignment(editingAssignment.id, assignmentData));
    setEditingAssignment(undefined);
    setShowForm(false);
  };

  const handleToggleStatus = (id: string) => {
    const assignment = assignments.find(a => a.id === id);
    if (!assignment) return;
    const newStatus = assignment.status === 'Pending' ? 'Completed' : 'Pending';
    setAssignments(updateAssignment(id, { status: newStatus }));
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setShowForm(true);
  };

  const handleDeleteAssignment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(deleteAssignment(id));
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingAssignment(undefined);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src={logoImg}
                alt="StudyFlow Logo"
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  StudyFlow
                </h1>
                <p className="text-xs text-muted-foreground">Stay Organized. Stay Ahead.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingAssignment(undefined);
                setShowForm(true);
              }}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Assignment</span>
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-card border-b border-border sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {(['Dashboard', 'Assignments', 'Statistics'] as ViewTab[]).map((view) => {
              const Icon = view === 'Dashboard' ? LayoutDashboard : view === 'Assignments' ? ListTodo : BarChart3;
              return (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-4 py-3 font-medium transition-colors relative flex items-center gap-2 ${
                    currentView === view
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {view}
                  {currentView === view && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'Dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatsCard
                  title="Total Assignments"
                  value={stats.total}
                  icon={ListTodo}
                  color="bg-blue-100 text-blue-600"
                />
                <StatsCard
                  title="Pending"
                  value={stats.pending}
                  icon={LayoutDashboard}
                  color="bg-yellow-100 text-yellow-600"
                />
                <StatsCard
                  title="Completed"
                  value={stats.completed}
                  icon={BarChart3}
                  color="bg-green-100 text-green-600"
                />
                <StatsCard
                  title="Overdue"
                  value={stats.overdue}
                  icon={LayoutDashboard}
                  color="bg-red-100 text-red-600"
                />
              </div>
              <ProgressCard
                completionRate={stats.completionRate}
                total={stats.total}
                completed={stats.completed}
              />
            </div>

            {assignments.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Upcoming Deadlines</h2>
                <div className="space-y-3">
                  {assignments
                    .filter(a => a.status === 'Pending')
                    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                    .slice(0, 5)
                    .map(assignment => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        onToggleStatus={handleToggleStatus}
                        onEdit={handleEditAssignment}
                        onDelete={handleDeleteAssignment}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === 'Assignments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">All Assignments</h2>
            </div>

            <div className="bg-card border border-border rounded-lg p-1 inline-flex gap-1">
              {(['All', 'Pending', 'Completed', 'Overdue'] as FilterTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    filterTab === tab
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                  {tab === 'All' && ` (${stats.total})`}
                  {tab === 'Pending' && ` (${stats.pending - stats.overdue})`}
                  {tab === 'Completed' && ` (${stats.completed})`}
                  {tab === 'Overdue' && ` (${stats.overdue})`}
                </button>
              ))}
            </div>

            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              subjectFilter={subjectFilter}
              onSubjectFilterChange={setSubjectFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              subjects={subjects}
            />

            {filteredAndSortedAssignments.length === 0 ? (
              assignments.length === 0 ? (
                <EmptyState onAddClick={() => setShowForm(true)} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No assignments match your filters</p>
                </div>
              )
            ) : (
              <div className="space-y-3">
                {filteredAndSortedAssignments.map(assignment => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onToggleStatus={handleToggleStatus}
                    onEdit={handleEditAssignment}
                    onDelete={handleDeleteAssignment}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === 'Statistics' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Statistics & Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Completion Rate</span>
                        <span className="font-semibold">{stats.completionRate}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all"
                          style={{ width: `${stats.completionRate}%` }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-4 bg-accent rounded-lg">
                        <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                      <div className="text-center p-4 bg-accent rounded-lg">
                        <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                        <p className="text-sm text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <h3 className="text-lg font-semibold mb-4">Subject Distribution</h3>
                  <div className="space-y-3">
                    {subjects.slice(0, 5).map(subject => {
                      const count = assignments.filter(a => a.subject === subject).length;
                      const percentage = (count / stats.total) * 100;
                      return (
                        <div key={subject}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{subject}</span>
                            <span className="font-semibold">{count}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <h3 className="text-lg font-semibold mb-4">Priority Breakdown</h3>
                  <div className="space-y-3">
                    {(['High', 'Medium', 'Low'] as const).map(priority => {
                      const count = assignments.filter(a => a.priority === priority).length;
                      const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                      const colors = {
                        High: 'from-red-500 to-red-600',
                        Medium: 'from-yellow-500 to-yellow-600',
                        Low: 'from-green-500 to-green-600'
                      };
                      return (
                        <div key={priority}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{priority} Priority</span>
                            <span className="font-semibold">{count}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${colors[priority]} h-full rounded-full`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <h3 className="text-lg font-semibold mb-4">Status Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium text-green-700">Completed</span>
                      <span className="text-2xl font-bold text-green-600">{stats.completed}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <span className="font-medium text-yellow-700">Pending</span>
                      <span className="text-2xl font-bold text-yellow-600">{stats.pending - stats.overdue}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <span className="font-medium text-red-700">Overdue</span>
                      <span className="text-2xl font-bold text-red-600">{stats.overdue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-muted-foreground text-center">
            This is a portfolio demonstration model and is not intended for production use. For a fully functional version with authentication, cloud database, multi-user support, backups, notifications, and enterprise features, contact:{' '}
            <a
              href="mailto:ahmadrazahfa@gmail.com"
              className="text-primary hover:underline"
            >
              ahmadrazahfa@gmail.com
            </a>
          </p>
        </div>
      </footer>

      {showForm && (
        <AssignmentForm
          assignment={editingAssignment}
          onSave={editingAssignment ? handleUpdateAssignment : handleAddAssignment}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}

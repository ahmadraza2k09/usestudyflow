interface ProgressCardProps {
  completionRate: number;
  total: number;
  completed: number;
}

export function ProgressCard({ completionRate, total, completed }: ProgressCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Completion Rate</span>
            <span className="font-semibold">{completionRate}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {completed} of {total} assignments completed
          </span>
        </div>
      </div>
    </div>
  );
}

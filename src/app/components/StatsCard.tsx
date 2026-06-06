import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-semibold">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

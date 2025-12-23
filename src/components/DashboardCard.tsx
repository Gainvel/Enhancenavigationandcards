import { cn } from "./ui/utils";

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function DashboardCard({ 
  className, 
  title, 
  subtitle, 
  action,
  children, 
  ...props 
}: DashboardCardProps) {
  return (
    <div 
      className={cn(
        "bg-[#242424] rounded-[10px] shadow-[0px_4px_11.4px_0px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col", 
        className
      )} 
      {...props}
    >
      {(title || action) && (
        <div className="flex items-center justify-between p-6 pb-2">
          <div className="space-y-1">
            {title && <h3 className="font-medium text-lg text-white tracking-tight">{title}</h3>}
            {subtitle && <p className="text-sm text-[#959595]">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6 pt-4 flex-1">
        {children}
      </div>
    </div>
  );
}

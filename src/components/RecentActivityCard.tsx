import { DashboardCard } from "./DashboardCard";
import { Eye, AlertTriangle, ShieldAlert, Ban, CircleDot } from "lucide-react";

export function RecentActivityCard() {
  const activities = [
    {
      id: 1,
      type: 'review',
      title: 'Low Confidence Detection',
      description: 'Confidence: 45%',
      location: 'Zone AA001',
      time: 'Just now',
      icon: Eye,
      color: 'text-yellow-400',
    },
    {
      id: 2,
      type: 'violation',
      title: 'Lane Obstruction',
      description: 'Vehicle straddling lane divider',
      location: 'Zone CD891',
      time: '5 mins ago',
      icon: Ban,
      color: 'text-orange-400',
    },
    {
      id: 3,
      type: 'violation',
      title: 'Double Parking',
      description: 'Blocking active traffic flow',
      location: 'Zone EF102',
      time: '12 mins ago',
      icon: CircleDot, 
      color: 'text-red-400',
    },
    {
      id: 4,
      type: 'review',
      title: 'Anomaly Detected',
      description: 'Stationary vehicle in transit zone',
      location: 'Zone GH445',
      time: '28 mins ago',
      icon: ShieldAlert,
      color: 'text-purple-400',
    },
    {
      id: 5,
      type: 'warning',
      title: 'Low Confidence Detection',
      description: 'Confidence: 52%',
      location: 'Zone AA001',
      time: '45 mins ago',
      icon: AlertTriangle,
      color: 'text-yellow-400',
    }
  ];

  return (
    <DashboardCard className="h-full bg-[#242424]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#959595] text-xs font-bold uppercase tracking-widest">
          Recent Incidents
        </h2>
        <button className="text-[10px] text-[#C7FFBF] hover:text-white transition-colors uppercase font-bold tracking-wider">
            View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 group cursor-pointer p-2 -mx-2 rounded-md hover:bg-[#2A2A2A] transition-colors">
            <div className={`mt-0.5 ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-white group-hover:text-[#C7FFBF] transition-colors truncate">
                    {activity.title}
                  </p>
                  <span className="text-[10px] text-[#606060]">{activity.time}</span>
              </div>
              <p className="text-xs text-[#959595]">
                {activity.location} • <span className="text-[#606060]">{activity.description}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-4 border-t border-[#303030] flex items-center justify-between text-xs text-[#606060]">
        <span>Last updated: Just now</span>
        <div className="flex gap-2 items-center">
            <span className="relative h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7FFBF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C7FFBF]"></span>
            </span>
            <span className="text-[#C7FFBF]">Live Monitor</span>
        </div>
      </div>
    </DashboardCard>
  );
}

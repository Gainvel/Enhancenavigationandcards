import { DashboardCard } from "./DashboardCard";

export function OccupancyCard() {
  const zones = [
    { id: "AB204", occupied: 28, total: 32 },
    { id: "CD891", occupied: 15, total: 30 },
    { id: "EF102", occupied: 32, total: 35 },
    { id: "GH445", occupied: 22, total: 28 },
  ];

  const totalSpots = zones.reduce((acc, zone) => acc + zone.total, 0);
  const occupiedSpots = zones.reduce((acc, zone) => acc + zone.occupied, 0);
  const percentage = Math.round((occupiedSpots / totalSpots) * 100);

  return (
    <DashboardCard className="h-full bg-[#242424]">
      <div className="flex flex-col h-full">
        {/* Header / Hero Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
             <h2 className="text-[#959595] text-xs font-bold uppercase tracking-widest">
              Live Occupancy
            </h2>
            <span className="text-[#C7FFBF] text-xs font-medium bg-[#C7FFBF]/10 px-2 py-0.5 rounded-full border border-[#C7FFBF]/20">
                High Demand
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
             <span className="text-5xl font-bold text-white leading-none tracking-tighter">
               {occupiedSpots} <span className="text-[#606060] text-3xl font-medium">/ {totalSpots}</span>
             </span>
             <span className="text-sm text-[#959595] font-medium pb-1">Vehicles</span>
          </div>

          {/* Smooth Bar */}
          <div className="relative h-3 w-full bg-[#303030] rounded-full overflow-hidden shadow-inner">
             <div 
                className="h-full bg-[#C7FFBF] rounded-full relative transition-all duration-500 ease-out shadow-[0_0_15px_rgba(199,255,191,0.4)]"
                style={{ width: `${percentage}%` }}
             >
             </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#303030] w-full mb-4"></div>

        {/* Zones List */}
        <div className="flex-1 flex flex-col gap-3">
          {zones.map((zone) => {
            const zonePercent = Math.round((zone.occupied / zone.total) * 100);
            const isHigh = zonePercent > 90;
            return (
              <div key={zone.id} className="group relative flex items-center justify-between p-3 rounded-lg bg-[#2A2A2A]/40 border border-[#333] hover:border-[#444] hover:bg-[#2A2A2A] transition-all duration-200">
                 <div className="flex items-center gap-3">
                    {/* Beveled LED Indicator */}
                    <div className="relative flex items-center justify-center w-3 h-3 bg-[#1a1a1a] rounded-full border border-[#333] shadow-inner">
                       <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isHigh ? 'bg-[#FF4444] shadow-[0_0_8px_rgba(255,68,68,0.8)]' : 'bg-[#C7FFBF] shadow-[0_0_8px_rgba(199,255,191,0.8)]'}`}></div>
                    </div>
                    
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-[#555] font-bold tracking-wider leading-none mb-0.5 group-hover:text-[#666] transition-colors">Zone</span>
                        <span className="text-[#E0E0E0] text-sm font-mono font-medium leading-none group-hover:text-white transition-colors">{zone.id}</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-4">
                    {/* Percentage Pill */}
                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${isHigh ? 'bg-[#FF4444]/10 text-[#FF8888]' : 'bg-[#C7FFBF]/10 text-[#C7FFBF]'}`}>
                        {zonePercent}%
                    </div>

                    {/* Count */}
                    <div className="text-right min-w-[50px]">
                        <span className="text-white text-sm font-bold tabular-nums">{zone.occupied}</span>
                        <span className="text-[#444] text-xs mx-1">/</span>
                        <span className="text-[#666] text-xs tabular-nums">{zone.total}</span>
                    </div>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardCard>
  );
}

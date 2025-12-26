import { DashboardCard } from "./DashboardCard";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { time: "6 AM", value: 15 },
  { time: "9 AM", value: 45 },
  { time: "12 PM", value: 95 }, // Noon Peak
  { time: "3 PM", value: 60 },  // Dip
  { time: "6 PM", value: 85 },  // Dinner Peak
  { time: "9 PM", value: 40 },
  { time: "12 AM", value: 20 },
];

export function PeakHoursChart() {
  return (
    <DashboardCard className="h-full bg-[#242424]">
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                 <h2 className="text-[#959595] text-xs font-bold uppercase tracking-widest">
                  Peak Hours Analysis
                </h2>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#C7FFBF]"></span>
                    <span className="text-[10px] text-[#606060] uppercase font-medium">Live Data</span>
                </div>
            </div>

          <div className="flex-1 w-full min-h-[200px] relative">
            <div className="absolute inset-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C7FFBF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C7FFBF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#333" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time" 
                  stroke="#505050" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#505050" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#242424', border: '1px solid #333', borderRadius: '4px', color: '#fff' }}
                  itemStyle={{ color: '#C7FFBF' }}
                  labelStyle={{ color: '#959595', marginBottom: '0.5rem' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#C7FFBF" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  activeDot={{ r: 4, strokeWidth: 0, fill: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[#303030] flex justify-between items-center">
             <div className="text-xs text-[#606060]">
                Peak times identified at <span className="text-[#C7FFBF] font-medium">12:00 PM</span> and <span className="text-[#C7FFBF] font-medium">6:00 PM</span>
             </div>
          </div>
      </div>
    </DashboardCard>
  );
}

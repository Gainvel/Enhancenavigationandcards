import { DashboardCard } from "./DashboardCard";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { day: "Mon", traffic: 2450 },
  { day: "Tue", traffic: 2800 },
  { day: "Wed", traffic: 2900 },
  { day: "Thu", traffic: 2600 },
  { day: "Fri", traffic: 3200 },
  { day: "Sat", traffic: 3800 },
  { day: "Sun", traffic: 1800 },
];

export function DailyTrafficCard() {
  return (
    <DashboardCard className="h-full bg-[#242424]">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#959595] text-xs font-bold uppercase tracking-widest">
              Daily Traffic
            </h2>
            <div className="text-[10px] text-[#606060] font-medium border border-[#303030] rounded px-1.5 py-0.5">
                Last 7 Days
            </div>
        </div>

        <div className="flex-1 w-full min-h-[200px] relative">
          <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
               <CartesianGrid vertical={false} stroke="#333" strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
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
                 tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip 
                cursor={{ fill: '#2A2A2A' }}
                contentStyle={{ backgroundColor: '#242424', border: '1px solid #333', borderRadius: '4px', color: '#fff' }}
                itemStyle={{ color: '#C7FFBF' }}
                labelStyle={{ color: '#959595', marginBottom: '0.5rem' }}
              />
              <Bar 
                dataKey="traffic" 
                fill="#C7FFBF" 
                radius={[2, 2, 0, 0]} 
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-xs text-[#959595] pt-4 border-t border-[#303030]">
          <span>Total Weekly Volume</span>
          <span className="text-white font-medium text-sm">19,550 Vehicles</span>
        </div>
      </div>
    </DashboardCard>
  );
}

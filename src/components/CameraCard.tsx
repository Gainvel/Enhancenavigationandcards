import React from "react";
import clsx from "clsx";
import { motion } from "motion/react";

export interface Zone {
  id: string; // e.g. ZN-A01-001-01-Z01
  status: "Occupied" | "Available";
}

export interface Camera {
  id: string; // e.g. ZN-A01-001-01
  status: "Online" | "Offline" | "Maintenance";
  lastUpdated: string;
  zones: Zone[];
}

interface CameraCardProps {
  camera: Camera;
  onSelect?: (camera: Camera) => void;
}

export function CameraCard({ camera, onSelect }: CameraCardProps) {
  const isOnline = camera.status === "Online";
  const occupiedCount = camera.zones.filter(z => z.status === "Occupied").length;
  const totalZones = camera.zones.length;

  return (
    <div 
      className="group bg-[#2A2A2A] rounded-2xl border border-[#333] hover:border-[#C7FFBF] transition-all duration-300 flex flex-col h-[320px] overflow-hidden shadow-sm hover:shadow-md"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#333] flex justify-between items-start bg-[#252525]">
        <div className="flex flex-col gap-1">
          <h3 className="text-white font-mono text-sm tracking-wider font-bold">
            {camera.id}
          </h3>
          <div className="flex items-center gap-2">
             <span className="text-[10px] text-[#808080] font-medium">
                {totalZones} ZONES
             </span>
             <span className="text-[10px] text-[#606060] font-mono">
                LAST UPDATE: {camera.lastUpdated.toUpperCase()}
             </span>
          </div>
        </div>
        
        {/* Connection Status Indicator */}
        {/* Green (#C7FFBF) for Online, Gray (#606060) for everything else. No Red/Yellow. */}
        <div className={clsx("flex items-center justify-center h-6 w-6 rounded-full border",
            camera.status === "Online" ? "bg-[#C7FFBF]/10 border-[#C7FFBF]/30" : "bg-[#606060]/10 border-[#606060]/30"
        )}>
            <div className={clsx("h-2 w-2 rounded-full", 
                camera.status === "Online" ? "bg-[#C7FFBF] shadow-[0_0_6px_#C7FFBF]" : "bg-[#606060]"
            )} />
        </div>
      </div>

      {/* Body: Scrollable Zone List */}
      <div className="flex-1 overflow-hidden flex flex-col bg-[#2A2A2A]">
        {/* List Header */}
        <div className="px-5 py-2 border-b border-[#333] flex justify-between items-center bg-[#282828]">
            <span className="text-[9px] text-[#959595] uppercase tracking-widest font-bold">Zone ID</span>
            <span className="text-[9px] text-[#959595] uppercase tracking-widest font-bold">Status</span>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-1">
            {camera.zones.map((zone, idx) => {
                const isOccupied = zone.status === "Occupied";
                return (
                    <div 
                        key={zone.id} 
                        // Rounding lessened from rounded-lg to rounded-sm
                        className="flex justify-between items-center py-2 px-3 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-sm transition-colors group/row"
                    >
                        <span className="text-[10px] font-mono text-[#CCCCCC] group-hover/row:text-white transition-colors truncate max-w-[140px]" title={zone.id}>
                            {zone.id}
                        </span>
                        
                        <div className="flex items-center gap-2">
                            <span className={clsx("text-[9px] font-bold tracking-wider", 
                                // Occupied = Pastel Red (#FFB4B4), Unoccupied = Pastel Green (#C7FFBF)
                                isOccupied ? "text-[#FFB4B4]" : "text-[#C7FFBF]"
                            )}>
                                {isOccupied ? "OCCUPIED" : "AVAILABLE"}
                            </span>
                            <div className={clsx("w-1.5 h-1.5 rounded-full", 
                                isOccupied ? "bg-[#FFB4B4]" : "bg-[#C7FFBF]"
                            )} />
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Footer - Mini Stats */}
      <div className="px-5 py-3 border-t border-[#333] bg-[#252525] flex justify-between items-center">
         <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
               <div className="h-4 w-4 rounded-full bg-[#333] border border-[#252525]"></div>
               <div className="h-4 w-4 rounded-full bg-[#444] border border-[#252525]"></div>
               <div className="h-4 w-4 rounded-full bg-[#555] border border-[#252525] flex items-center justify-center text-[8px] text-white">
                 +
               </div>
            </div>
            <span className="text-[10px] text-[#808080] font-medium ml-1">
                {occupiedCount} Active Detections
            </span>
         </div>

         <div className="h-6 w-6 rounded-full bg-[#333] flex items-center justify-center text-[#959595] group-hover:bg-[#C7FFBF] group-hover:text-black transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
         </div>
      </div>
    </div>
  );
}

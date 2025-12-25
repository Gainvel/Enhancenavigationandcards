import React, { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronRight } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isOnline = camera.status === "Online";
  const occupiedCount = camera.zones.filter(z => z.status === "Occupied").length;
  const availableCount = camera.zones.filter(z => z.status === "Available").length;
  const totalZones = camera.zones.length;

  return (
    <motion.div 
      onClick={() => setIsExpanded(!isExpanded)}
      initial={false}
      animate={{ height: isExpanded ? 320 : "auto" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="group bg-[#252525] rounded-2xl border border-[#333] hover:border-[#C7FFBF] flex flex-col overflow-hidden shadow-sm hover:shadow-md cursor-pointer relative"
    >
      {/* Header */}
      <div className={clsx(
        "px-5 py-4 flex justify-between items-start flex-none transition-colors duration-300",
        isExpanded ? "bg-[#252525] border-b border-[#333]" : "bg-[#252525] border-b border-transparent"
      )}>
        <div className="flex flex-col gap-1">
          <h3 className="text-white font-sans text-sm font-bold">
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
        <div className={clsx("flex items-center justify-center h-6 w-6 rounded-full border",
            camera.status === "Online" ? "bg-[#C7FFBF]/10 border-[#C7FFBF]/30" : "bg-[#606060]/10 border-[#606060]/30"
        )}>
            <div className={clsx("h-2 w-2 rounded-full", 
                camera.status === "Online" ? "bg-[#C7FFBF] shadow-[0_0_6px_#C7FFBF]" : "bg-[#606060]"
            )} />
        </div>
      </div>

      {/* Body Content */}
      <div className={clsx("flex-1 overflow-hidden relative transition-colors duration-300", isExpanded ? "bg-[#2A2A2A]" : "bg-[#252525]")}>
        <AnimatePresence mode="popLayout" initial={false}>
        {isExpanded ? (
          /* EXPANDED VIEW: Zone List */
          <motion.div 
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col"
          >
             <div className="px-5 py-2 border-b border-[#333] flex justify-between items-center bg-[#282828] flex-none">
                <span className="text-[9px] text-[#959595] uppercase tracking-widest font-bold">Zone ID</span>
                <span className="text-[9px] text-[#959595] uppercase tracking-widest font-bold">Status</span>
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-1">
                {camera.zones.map((zone) => {
                    const isOccupied = zone.status === "Occupied";
                    return (
                        <div 
                            key={zone.id} 
                            className="flex justify-between items-center py-2 px-3 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-sm transition-colors group/row"
                        >
                            <span className="text-[10px] font-mono text-[#CCCCCC] group-hover/row:text-white transition-colors truncate max-w-[140px]" title={zone.id}>
                                {zone.id}
                            </span>
                            
                            <div className={clsx("flex items-center gap-2 px-2 py-1.5 rounded-md border",
                                isOccupied 
                                    ? "border-[#FFB4B4] text-[#FFB4B4] bg-[#FFB4B4]/5" 
                                    : "border-[#C7FFBF] text-[#C7FFBF] bg-[#C7FFBF]/5"
                            )}>
                                <div className={clsx("w-1.5 h-1.5 rounded-full", 
                                    isOccupied ? "bg-[#FFB4B4] shadow-[0_0_4px_#FFB4B4]" : "bg-[#C7FFBF] shadow-[0_0_4px_#C7FFBF]"
                                )} />
                                <span className="text-[10px] font-bold tracking-wide">
                                    {isOccupied ? "Occupied" : "Available"}
                                </span>
                            </div>
                        </div>
                    );
                })}
             </div>
          </motion.div>
        ) : (
          /* COMPACT VIEW: Summary Badges */
          <motion.div 
            key="compact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-3 py-1.5 grid grid-cols-2 gap-2 w-full"
          >
             {/* Occupied Count */}
             <div className="flex items-center justify-between px-3 py-1 rounded-md border border-[#FFB4B4] text-[#FFB4B4] bg-[#FFB4B4]/5">
                 <span className="text-[10px] font-bold tracking-wide uppercase">Occupied</span>
                 <span className="font-mono font-bold text-sm">{occupiedCount}</span>
            </div>

            {/* Available Count */}
            <div className="flex items-center justify-between px-3 py-1 rounded-md border border-[#C7FFBF] text-[#C7FFBF] bg-[#C7FFBF]/5">
                 <span className="text-[10px] font-bold tracking-wide uppercase">Available</span>
                 <span className="font-mono font-bold text-sm">{availableCount}</span>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* Footer - Mini Stats & Toggle */}
      <div className={clsx(
        "px-5 py-3 flex justify-between items-center relative z-10 flex-none transition-colors duration-300",
        isExpanded ? "bg-[#252525] border-t border-[#333]" : "bg-[#252525] border-t border-transparent"
      )}>
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
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
         </div>
      </div>
    </motion.div>
  );
}
